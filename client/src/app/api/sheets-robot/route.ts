import { fetchSheetRows } from '../../../lib/google/fetch-sheet-rows';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const rows = await fetchSheetRows();
    return NextResponse.json({ success: true, data: rows });
  } catch (error: unknown) {
    console.error('Google Sheets API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch data' },
      { status: 500 },
    );
  }
}
