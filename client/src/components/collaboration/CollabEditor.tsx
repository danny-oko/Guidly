'use client';

import EditorPaper from '@/components/essay-editor/EditorPaper';
import EditorToolbar from '@/components/essay-editor/EditorToolbar';

import CollabEditorHeader from './CollabEditorHeader';
import { useCollabEditor } from './useCollabEditor';

interface CollabEditorProps {
  documentId: string;
}

export default function CollabEditor({ documentId }: CollabEditorProps) {
  const { editor, status, title, setTitle, commitTitle, zoom, setZoom } =
    useCollabEditor({
      documentId,
    });

  if (!editor) {
    return (
      <div className="doc-editor doc-editor--loading">Loading editor...</div>
    );
  }

  return (
    <div className="doc-editor">
      <CollabEditorHeader
        documentId={documentId}
        title={title}
        status={status}
        editor={editor}
        onTitleChange={setTitle}
        onTitleCommit={commitTitle}
      />
      <div className="doc-editor__toolbar-row">
        <EditorToolbar editor={editor} zoom={zoom} onZoomChange={setZoom} />
      </div>
      <EditorPaper editor={editor} zoom={zoom} />
    </div>
  );
}
