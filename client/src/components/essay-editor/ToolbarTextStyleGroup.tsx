import type { Editor } from '@tiptap/react';
import {
  Bold,
  Highlighter,
  Italic,
  Palette,
  Strikethrough,
  Underline,
} from 'lucide-react';

import ToolbarButton from './ToolbarButton';

interface ToolbarTextStyleGroupProps {
  editor: Editor;
}

export default function ToolbarTextStyleGroup({
  editor,
}: ToolbarTextStyleGroupProps) {
  return (
    <>
      <ToolbarButton
        label="Bold"
        active={editor.isActive('bold')}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold size={15} strokeWidth={2.4} />
      </ToolbarButton>

      <ToolbarButton
        label="Italic"
        active={editor.isActive('italic')}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic size={15} strokeWidth={2.4} />
      </ToolbarButton>

      <ToolbarButton
        label="Strikethrough"
        active={editor.isActive('strike')}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough size={15} strokeWidth={2.4} />
      </ToolbarButton>

      <ToolbarButton
        label="Underline"
        active={editor.isActive('underline')}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <Underline size={15} strokeWidth={2.4} />
      </ToolbarButton>

      <ToolbarButton
        label="Highlight"
        active={editor.isActive('highlight')}
        onClick={() =>
          editor.chain().focus().toggleHighlight({ color: '#e8d069' }).run()
        }
      >
        <Highlighter size={15} strokeWidth={2.2} />
      </ToolbarButton>

      <ToolbarButton
        label="Text color"
        active={editor.isActive('textStyle')}
        onClick={() => editor.chain().focus().setColor('#8eb5e8').run()}
      >
        <Palette size={15} strokeWidth={2.2} />
      </ToolbarButton>
    </>
  );
}
