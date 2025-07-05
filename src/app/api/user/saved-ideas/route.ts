import { NextRequest, NextResponse } from 'next/server';
import Idea from '@/models/Idea';
import { getAuthenticatedUser } from '@/lib/auth-utils';

export async function GET(request: NextRequest) {
  try {
    const authResult = await getAuthenticatedUser();
    
    if (!authResult.success) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status || 500 }
      );
    }

    const user = authResult.user;

    // Get saved ideas with full details
    const savedIdeas = await Idea.find({
      _id: { $in: user.savedIdeas }
    }).sort({ createdAt: -1 });

    return NextResponse.json({ 
      success: true, 
      ideas: savedIdeas 
    });
  } catch (error) {
    console.error('Error fetching saved ideas:', error);
    
return NextResponse.json(
      { error: 'Failed to fetch saved ideas' },
      { status: 500 }
    );
  }
}