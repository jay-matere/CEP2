import { NextRequest, NextResponse } from 'next/server';
import { ngoQueries } from '@/lib/database';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    const ngo = ngoQueries.getById.get(id);

    if (!ngo) {
      return NextResponse.json(
        { error: 'NGO not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(ngo);
  } catch (error) {
    console.error('Error fetching NGO:', error);
    return NextResponse.json(
      { error: 'Failed to fetch NGO' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    const data = await request.json();

    const result = ngoQueries.update.run(
      data.name,
      data.address,
      data.phone,
      data.email || null,
      data.website || null,
      data.category,
      data.description,
      data.rating,
      data.reviewCount,
      id
    );

    if (result.changes === 0) {
      return NextResponse.json(
        { error: 'NGO not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating NGO:', error);
    return NextResponse.json(
      { error: 'Failed to update NGO' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    const result = ngoQueries.delete.run(id);

    if (result.changes === 0) {
      return NextResponse.json(
        { error: 'NGO not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting NGO:', error);
    return NextResponse.json(
      { error: 'Failed to delete NGO' },
      { status: 500 }
    );
  }
}