'use client';

import EssaysDashboardHeader from './EssaysDashboardHeader';
import EssaysDocumentListSection from './EssaysDocumentListSection';
import EssaysNewDocumentSection from './EssaysNewDocumentSection';
import { useEssaysDocuments } from './useEssaysDocuments';

export default function EssaysDashboard() {
  const {
    documents,
    handleCreateDocument,
    handleRenameDocument,
    handleDeleteDocument,
  } = useEssaysDocuments();

  return (
    <div className="essays-dashboard">
      <EssaysDashboardHeader />
      <EssaysNewDocumentSection onCreateDocument={handleCreateDocument} />
      <EssaysDocumentListSection
        documents={documents}
        onRenameDocument={handleRenameDocument}
        onDeleteDocument={handleDeleteDocument}
      />
    </div>
  );
}
