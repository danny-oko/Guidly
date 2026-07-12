import { HocuspocusProvider } from '@hocuspocus/provider';
import type * as Y from 'yjs';

const TIPTAP_APP_ID = 'y9drg45m';

export type TiptapCollabProvider = HocuspocusProvider;

export interface CreateTiptapCollabProviderOptions {
  roomName: string;
  document: Y.Doc;
  onSynced?: () => void;
  onAuthenticationFailed?: () => void;
  onDisconnect?: () => void;
}

async function fetchCollabToken(roomName: string): Promise<string> {
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

export function createTiptapCollabProvider(
  options: CreateTiptapCollabProviderOptions,
): TiptapCollabProvider {
  return new HocuspocusProvider({
    url: `wss://${TIPTAP_APP_ID}.collab.tiptap.cloud`,
    name: options.roomName,
    token: () => fetchCollabToken(options.roomName),
    document: options.document,
    onSynced: options.onSynced,
    onAuthenticationFailed: options.onAuthenticationFailed,
    onDisconnect: options.onDisconnect,
  });
}
