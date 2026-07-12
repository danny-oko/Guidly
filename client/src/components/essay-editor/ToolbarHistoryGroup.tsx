'use client';

import type { Editor } from '@tiptap/react';
import { Redo2, Undo2 } from 'lucide-react';
import { useEffect, useState } from 'react';

import ToolbarButton from './ToolbarButton';

interface ToolbarHistoryGroupProps {
  editor: Editor;
}

function getHistoryState(editor: Editor | null) {
  if (!editor || editor.isDestroyed) {
    return { canUndo: false, canRedo: false };
  }

  return {
    canUndo: editor.can().undo(),
    canRedo: editor.can().redo(),
  };
}

export default function ToolbarHistoryGroup({
  editor,
}: ToolbarHistoryGroupProps) {
  const [historyState, setHistoryState] = useState(() =>
    getHistoryState(editor),
  );

  useEffect(() => {
    const updateHistoryState = () => {
      setHistoryState(getHistoryState(editor));
    };

    updateHistoryState();
    editor.on('transaction', updateHistoryState);

    return () => {
      editor.off('transaction', updateHistoryState);
    };
  }, [editor]);

  return (
    <>
      <ToolbarButton
        label="Undo"
        disabled={!historyState.canUndo}
        onClick={() => editor.chain().focus().undo().run()}
      >
        <Undo2 size={15} strokeWidth={2.2} />
      </ToolbarButton>

      <ToolbarButton
        label="Redo"
        disabled={!historyState.canRedo}
        onClick={() => editor.chain().focus().redo().run()}
      >
        <Redo2 size={15} strokeWidth={2.2} />
      </ToolbarButton>
    </>
  );
}
