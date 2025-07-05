import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth-utils';
import Idea from '@/models/Idea';

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

    // Get viewed ideas with full details
    const viewedIdeas = await Idea.find({
      _id: { $in: user.viewHistory }
    }).sort({ createdAt: -1 });

    return NextResponse.json({ 
      success: true,
      user: user,
      savedIdeas: savedIdeas,
      viewHistory: viewedIdeas
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    
return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}