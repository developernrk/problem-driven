import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import Category from '@/models/Category';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const language = searchParams.get('language') || 'en';

    const categories = await Category.find({ 
      isActive: true, 
      language 
    }).sort({ ideaCount: -1 });

    return NextResponse.json({ success: true, categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    
return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const category = new Category(body);
    await category.save();

    return NextResponse.json({ success: true, data: category }, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    
return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}