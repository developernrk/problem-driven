import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth-utils';

export async function POST(request: NextRequest) {
  try {
    const authResult = await getAuthenticatedUser();
    
    if (!authResult.success) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status || 500 }
      );
    }

    const user = authResult.user;

    return NextResponse.json({ 
      success: true, 
      message: 'User synced successfully',
      user: {
        id: user._id,
        clerkId: user.clerkId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        browniePoints: user.browniePoints,
        viewsRemaining: user.viewsRemaining,
        isPremium: user.isPremium,
        subscriptionTier: user.subscriptionTier
      }
    });
  } catch (error) {
    console.error('Error syncing user:', error);
    
return NextResponse.json(
      { error: 'Failed to sync user' },
      { status: 500 }
    );
  }
}