'use client';

import type { Editor } from '@tiptap/react';
import { FileDown } from 'lucide-react';
import { useState } from 'react';

import { downloadDocumentDocx } from '@/lib/export/downloadDocument';

interface DocumentExportActionsProps {
  editor: Editor;
  title: string;
}

export default function DocumentExportActions({
  editor,
  title,
}: DocumentExportActionsProps) {
  const [exporting, setExporting] = useState(false);

  const handleDocxDownload = async () => {
    setExporting(true);

    try {
      await downloadDocumentDocx(editor, title);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="doc-editor__export-actions">
      <button
        type="button"
        className="doc-editor__export-btn"
        onClick={handleDocxDownload}
        disabled={exporting}
      >
        <FileDown size={14} strokeWidth={2.2} />
        <span>{exporting ? 'Exporting...' : 'DOCX'}</span>
      </button>
    </div>
  );
}
