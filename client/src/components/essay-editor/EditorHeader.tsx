import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface EditorHeaderProps {
  title: string;
  status: 'connecting' | 'synced' | 'error';
}

export default function EditorHeader({ title, status }: EditorHeaderProps) {
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
          <h1 className="doc-editor__title">{title}</h1>
        </div>
        <div className="doc-editor__header-right">
          <span
            className={`doc-editor__status-badge doc-editor__status-badge--${status}`}
          >
            {statusLabel}
          </span>
        </div>
      </div>
    </header>
  );
}
