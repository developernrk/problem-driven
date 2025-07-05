import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/User';
import Idea from '@/models/Idea';
import { getAuthenticatedUser } from '@/lib/auth-utils';

export async function POST(request: NextRequest) {
  try {
    const authResult = await getAuthenticatedUser();
    
    if (!authResult.success) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status || 500 }
      );
    }

    const user = authResult.user;

    const { ideaId } = await request.json();
    
    if (!ideaId) {
      return NextResponse.json(
        { error: 'Idea ID is required' },
        { status: 400 }
      );
    }

    // Check if idea exists
    const idea = await Idea.findById(ideaId);
    if (!idea) {
      return NextResponse.json(
        { error: 'Idea not found' },
        { status: 404 }
      );
    }

    // Check if already liked
    const alreadyLiked = user.likedIdeas.includes(ideaId);
    
    if (alreadyLiked) {
      return NextResponse.json(
        { error: 'Already liked this idea' },
        { status: 400 }
      );
    }

    // Add to user's liked ideas and increment idea likes
    await Promise.all([
      User.findOneAndUpdate(
        { clerkId: user.clerkId },
        { 
          $push: { likedIdeas: ideaId },
          $inc: { browniePoints: 1 } // Award brownie point for liking
        }
      ),
      Idea.findByIdAndUpdate(
        ideaId,
        { $inc: { likes: 1 } }
      )
    ]);

    return NextResponse.json({ 
      success: true, 
      message: 'Idea liked successfully',
      browniePointsEarned: 1
    });
  } catch (error) {
    console.error('Error liking idea:', error);
    
return NextResponse.json(
      { error: 'Failed to like idea' },
      { status: 500 }
    );
  }
}