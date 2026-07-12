'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { createDocument } from '@/lib/documents/document.service';
import {
  deleteClientDocument,
  getClientDocuments,
  touchClientDocument,
  upsertClientDocument,
} from '@/lib/documents/document-storage';
import type { EssayDocument } from '@/lib/documents/document.types';

export function useEssaysDocuments() {
  const router = useRouter();
  const [documents, setDocuments] = useState<EssayDocument[]>([]);

  useEffect(() => {
    setDocuments(getClientDocuments());
  }, []);

  const refreshDocuments = () => {
    setDocuments(getClientDocuments());
  };

  const handleCreateDocument = () => {
    const nextDocument = createDocument();
    upsertClientDocument(nextDocument);
    refreshDocuments();
    router.push(`/essays/${nextDocument.id}`);
  };

  const handleRenameDocument = (documentId: string, nextTitle: string) => {
    touchClientDocument(documentId, { title: nextTitle });
    refreshDocuments();
  };

  const handleDeleteDocument = async (documentId: string) => {
    const response = await fetch('/api/documents/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ documentId }),
      cache: 'no-store',
    });

    if (!response.ok) {
      const payload = (await response.json()) as { error?: string };
      throw new Error(payload.error || 'Unable to delete document');
    }

    deleteClientDocument(documentId);
    refreshDocuments();
  };

  return {
    documents,
    handleCreateDocument,
    handleRenameDocument,
    handleDeleteDocument,
  };
}
