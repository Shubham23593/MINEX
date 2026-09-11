import { NextRequest, NextResponse } from 'next/server';
import { getProspectivityAnalysis } from '@/lib/services/prospectivityService';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { mineId = 'MOIL-BAL' } = body;

    const result = await getProspectivityAnalysis(mineId);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error fetching prospectivity analysis:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process prospectivity analysis' },
      { status: 500 }
    );
  }
}
