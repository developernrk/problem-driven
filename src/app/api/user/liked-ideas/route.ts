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

    // Get liked ideas with full details
    const likedIdeas = await Idea.find({
      _id: { $in: user.likedIdeas }
    }).sort({ createdAt: -1 });

    return NextResponse.json({ 
      success: true, 
      ideas: likedIdeas 
    });
  } catch (error) {
    console.error('Error fetching liked ideas:', error);
    
return NextResponse.json(
      { error: 'Failed to fetch liked ideas' },
      { status: 500 }
    );
  }
}