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

    // Check if actually liked
    const isLiked = user.likedIdeas.includes(ideaId);
    
    if (!isLiked) {
      return NextResponse.json(
        { error: 'Idea not liked yet' },
        { status: 400 }
      );
    }

    // Remove from user's liked ideas and decrement idea likes
    await Promise.all([
      User.findOneAndUpdate(
        { clerkId: user.clerkId },
        { 
          $pull: { likedIdeas: ideaId }
        }
      ),
      Idea.findByIdAndUpdate(
        ideaId,
        { $inc: { likes: -1 } }
      )
    ]);

    return NextResponse.json({ 
      success: true, 
      message: 'Idea unliked successfully'
    });
  } catch (error) {
    console.error('Error unliking idea:', error);
    
return NextResponse.json(
      { error: 'Failed to unlike idea' },
      { status: 500 }
    );
  }
}