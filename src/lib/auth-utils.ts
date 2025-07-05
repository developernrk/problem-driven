import { auth, currentUser } from '@clerk/nextjs/server';
import { UserService } from '@/lib/userService';
import User from '@/models/User';
import connectDB from '@/lib/database';

export interface AuthResult {
  success: boolean;
  user?: any;
  error?: string;
  status?: number;
}

/**
 * Get authenticated user and ensure they exist in MongoDB
 * Creates user if they don't exist
 */
export async function getAuthenticatedUser(): Promise<AuthResult> {
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        error: 'Unauthorized',
        status: 401
      };
    }

    await connectDB();

    let user = await User.findOne({ clerkId: userId });

    // Create user if doesn't exist
    if (!user) {
      const clerkUser = await currentUser();
      
      if (!clerkUser) {
        return {
          success: false,
          error: 'User not found in Clerk',
          status: 404
        };
      }

      const email = clerkUser.emailAddresses?.[0]?.emailAddress || '';
      const firstName = clerkUser.firstName || '';
      const lastName = clerkUser.lastName || '';

      if (!email) {
        return {
          success: false,
          error: 'User email is required',
          status: 400
        };
      }

      user = await UserService.getOrCreateUser(userId, email, firstName, lastName);
    }

    return {
      success: true,
      user
    };
  } catch (error) {
    console.error('Error in getAuthenticatedUser:', error);
    
return {
      success: false,
      error: 'Internal server error',
      status: 500
    };
  }
}