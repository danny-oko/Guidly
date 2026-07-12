'use client';

import type { HocuspocusProvider } from '@hocuspocus/provider';
import { useEditor } from '@tiptap/react';
import { useEffect, useMemo, useState } from 'react';
import * as Y from 'yjs';

import { buildEditorExtensions } from './buildEditorExtensions';
import { createTiptapCollabProvider } from '@/lib/collaboration/create-tiptap-collab-provider';
import {
  getCollaborationUser,
  TIPTAP_COLLAB_INITIAL_CONTENT,
} from '@/lib/collaboration/tiptap-collab.config';
import { touchClientDocument } from '@/lib/documents/document-storage';

interface UseCollaborativeEditorOptions {
  documentId: string;
  title: string;
}

export function useCollaborativeEditor({
  documentId,
  title,
}: UseCollaborativeEditorOptions) {
  const [ydoc] = useState(() => new Y.Doc());
  const [provider, setProvider] = useState<HocuspocusProvider | null>(null);
  const [zoom, setZoom] = useState(1);
  const [status, setStatus] = useState<'connecting' | 'synced' | 'error'>(
    'connecting',
  );
  const [shouldSeedContent, setShouldSeedContent] = useState(false);
  const collaborationUser = useMemo(
    () => getCollaborationUser(documentId),
    [documentId],
  );

  useEffect(() => {
    touchClientDocument(documentId, { title });
  }, [documentId, title]);

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

  const editor = useEditor(
    {
      extensions: buildEditorExtensions(ydoc, provider, collaborationUser),
      immediatelyRender: false,
      editorProps: {
        attributes: {
          class: 'doc-editor__content',
        },
      },
    },
    [provider, collaborationUser],
  );

  useEffect(() => {
    if (!editor || !shouldSeedContent) return;

    editor.commands.setContent(TIPTAP_COLLAB_INITIAL_CONTENT);
    setShouldSeedContent(false);
  }, [editor, shouldSeedContent]);

  return { editor, zoom, setZoom, status };
}
