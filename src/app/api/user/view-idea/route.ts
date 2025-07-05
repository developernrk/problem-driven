import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { UserService } from '@/lib/userService';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { ideaId } = await request.json();
    
    if (!ideaId) {
      return NextResponse.json(
        { error: 'Idea ID is required' },
        { status: 400 }
      );
    }

    // Check if user can view more ideas
    const canView = await UserService.canViewIdea(userId);
    
    if (!canView) {
      return NextResponse.json(
        { error: 'View limit reached', needsUpgrade: true },
        { status: 403 }
      );
    }

    // Record the view
    const result = await UserService.recordIdeaView(userId, ideaId);
    
    return NextResponse.json({ 
      success: true, 
      data: { 
        viewsRemaining: result.viewsRemaining 
      } 
    });
  } catch (error) {
    console.error('Error recording idea view:', error);
    
return NextResponse.json(
      { error: 'Failed to record view' },
      { status: 500 }
    );
  }
}