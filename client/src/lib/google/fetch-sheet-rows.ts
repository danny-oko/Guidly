import { auth, sheets } from '@googleapis/sheets';

export async function fetchSheetRows(): Promise<string[][]> {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;
  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

  if (!clientEmail || !privateKey || !spreadsheetId) {
    throw new Error('Missing Google Sheets environment variables');
  }

  const formattedPrivateKey = privateKey.replace(/\\n/g, '\n');

  const targetAuth = new auth.JWT({
    email: clientEmail,
    key: formattedPrivateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheetsClient = sheets({ version: 'v4', auth: targetAuth });

  const response = await sheetsClient.spreadsheets.values.get({
    spreadsheetId,
    range: 'Sheet1!A:ZZ',
  });

  return response.data.values ?? [];
}
