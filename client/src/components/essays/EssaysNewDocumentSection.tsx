import { Plus } from 'lucide-react';

interface EssaysNewDocumentSectionProps {
  onCreateDocument: () => void;
}

export default function EssaysNewDocumentSection({
  onCreateDocument,
}: EssaysNewDocumentSectionProps) {
  return (
    <section className="essays-dashboard__section">
      <h2 className="essays-dashboard__section-title">Start a new document</h2>
      <div className="essays-dashboard__new-grid">
        <button
          type="button"
          className="essays-new-card"
          onClick={onCreateDocument}
        >
          <span className="essays-new-card__icon">
            <Plus size={28} strokeWidth={2.2} />
          </span>
          <span className="essays-new-card__label">Add new docs file</span>
        </button>
      </div>
    </section>
  );
}
