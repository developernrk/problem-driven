import connectDB from '@/lib/database';
import User from '@/models/User';

export interface UserStats {
  viewsRemaining: number;
  browniePoints: number;
  isPremium: boolean;
  totalViews: number;
  savedIdeas: number;
}

export class UserService {
  static async getOrCreateUser(clerkId: string, email: string, firstName?: string, lastName?: string) {
    await connectDB();
    
    let user = await User.findOne({ clerkId });
    
    if (!user) {
      console.log('Creating new user in MongoDB:', { clerkId, email, firstName, lastName });
      user = new User({
        clerkId,
        email,
        firstName,
        lastName,
        browniePoints: 0,
        viewsRemaining: parseInt(process.env.FREE_VIEW_LIMIT || '6'),
        isPremium: false,
        savedIdeas: [],
        viewHistory: [],
        likedIdeas: [],
        sharedIdeas: [],
        rewards: [],
        subscriptionTier: 'free'
      });
      await user.save();
      console.log('User created successfully in MongoDB:', user._id);
    } else {
      // Update user info if it has changed
      let hasChanges = false;
      if (user.email !== email) {
        user.email = email;
        hasChanges = true;
      }
      if (user.firstName !== firstName) {
        user.firstName = firstName;
        hasChanges = true;
      }
      if (user.lastName !== lastName) {
        user.lastName = lastName;
        hasChanges = true;
      }
      
      if (hasChanges) {
        await user.save();
        console.log('User updated in MongoDB:', user._id);
      }
    }
    
    return user;
  }

  static async getUserStats(clerkId: string): Promise<UserStats | null> {
    await connectDB();
    
    const user = await User.findOne({ clerkId });
    if (!user) return null;

    return {
      viewsRemaining: user.viewsRemaining,
      browniePoints: user.browniePoints,
      isPremium: user.isPremium,
      totalViews: user.viewHistory.length,
      savedIdeas: user.savedIdeas.length
    };
  }

  static async canViewIdea(clerkId: string): Promise<boolean> {
    await connectDB();
    
    const user = await User.findOne({ clerkId });
    if (!user) return false;

    return user.isPremium || user.viewsRemaining > 0;
  }

  static async recordIdeaView(clerkId: string, ideaId: string): Promise<{ success: boolean; viewsRemaining: number }> {
    await connectDB();
    
    const user = await User.findOne({ clerkId });
    if (!user) {
      return { success: false, viewsRemaining: 0 };
    }

    // Check if already viewed this idea
    if (user.viewHistory.includes(ideaId)) {
      return { success: true, viewsRemaining: user.viewsRemaining };
    }

    // Add to view history
    user.viewHistory.push(ideaId);

    // Decrease views remaining if not premium
    if (!user.isPremium && user.viewsRemaining > 0) {
      user.viewsRemaining -= 1;
    }

    // Award brownie points for engagement
    user.browniePoints += 1;

    await user.save();

    return { 
      success: true, 
      viewsRemaining: user.viewsRemaining 
    };
  }

  static async saveIdea(clerkId: string, ideaId: string): Promise<boolean> {
    await connectDB();
    
    const user = await User.findOne({ clerkId });
    if (!user) return false;

    if (!user.savedIdeas.includes(ideaId)) {
      user.savedIdeas.push(ideaId);
      user.browniePoints += 2; // More points for saving
      await user.save();
    }

    return true;
  }

  static async unsaveIdea(clerkId: string, ideaId: string): Promise<boolean> {
    await connectDB();
    
    const user = await User.findOne({ clerkId });
    if (!user) return false;

    user.savedIdeas = user.savedIdeas.filter(id => id !== ideaId);
    await user.save();

    return true;
  }

  static async upgradeToPremium(clerkId: string): Promise<boolean> {
    await connectDB();
    
    const user = await User.findOne({ clerkId });
    if (!user) return false;

    user.isPremium = true;
    user.viewsRemaining = -1; // Unlimited views
    await user.save();

    return true;
  }

  static async getSavedIdeas(clerkId: string) {
    await connectDB();
    
    const user = await User.findOne({ clerkId }).populate('savedIdeas');
    
return user?.savedIdeas || [];
  }

  static async getViewHistory(clerkId: string) {
    await connectDB();
    
    const user = await User.findOne({ clerkId }).populate('viewHistory');
    
return user?.viewHistory || [];
  }
}