'use client';

import { useEffect, useState } from 'react';

import {
  getClientDocuments,
  touchClientDocument,
} from '@/lib/documents/document-storage';

interface UseDocumentTitleOptions {
  documentId: string;
}

export function useDocumentTitle({ documentId }: UseDocumentTitleOptions) {
  const [title, setTitle] = useState('Untitled document');

  useEffect(() => {
    const existing = getClientDocuments().find(
      (document) => document.id === documentId,
    );

    if (existing) {
      setTitle(existing.title);
    }

    touchClientDocument(documentId, { title: existing?.title });
  }, [documentId]);

  const commitTitle = (value: string) => {
    const nextTitle = value.trim() || 'Untitled document';
    setTitle(nextTitle);
    touchClientDocument(documentId, { title: nextTitle });
  };

  return { title, setTitle, commitTitle };
}
