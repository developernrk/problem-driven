import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import Idea from '@/models/Idea';

// GET /api/chat/trending - Get trending ideas for the chat sidebar
export async function GET() {
  try {

    await connectDB();

    // Get trending ideas based on views, likes, and recent activity
    const trendingIdeas = await Idea.find({ isActive: true })
      .sort({
        views: -1,
        likes: -1,
        createdAt: -1
      })
      .limit(10)
      .select('title shortDescription category tags views likes createdAt')
      .lean();

    // Format for trending display
    const formattedIdeas = trendingIdeas.map(idea => ({
      id: idea._id,
      title: idea.title,
      description: idea.shortDescription,
      category: idea.category,
      tags: idea.tags?.slice(0, 3) || [], // Show only first 3 tags
      stats: {
        views: idea.views || 0,
        likes: idea.likes || 0
      },
      isNew: new Date(idea.createdAt).getTime() > Date.now() - (7 * 24 * 60 * 60 * 1000) // New if less than 7 days old
    }));

    return NextResponse.json(formattedIdeas);
  } catch (error) {
    console.error('Error fetching trending ideas:', error);

return NextResponse.json(
      { error: 'Failed to fetch trending ideas' },
      { status: 500 }
    );
  }
}
