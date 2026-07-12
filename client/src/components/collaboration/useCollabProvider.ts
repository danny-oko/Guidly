'use client';

import type { HocuspocusProvider } from '@hocuspocus/provider';
import { useEffect, useState } from 'react';
import * as Y from 'yjs';

import { createTiptapCollabProvider } from '@/lib/collaboration/create-tiptap-collab-provider';

interface UseCollabProviderOptions {
  documentId: string;
}

export function useCollabProvider({ documentId }: UseCollabProviderOptions) {
  const [ydoc] = useState(() => new Y.Doc());
  const [provider, setProvider] = useState<HocuspocusProvider | null>(null);
  const [status, setStatus] = useState<'connecting' | 'synced' | 'error'>(
    'connecting',
  );
  const [shouldSeedContent, setShouldSeedContent] = useState(false);

  useEffect(() => {
    const collabProvider = createTiptapCollabProvider({
      roomName: documentId,
      document: ydoc,
      onSynced() {
        setStatus('synced');

        if (!ydoc.getMap('config').get('initialContentLoaded')) {
          ydoc.getMap('config').set('initialContentLoaded', true);
          setShouldSeedContent(true);
        }
      },
      onAuthenticationFailed() {
        setStatus('error');
      },
      onDisconnect() {
        setStatus('connecting');
      },
    });

    setProvider(collabProvider);

    return () => {
      collabProvider.destroy();
      setProvider(null);
    };
  }, [documentId, ydoc]);

  return { ydoc, provider, status, shouldSeedContent, setShouldSeedContent };
}
