'use client';

import { useEffect, useState } from 'react';

import CollaborativeEditor from '@/components/essay-editor/CollaborativeEditor';
import { getClientDocuments } from '@/lib/documents/document-storage';

interface DocumentEditorRoomProps {
  documentId: string;
}

export default function DocumentEditorRoom({
  documentId,
}: DocumentEditorRoomProps) {
  const [title, setTitle] = useState('Untitled document');

  useEffect(() => {
    const matchedDocument = getClientDocuments().find(
      (document) => document.id === documentId,
    );

    if (matchedDocument) {
      setTitle(matchedDocument.title);
    }
  }, [documentId]);

  return <CollaborativeEditor documentId={documentId} title={title} />;
}
