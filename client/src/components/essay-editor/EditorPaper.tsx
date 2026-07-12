import type { Editor } from '@tiptap/react';
import { EditorContent } from '@tiptap/react';

import EditorWordCount from './EditorWordCount';

interface EditorPaperProps {
  editor: Editor;
  zoom: number;
}

export default function EditorPaper({ editor, zoom }: EditorPaperProps) {
  return (
    <div className="doc-editor__workspace">
      <div
        className="doc-editor__paper-wrap"
        style={{ transform: `scale(${zoom})` }}
      >
        <div className="doc-editor__paper">
          <EditorContent editor={editor} />
          <div className="doc-editor__paper-footer">
            <span className="doc-editor__page-number">1</span>
            <EditorWordCount editor={editor} />
          </div>
        </div>
      </div>
    </div>
  );
}
