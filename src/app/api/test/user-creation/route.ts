import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth-utils';
import connectDB from '@/lib/database';
import User from '@/models/User';

export async function GET(request: NextRequest) {
  try {
    console.log('=== Testing User Creation ===');
    
    const authResult = await getAuthenticatedUser();
    
    if (!authResult.success) {
      console.log('Auth failed:', authResult.error);
      
return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status || 500 }
      );
    }

    const user = authResult.user;
    console.log('User found/created:', {
      id: user._id,
      clerkId: user.clerkId,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    });

    // Also check database directly
    await connectDB();
    const dbUser = await User.findOne({ clerkId: user.clerkId });
    console.log('User in database:', !!dbUser);

    return NextResponse.json({ 
      success: true,
      message: 'User creation test completed',
      user: {
        id: user._id,
        clerkId: user.clerkId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        browniePoints: user.browniePoints,
        viewsRemaining: user.viewsRemaining,
        isPremium: user.isPremium,
        subscriptionTier: user.subscriptionTier,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
      databaseCheck: {
        userExistsInDB: !!dbUser,
        dbUserId: dbUser?._id
      }
    });
  } catch (error) {
    console.error('Error in user creation test:', error);
    
return NextResponse.json(
      { error: 'Test failed', details: error.message },
      { status: 500 }
    );
  }
}