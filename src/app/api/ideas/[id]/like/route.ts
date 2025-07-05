import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import Idea from '@/models/Idea';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const idea = await Idea.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!idea) {
      return NextResponse.json(
        { error: 'Idea not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      data: { likes: idea.likes } 
    });
  } catch (error) {
    console.error('Error liking idea:', error);
    
return NextResponse.json(
      { error: 'Failed to like idea' },
      { status: 500 }
    );
  }
}