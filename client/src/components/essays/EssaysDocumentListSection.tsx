import type { EssayDocument } from '@/lib/documents/document.types';

import DocumentCard from './DocumentCard';

interface EssaysDocumentListSectionProps {
  documents: EssayDocument[];
  onRenameDocument: (documentId: string, nextTitle: string) => void;
  onDeleteDocument: (documentId: string) => Promise<void>;
}

export default function EssaysDocumentListSection({
  documents,
  onRenameDocument,
  onDeleteDocument,
}: EssaysDocumentListSectionProps) {
  return (
    <section className="essays-dashboard__section essays-dashboard__section--grow">
      <div className="essays-dashboard__section-head">
        <h2 className="essays-dashboard__section-title">
          Previously edited files
        </h2>
        <span className="essays-dashboard__count">
          {documents.length} documents
        </span>
      </div>

      {documents.length > 0 ? (
        <div className="essays-dashboard__list">
          {documents.map((document) => (
            <DocumentCard
              key={document.id}
              document={document}
              onRename={onRenameDocument}
              onDelete={onDeleteDocument}
            />
          ))}
        </div>
      ) : (
        <div className="essays-dashboard__empty">
          <p className="essays-dashboard__empty-title">No documents yet</p>
          <p className="essays-dashboard__empty-text">
            Create your first document to start writing and collaborating.
          </p>
        </div>
      )}
    </section>
  );
}
