import { NextRequest, NextResponse } from 'next/server';
import { ngoQueries } from '@/lib/database';
import { seedDatabase } from '@/lib/seedData';

// Initialize database with seed data on first request
let isSeeded = false;

export async function GET(request: NextRequest) {
  try {
    // Seed database if not already done
    if (!isSeeded) {
      seedDatabase();
      isSeeded = true;
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const category = searchParams.get('category');

    let ngos;

    if (search && category && category !== 'All') {
      // Search with category filter
      const searchTerm = `%${search}%`;
      ngos = ngoQueries.searchAndFilter.all(category, searchTerm, searchTerm, searchTerm);
    } else if (search) {
      // Search only
      const searchTerm = `%${search}%`;
      ngos = ngoQueries.search.all(searchTerm, searchTerm, searchTerm);
    } else if (category && category !== 'All') {
      // Category filter only
      ngos = ngoQueries.filterByCategory.all(category);
    } else {
      // Get all NGOs
      ngos = ngoQueries.getAll.all();
    }

    return NextResponse.json(ngos);
  } catch (error) {
    console.error('Error fetching NGOs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch NGOs' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const result = ngoQueries.create.run(
      data.name,
      data.address,
      data.phone,
      data.email || null,
      data.website || null,
      data.category,
      data.description,
      data.rating || 0,
      data.reviewCount || 0
    );

    return NextResponse.json({ id: result.lastInsertRowid }, { status: 201 });
  } catch (error) {
    console.error('Error creating NGO:', error);
    return NextResponse.json(
      { error: 'Failed to create NGO' },
      { status: 500 }
    );
  }
}