import { auth, sheets } from '@googleapis/sheets';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;
    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

    if (!clientEmail || !privateKey || !spreadsheetId) {
      console.error('Missing Google API environment variables.');
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 },
      );
    }

    const formattedPrivateKey = privateKey.replace(/\\n/g, '\n');

    const targetAuth = new auth.JWT({
      email: clientEmail,
      key: formattedPrivateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheetsClient = sheets({ version: 'v4', auth: targetAuth });

    const response = await sheetsClient.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: 'Sheet1!1:1',
    });

    const rows = response.data.values || [];
    return NextResponse.json({ success: true, data: rows });
  } catch (error: any) {
    console.error('Google Sheets API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch data' },
      { status: 500 },
    );
  }
}
