'use client';

import type { Editor } from '@tiptap/react';
import { useEffect, useState } from 'react';

import { countWords } from './countWords';

function getWordCount(editor: Editor | null): number {
  if (!editor || editor.isDestroyed) {
    return 0;
  }

  return countWords(editor.getText());
}

export function useEditorWordCount(editor: Editor) {
  const [wordCount, setWordCount] = useState(() => getWordCount(editor));

  useEffect(() => {
    const updateWordCount = () => {
      setWordCount(getWordCount(editor));
    };

    updateWordCount();
    editor.on('transaction', updateWordCount);

    return () => {
      editor.off('transaction', updateWordCount);
    };
  }, [editor]);

  return wordCount;
}
