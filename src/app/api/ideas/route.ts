import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import Idea from '@/models/Idea';
import { SearchFilters, PaginatedResponse } from '@/types';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    // Pagination parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');

    // Filter parameters
    const categories = searchParams.get('categories')?.split(',').filter(Boolean) || [];
    const difficulty = searchParams.get('difficulty');
    const search = searchParams.get('search');
    const language = searchParams.get('language') || 'en';
    const marketPotential = searchParams.get('marketPotential');
    const sustainabilityRating = searchParams.get('sustainabilityRating');
    const tags = searchParams.get('tags')?.split(',').filter(Boolean) || [];
    const dateRange = searchParams.get('dateRange');
    const minLikes = parseInt(searchParams.get('minLikes') || '0');
    const minViews = parseInt(searchParams.get('minViews') || '0');
    const minInvestment = parseInt(searchParams.get('minInvestment') || '0');
    const maxInvestment = parseInt(searchParams.get('maxInvestment') || '1000000');

    // Sort parameters
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') === 'asc' ? 1 : -1;

    // Build query
    const query: any = { isActive: true, language };

    // Category filter
    if (categories.length > 0) {
      query.category = { $in: categories };
    }

    // Difficulty filter
    if (difficulty && difficulty !== 'all') {
      query.difficulty = difficulty;
    }

    // Market potential filter
    if (marketPotential && marketPotential !== 'all') {
      query.marketPotential = marketPotential;
    }

    // Sustainability rating filter
    if (sustainabilityRating && sustainabilityRating !== 'all') {
      query.sustainabilityRating = sustainabilityRating;
    }

    // Investment range filter
    if (minInvestment > 0 || maxInvestment < 1000000) {
      query.investmentRange = {
        $gte: minInvestment,
        $lte: maxInvestment
      };
    }

    // Tags filter
    if (tags.length > 0) {
      query.tags = { $in: tags.map(tag => new RegExp(tag, 'i')) };
    }

    // Engagement filters
    if (minLikes > 0) {
      query.likes = { $gte: minLikes };
    }
    if (minViews > 0) {
      query.views = { $gte: minViews };
    }

    // Date range filter
    if (dateRange && dateRange !== 'all') {
      const now = new Date();
      let startDate: Date;
      let quarterStart:Data;
      switch (dateRange) {
        case 'today':
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          break;
        case 'week':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'month':
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        case 'quarter':
          quarterStart = Math.floor(now.getMonth() / 3) * 3;
          startDate = new Date(now.getFullYear(), quarterStart, 1);
          break;
        case 'year':
          startDate = new Date(now.getFullYear(), 0, 1);
          break;
        default:
          startDate = new Date(0);
      }

      query.createdAt = { $gte: startDate };
    }

    // Search filter
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Build sort object
    const sortObject: any = {};
    sortObject[sortBy] = sortOrder;

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const [ideas, total] = await Promise.all([
      Idea.find(query)
        .sort(sortObject)
        .skip(skip)
        .limit(limit)
        .lean(),
      Idea.countDocuments(query)
    ]);

    const response = {
      success: true,
      ideas: ideas,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      },
      filters: {
        categories,
        difficulty,
        marketPotential,
        sustainabilityRating,
        tags,
        dateRange,
        minLikes,
        minViews,
        investmentRange: [minInvestment, maxInvestment],
        sortBy,
        sortOrder: sortOrder === 1 ? 'asc' : 'desc'
      }
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching ideas:', error);

return NextResponse.json(
      { error: 'Failed to fetch ideas' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const idea = new Idea(body);
    await idea.save();

    return NextResponse.json({ success: true, data: idea }, { status: 201 });
  } catch (error) {
    console.error('Error creating idea:', error);

return NextResponse.json(
      { error: 'Failed to create idea' },
      { status: 500 }
    );
  }
}
