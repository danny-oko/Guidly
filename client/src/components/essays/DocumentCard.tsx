'use client';

import { FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import {
  formatDocumentDate,
  formatRelativeOpened,
} from '@/lib/documents/document.service';
import type { EssayDocument } from '@/lib/documents/document.types';

import DeleteDocumentDialog from './DeleteDocumentDialog';
import { DOCUMENT_ACCENT_CLASS } from './documentCard.constants';

interface DocumentCardProps {
  document: EssayDocument;
  onRename: (documentId: string, title: string) => void;
  onDelete: (documentId: string) => Promise<void>;
}

export default function DocumentCard({
  document,
  onRename,
  onDelete,
}: DocumentCardProps) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(document.title);

  useEffect(() => {
    setTitle(document.title);
  }, [document.title]);

  const commitTitle = () => {
    const nextTitle = title.trim() || 'Untitled document';
    setTitle(nextTitle);
    onRename(document.id, nextTitle);
    setEditing(false);
  };

  return (
    <div
      className={`essays-doc-card ${DOCUMENT_ACCENT_CLASS[document.accent]}`}
    >
      <DeleteDocumentDialog
        documentId={document.id}
        documentTitle={title}
        onDelete={onDelete}
      />
      <button
        type="button"
        className="essays-doc-card__open"
        onClick={() => router.push(`/essays/${document.id}`)}
      >
        <div className="essays-doc-card__icon-wrap">
          <FileText size={22} strokeWidth={2} />
        </div>
        <div className="essays-doc-card__body">
          {editing ? (
            <input
              type="text"
              value={title}
              autoFocus
              onChange={(event) => setTitle(event.target.value)}
              onBlur={commitTitle}
              onKeyDown={(event) => {
                event.stopPropagation();
                if (event.key === 'Enter') {
                  event.currentTarget.blur();
                }
                if (event.key === 'Escape') {
                  setTitle(document.title);
                  setEditing(false);
                }
              }}
              onClick={(event) => event.stopPropagation()}
              className="essays-doc-card__title-input"
              aria-label="Document title"
              spellCheck={false}
            />
          ) : (
            <h3
              className="essays-doc-card__title"
              onDoubleClick={(event) => {
                event.stopPropagation();
                setEditing(true);
              }}
            >
              {title}
            </h3>
          )}
          <p className="essays-doc-card__meta">
            {formatRelativeOpened(document.lastOpenedAt)}
          </p>
          <p className="essays-doc-card__meta essays-doc-card__meta--subtle">
            Created {formatDocumentDate(document.createdAt)}
          </p>
        </div>
      </button>
    </div>
  );
}
