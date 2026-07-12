import type { Editor } from '@tiptap/react';
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
} from 'lucide-react';

import ToolbarButton from './ToolbarButton';

interface ToolbarAlignmentGroupProps {
  editor: Editor;
}

export default function ToolbarAlignmentGroup({
  editor,
}: ToolbarAlignmentGroupProps) {
  return (
    <>
      <ToolbarButton
        label="Align left"
        active={editor.isActive({ textAlign: 'left' })}
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
      >
        <AlignLeft size={15} strokeWidth={2} />
      </ToolbarButton>

      <ToolbarButton
        label="Align center"
        active={editor.isActive({ textAlign: 'center' })}
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
      >
        <AlignCenter size={15} strokeWidth={2} />
      </ToolbarButton>

      <ToolbarButton
        label="Align right"
        active={editor.isActive({ textAlign: 'right' })}
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
      >
        <AlignRight size={15} strokeWidth={2} />
      </ToolbarButton>

      <ToolbarButton
        label="Justify"
        active={editor.isActive({ textAlign: 'justify' })}
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
      >
        <AlignJustify size={15} strokeWidth={2} />
      </ToolbarButton>
    </>
  );
}
