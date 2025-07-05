import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectDB from '@/lib/database';
import Idea from '@/models/Idea';
import User from '@/models/User';
import Category from '@/models/Category';

export async function GET(request: NextRequest) {
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

    const [totalIdeas, totalUsers, totalCategories, ideasWithStats] = await Promise.all([
      Idea.countDocuments({ isActive: true }),
      User.countDocuments(),
      Category.countDocuments({ isActive: true }),
      Idea.aggregate([
        { $match: { isActive: true } },
        {
          $group: {
            _id: null,
            totalViews: { $sum: '$views' },
            totalLikes: { $sum: '$likes' }
          }
        }
      ])
    ]);

    const stats = {
      totalIdeas,
      totalUsers,
      totalCategories,
      totalViews: ideasWithStats[0]?.totalViews || 0,
      totalLikes: ideasWithStats[0]?.totalLikes || 0
    };

    return NextResponse.json({ 
      success: true, 
      stats 
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    
return NextResponse.json(
      { error: 'Failed to fetch admin stats' },
      { status: 500 }
    );
  }
}