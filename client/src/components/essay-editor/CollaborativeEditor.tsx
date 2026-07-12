'use client';

import EditorHeader from './EditorHeader';
import EditorPaper from './EditorPaper';
import EditorToolbar from './EditorToolbar';
import { useCollaborativeEditor } from './useCollaborativeEditor';

interface CollaborativeEditorProps {
  documentId: string;
  title: string;
}

export default function CollaborativeEditor({
  documentId,
  title,
}: CollaborativeEditorProps) {
  const { editor, zoom, setZoom, status } = useCollaborativeEditor({
    documentId,
    title,
  });

  if (!editor) {
    return (
      <div className="doc-editor doc-editor--loading">Loading editor...</div>
    );
  }

  return (
    <div className="doc-editor">
      <EditorHeader title={title} status={status} />
      <div className="doc-editor__toolbar-row">
        <EditorToolbar editor={editor} zoom={zoom} onZoomChange={setZoom} />
      </div>
      <EditorPaper editor={editor} zoom={zoom} />
    </div>
  );
}
