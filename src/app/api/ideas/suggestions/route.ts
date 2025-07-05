import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import Idea from '@/models/Idea';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const language = searchParams.get('language') || 'en';
    
    if (!query || query.trim().length === 0) {
      return NextResponse.json({
        success: true,
        suggestions: []
      });
    }

    // Search for ideas with minimal details for dropdown
    const suggestions = await Idea.find({
      isActive: true,
      language,
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { shortDescription: { $regex: query, $options: 'i' } },
        { tags: { $in: [new RegExp(query, 'i')] } },
        { category: { $regex: query, $options: 'i' } }
      ]
    })
    .select('_id title shortDescription category')
    .sort({ likes: -1, views: -1 })
    .limit(10) // Get up to 10 suggestions, but ensure minimum 5
    .lean();

    // If we have less than 5 results, get more general matches
    if (suggestions.length < 5) {
      const additionalSuggestions = await Idea.find({
        isActive: true,
        language,
        _id: { $nin: suggestions.map(s => s._id) },
        $or: [
          { title: { $regex: query.split(' ')[0], $options: 'i' } },
          { category: { $regex: query.split(' ')[0], $options: 'i' } }
        ]
      })
      .select('_id title shortDescription category')
      .sort({ likes: -1, views: -1 })
      .limit(5 - suggestions.length)
      .lean();

      suggestions.push(...additionalSuggestions);
    }

    // Ensure we always have at least 5 suggestions if there are ideas in the database
    if (suggestions.length < 5) {
      const fallbackSuggestions = await Idea.find({
        isActive: true,
        language,
        _id: { $nin: suggestions.map(s => s._id) }
      })
      .select('_id title shortDescription category')
      .sort({ likes: -1, views: -1 })
      .limit(5 - suggestions.length)
      .lean();

      suggestions.push(...fallbackSuggestions);
    }

    return NextResponse.json({
      success: true,
      suggestions: suggestions.slice(0, 10) // Limit to max 10 suggestions
    });

  } catch (error) {
    console.error('Error fetching search suggestions:', error);
    
return NextResponse.json(
      { error: 'Failed to fetch suggestions' },
      { status: 500 }
    );
  }
}