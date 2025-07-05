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

    const success = await UserService.saveIdea(userId, ideaId);

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to save idea' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving idea:', error);
    
return NextResponse.json(
      { error: 'Failed to save idea' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
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

    const success = await UserService.unsaveIdea(userId, ideaId);

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to unsave idea' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error unsaving idea:', error);
    
return NextResponse.json(
      { error: 'Failed to unsave idea' },
      { status: 500 }
    );
  }
}
