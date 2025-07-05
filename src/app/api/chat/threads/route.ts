import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectDB from '@/lib/database';
import ChatThread from '@/models/ChatThread';

// GET /api/chat/threads - Get all threads for the current user
export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const threads = await ChatThread.find({ 
      userId,
      isActive: true 
    })
    .sort({ lastMessageAt: -1 })
    .select('_id title lastMessageAt createdAt messages')
    .lean();

    // Add message count and last message preview
    const threadsWithPreview = threads.map(thread => ({
      ...thread,
      messageCount: thread.messages?.length || 0,
      lastMessage: thread.messages?.length > 0 
        ? thread.messages[thread.messages.length - 1].content.substring(0, 100) + '...'
        : 'No messages yet'
    }));

    return NextResponse.json(threadsWithPreview);
  } catch (error) {
    console.error('Error fetching chat threads:', error);
    
return NextResponse.json(
      { error: 'Failed to fetch chat threads' },
      { status: 500 }
    );
  }
}

// POST /api/chat/threads - Create a new thread
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, initialMessage } = await request.json();

    if (!title) {
      return NextResponse.json(
        { error: 'Thread title is required' },
        { status: 400 }
      );
    }

    await connectDB();

    const messages = initialMessage ? [{
      id: Date.now().toString(),
      role: 'user' as const,
      content: initialMessage,
      timestamp: new Date()
    }] : [];

    const newThread = new ChatThread({
      userId,
      title,
      messages,
      isActive: true,
      lastMessageAt: new Date()
    });

    await newThread.save();

    return NextResponse.json(newThread, { status: 201 });
  } catch (error) {
    console.error('Error creating chat thread:', error);
    
return NextResponse.json(
      { error: 'Failed to create chat thread' },
      { status: 500 }
    );
  }
}