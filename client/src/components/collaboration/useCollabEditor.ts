'use client';

import { useEditor } from '@tiptap/react';
import { useEffect, useMemo, useState } from 'react';

import { buildEditorExtensions } from '@/components/essay-editor/buildEditorExtensions';
import {
  getCollaborationUser,
  TIPTAP_COLLAB_INITIAL_CONTENT,
} from '@/lib/collaboration/tiptap-collab.config';

import { useCollabProvider } from './useCollabProvider';
import { useDocumentTitle } from './useDocumentTitle';

interface UseCollabEditorOptions {
  documentId: string;
}

export function useCollabEditor({ documentId }: UseCollabEditorOptions) {
  const { title, setTitle, commitTitle } = useDocumentTitle({ documentId });
  const { ydoc, provider, status, shouldSeedContent, setShouldSeedContent } =
    useCollabProvider({ documentId });
  const [zoom, setZoom] = useState(1);
  const collaborationUser = useMemo(
    () => getCollaborationUser(documentId),
    [documentId],
  );

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
  }, [editor, shouldSeedContent, setShouldSeedContent]);

  return { editor, status, title, setTitle, commitTitle, zoom, setZoom };
}
