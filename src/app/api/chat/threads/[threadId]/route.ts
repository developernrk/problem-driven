import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectDB from '@/lib/database';
import ChatThread from '@/models/ChatThread';

// GET /api/chat/threads/[threadId] - Get a specific thread
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ threadId: string }> }
) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { threadId } = await params;
    const thread = await ChatThread.findOne({
      _id: threadId,
      userId,
      isActive: true
    }).lean();

    if (!thread) {
      return NextResponse.json(
        { error: 'Thread not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(thread);
  } catch (error) {
    console.error('Error fetching chat thread:', error);
    
return NextResponse.json(
      { error: 'Failed to fetch chat thread' },
      { status: 500 }
    );
  }
}

// PUT /api/chat/threads/[threadId] - Update thread (e.g., title)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ threadId: string }> }
) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title } = await request.json();

    await connectDB();

    const { threadId } = await params;
    const thread = await ChatThread.findOneAndUpdate(
      {
        _id: threadId,
        userId,
        isActive: true
      },
      { title },
      { new: true }
    );

    if (!thread) {
      return NextResponse.json(
        { error: 'Thread not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(thread);
  } catch (error) {
    console.error('Error updating chat thread:', error);
    
return NextResponse.json(
      { error: 'Failed to update chat thread' },
      { status: 500 }
    );
  }
}

// DELETE /api/chat/threads/[threadId] - Delete thread (soft delete)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ threadId: string }> }
) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { threadId } = await params;
    const thread = await ChatThread.findOneAndUpdate(
      {
        _id: threadId,
        userId,
        isActive: true
      },
      { isActive: false },
      { new: true }
    );

    if (!thread) {
      return NextResponse.json(
        { error: 'Thread not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Thread deleted successfully' });
  } catch (error) {
    console.error('Error deleting chat thread:', error);
    
return NextResponse.json(
      { error: 'Failed to delete chat thread' },
      { status: 500 }
    );
  }
}