import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import Idea from '@/models/Idea';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const idea = await Idea.findById(params.id);
    if (!idea) {
      return NextResponse.json(
        { error: 'Idea not found' },
        { status: 404 }
      );
    }

    // Increment view count
    await Idea.findByIdAndUpdate(params.id, { $inc: { views: 1 } });

    return NextResponse.json({ success: true, data: idea });
  } catch (error) {
    console.error('Error fetching idea:', error);
    
return NextResponse.json(
      { error: 'Failed to fetch idea' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const body = await request.json();
    const idea = await Idea.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );

    if (!idea) {
      return NextResponse.json(
        { error: 'Idea not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: idea });
  } catch (error) {
    console.error('Error updating idea:', error);
    
return NextResponse.json(
      { error: 'Failed to update idea' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const idea = await Idea.findByIdAndDelete(params.id);
    if (!idea) {
      return NextResponse.json(
        { error: 'Idea not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Idea deleted' });
  } catch (error) {
    console.error('Error deleting idea:', error);
    
return NextResponse.json(
      { error: 'Failed to delete idea' },
      { status: 500 }
    );
  }
}