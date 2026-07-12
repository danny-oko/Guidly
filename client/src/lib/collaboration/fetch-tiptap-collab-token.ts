export async function fetchTiptapCollabToken(roomName: string): Promise<string> {
  const response = await fetch('/api/tiptap-auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ roomName }),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch collaboration token');
  }

  const payload = (await response.json()) as { token?: string };

  if (!payload.token) {
    throw new Error('Collaboration token missing from response');
  }

  return payload.token;
}
