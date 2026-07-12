import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { Editor } from '@tiptap/react';

import ShareDialog from '@/components/collaboration/ShareDialog';
import DocumentExportActions from '@/components/collaboration/DocumentExportActions';

interface CollabEditorHeaderProps {
  documentId: string;
  title: string;
  status: 'connecting' | 'synced' | 'error';
  editor: Editor;
  onTitleChange: (value: string) => void;
  onTitleCommit: (value: string) => void;
}

export default function CollabEditorHeader({
  documentId,
  title,
  status,
  editor,
  onTitleChange,
  onTitleCommit,
}: CollabEditorHeaderProps) {
  const statusLabel =
    status === 'synced'
      ? 'Live'
      : status === 'error'
        ? 'Auth failed'
        : 'Connecting';

  return (
    <header className="doc-editor__header">
      <div className="doc-editor__shell">
        <div className="doc-editor__header-left">
          <Link href="/essays" className="doc-editor__back-link">
            <ArrowLeft size={16} strokeWidth={2.2} />
            <span>Documents</span>
          </Link>
        </div>
        <div className="doc-editor__header-center">
          <input
            type="text"
            value={title}
            onChange={(event) => onTitleChange(event.target.value)}
            onBlur={(event) => onTitleCommit(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.currentTarget.blur();
              }
            }}
            className="doc-editor__title-input"
            aria-label="Document title"
            spellCheck={false}
          />
        </div>
        <div className="doc-editor__header-right">
          <div className="doc-editor__header-actions">
            <DocumentExportActions editor={editor} title={title} />
            <span
              className={`doc-editor__status-badge doc-editor__status-badge--${status}`}
            >
              {statusLabel}
            </span>
            <ShareDialog documentId={documentId} documentTitle={title} />
          </div>
        </div>
      </div>
    </header>
  );
}
