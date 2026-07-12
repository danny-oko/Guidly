import type { Editor } from '@tiptap/react';

import ToolbarAlignmentGroup from './ToolbarAlignmentGroup';
import ToolbarBlockFormatGroup from './ToolbarBlockFormatGroup';
import ToolbarHistoryGroup from './ToolbarHistoryGroup';
import ToolbarTextStyleGroup from './ToolbarTextStyleGroup';
import ToolbarZoomControls from './ToolbarZoomControls';

interface EditorToolbarProps {
  editor: Editor;
  zoom: number;
  onZoomChange: (zoom: number) => void;
}

export default function EditorToolbar({
  editor,
  zoom,
  onZoomChange,
}: EditorToolbarProps) {
  return (
    <div className="doc-editor__toolbar">
      <div className="doc-editor__toolbar-group">
        <ToolbarHistoryGroup editor={editor} />
      </div>

      <div className="doc-editor__toolbar-divider" />

      <div className="doc-editor__toolbar-group">
        <ToolbarZoomControls zoom={zoom} onZoomChange={onZoomChange} />
      </div>

      <div className="doc-editor__toolbar-divider" />

      <div className="doc-editor__toolbar-group">
        <ToolbarBlockFormatGroup editor={editor} />
      </div>

      <div className="doc-editor__toolbar-divider" />

      <div className="doc-editor__toolbar-group">
        <ToolbarTextStyleGroup editor={editor} />
      </div>

      <div className="doc-editor__toolbar-divider" />

      <div className="doc-editor__toolbar-group">
        <ToolbarAlignmentGroup editor={editor} />
      </div>
    </div>
  );
}
