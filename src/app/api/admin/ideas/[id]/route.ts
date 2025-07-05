import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectDB from '@/lib/database';
import Idea from '@/models/Idea';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // TODO: Add admin role check here
    // For now, we'll allow any authenticated user

    await connectDB();

    const ideaId = params.id;
    
    const deletedIdea = await Idea.findByIdAndDelete(ideaId);
    
    if (!deletedIdea) {
      return NextResponse.json(
        { error: 'Idea not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Idea deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting idea:', error);
    
return NextResponse.json(
      { error: 'Failed to delete idea' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // TODO: Add admin role check here

    await connectDB();

    const ideaId = params.id;
    const updateData = await request.json();
    
    const updatedIdea = await Idea.findByIdAndUpdate(
      ideaId,
      updateData,
      { new: true }
    );
    
    if (!updatedIdea) {
      return NextResponse.json(
        { error: 'Idea not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      idea: updatedIdea 
    });
  } catch (error) {
    console.error('Error updating idea:', error);
    
return NextResponse.json(
      { error: 'Failed to update idea' },
      { status: 500 }
    );
  }
}