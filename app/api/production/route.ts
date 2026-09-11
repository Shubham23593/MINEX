import { NextRequest, NextResponse } from 'next/server';
import { processProductionData } from '@/lib/services/productionService';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { records = [] } = body;

    const result = await processProductionData(records);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error processing production forecast:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process production forecast' },
      { status: 500 }
    );
  }
}
