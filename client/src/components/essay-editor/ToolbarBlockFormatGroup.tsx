import type { Editor } from '@tiptap/react';
import { List, ListOrdered } from 'lucide-react';

import ToolbarButton from './ToolbarButton';

interface ToolbarBlockFormatGroupProps {
  editor: Editor;
}

export default function ToolbarBlockFormatGroup({
  editor,
}: ToolbarBlockFormatGroupProps) {
  const setHeading = (level: 2 | 3 | null) => {
    if (level === null) {
      editor.chain().focus().setParagraph().run();
      return;
    }

    editor.chain().focus().toggleHeading({ level }).run();
  };

  return (
    <>
      <label className="doc-editor__select-wrap">
        <select
          className="doc-editor__select"
          value={
            editor.isActive('heading', { level: 2 })
              ? 'h2'
              : editor.isActive('heading', { level: 3 })
                ? 'h3'
                : 'paragraph'
          }
          onChange={(event) => {
            const value = event.target.value;
            if (value === 'h2') setHeading(2);
            else if (value === 'h3') setHeading(3);
            else setHeading(null);
          }}
        >
          <option value="paragraph">Paragraph</option>
          <option value="h2">H2</option>
          <option value="h3">H3</option>
        </select>
      </label>

      <ToolbarButton
        label="Bullet list"
        active={editor.isActive('bulletList')}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List size={15} strokeWidth={2} />
      </ToolbarButton>

      <ToolbarButton
        label="Ordered list"
        active={editor.isActive('orderedList')}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered size={15} strokeWidth={2} />
      </ToolbarButton>
    </>
  );
}
