const DEFAULT_LANGUAGE_TOOL_URL = 'https://api.languagetool.org/v2/check';

function getLanguageToolUrl(): string {
  return process.env.LANGUAGE_TOOL_API_URL?.trim() || DEFAULT_LANGUAGE_TOOL_URL;
}

export async function POST(request: Request) {
  const incomingFormData = await request.formData();
  const text = incomingFormData.get('text');
  const language = incomingFormData.get('language') ?? 'en-US';

  if (typeof text !== 'string' || !text.trim()) {
    return Response.json({ matches: [] });
  }

  const params = new URLSearchParams();
  params.append('text', text);
  params.append('language', String(language));

  const username = process.env.LANGUAGE_TOOL_USERNAME?.trim();
  const apiKey = process.env.LANGUAGE_TOOL_API_KEY?.trim();

  if (username) {
    params.append('username', username);
  }

  if (apiKey) {
    params.append('apiKey', apiKey);
  }

  try {
    const response = await fetch(getLanguageToolUrl(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      return Response.json({ matches: [] });
    }

    return Response.json(await response.json());
  } catch {
    return Response.json({ matches: [] });
  }
}
