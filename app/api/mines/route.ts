import { NextResponse } from 'next/server';
import { getMinesList } from '@/lib/services/prospectivityService';

export async function GET() {
  try {
    const mines = await getMinesList();
    return NextResponse.json({ success: true, data: mines });
  } catch (error) {
    console.error('Error fetching mines:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve mines data' },
      { status: 500 }
    );
  }
}
