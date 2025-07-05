import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import Category from '@/models/Category';
import { generateIdeaRecommendations } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const { query, language = 'en' } = await request.json();
    
    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { error: 'Query is required for recommendations' },
        { status: 400 }
      );
    }

    await connectDB();

    // Get available categories
    const categories = await Category.find({ 
      isActive: true, 
      language 
    }).select('name').lean();
    
    const categoryNames = categories.map(cat => cat.name);

    // Generate AI recommendations
    const recommendations = await generateIdeaRecommendations(query, categoryNames);

    return NextResponse.json({
      success: true,
      data: {
        query,
        recommendations,
        generatedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error generating AI recommendations:', error);
    
return NextResponse.json(
      { error: 'Failed to generate recommendations' },
      { status: 500 }
    );
  }
}