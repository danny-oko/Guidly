'use client';

import type { Editor } from '@tiptap/react';

import { useEditorWordCount } from './useEditorWordCount';

interface EditorWordCountProps {
  editor: Editor;
}

export default function EditorWordCount({ editor }: EditorWordCountProps) {
  const wordCount = useEditorWordCount(editor);
  const label = wordCount === 1 ? 'word' : 'words';

  return (
    <span className="doc-editor__word-count" aria-live="polite">
      {wordCount.toLocaleString()} {label}
    </span>
  );
}
