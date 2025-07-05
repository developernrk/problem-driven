import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import Category from '@/models/Category';
import Idea from '@/models/Idea';
import { sampleCategories, sampleIdeas } from '@/lib/seedData';

export async function POST() {
  try {
    await connectDB();

    // Clear existing data
    await Category.deleteMany({});
    await Idea.deleteMany({});

    // Insert categories
    const insertedCategories = await Category.insertMany(sampleCategories);
    console.log(`Inserted ${insertedCategories.length} categories`);

    // Update idea counts for categories
    const categoryMap = new Map();
    insertedCategories.forEach(cat => {
      categoryMap.set(cat.name, cat._id);
    });

    // Insert ideas and update category counts
    const ideasWithCategoryIds = sampleIdeas.map(idea => ({
      ...idea,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    const insertedIdeas = await Idea.insertMany(ideasWithCategoryIds);
    console.log(`Inserted ${insertedIdeas.length} ideas`);

    // Update category idea counts
    for (const category of insertedCategories) {
      const count = insertedIdeas.filter(idea => idea.category === category.name).length;
      await Category.findByIdAndUpdate(category._id, { ideaCount: count });
    }

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${insertedCategories.length} categories and ${insertedIdeas.length} ideas`
    });

  } catch (error) {
    console.error('Error seeding database:', error);
    
return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}