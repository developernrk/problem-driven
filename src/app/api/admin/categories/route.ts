import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectDB from '@/lib/database';
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

    await connectDB();

    const categories = await Category.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ 
      success: true, 
      categories
    });
  } catch (error) {
    console.error('Error fetching admin categories:', error);
    
return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}