import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import Idea from '@/models/Idea';
import Category from '@/models/Category';
import { generateSearchResults } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const { query, language = 'en' } = await request.json();

    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    await connectDB();

    // Get all active ideas
    const ideas = await Idea.find({
      isActive: true,
      language
    }).lean();

    // Use AI to rank ideas by relevance
    const rankedResults = await generateSearchResults(query, ideas);

    // Get the ranked ideas
    const rankedIdeas = rankedResults
      .sort((a: any, b: any) => b.score - a.score)
      .slice(0, 20) // Limit to top 20 results
      .map((result: any) => {
        const idea = ideas.find(i => i._id.toString() === result.id);

return idea ? { ...idea, relevanceScore: result.score } : null;
      })
      .filter(Boolean);

    return NextResponse.json({
      success: true,
      data: {
        query,
        results: rankedIdeas,
        totalResults: rankedIdeas.length
      }
    });

  } catch (error) {
    console.error('Error in AI search:', error);

return NextResponse.json(
      { error: 'Failed to perform AI search' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const language = searchParams.get('language') || 'en';

    if (!query) {
      return NextResponse.json(
        { error: 'Search query parameter "q" is required' },
        { status: 400 }
      );
    }

    await connectDB();

    // Simple text search as fallback
    const ideas = await Idea.find({
      isActive: true,
      language,
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { shortDescription: { $regex: query, $options: 'i' } },
        { tags: { $in: [new RegExp(query, 'i')] } },
        { category: { $regex: query, $options: 'i' } }
      ]
    })
    .sort({ likes: -1, views: -1 })
    .limit(20)
    .lean();

    return NextResponse.json({
      success: true,
      data: {
        query,
        results: ideas,
        totalResults: ideas.length
      }
    });

  } catch (error) {
    console.error('Error in search:', error);

return NextResponse.json(
      { error: 'Failed to perform search' },
      { status: 500 }
    );
  }
}
