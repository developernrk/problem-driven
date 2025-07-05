import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectDB from '@/lib/database';
import User from '@/models/User';
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

    return NextResponse.json({ user: authResult.user });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    
return NextResponse.json(
      { error: 'Failed to fetch user profile' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await request.json();
    const user = await User.findOneAndUpdate(
      { clerkId: userId },
      body,
      { new: true, upsert: true }
    );

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error updating user profile:', error);
    
return NextResponse.json(
      { error: 'Failed to update user profile' },
      { status: 500 }
    );
  }
}
