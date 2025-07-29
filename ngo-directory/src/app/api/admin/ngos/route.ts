import { NextResponse } from 'next/server';
import { ngoQueries } from '@/lib/database';

export async function GET() {
  try {
    const ngos = ngoQueries.getAllForAdmin.all();
    return NextResponse.json(ngos);
  } catch (error) {
    console.error('Error fetching NGOs for admin:', error);
    return NextResponse.json(
      { error: 'Failed to fetch NGOs' },
      { status: 500 }
    );
  }
}