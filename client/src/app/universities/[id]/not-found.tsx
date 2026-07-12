import Link from 'next/link';

export default function UniversityNotFound() {
  return (
    <main className="intelly-detail">
      <div className="universities-results__state">
        <p className="universities-results__state-title">University not found</p>
        <p className="universities-results__state-text">
          This university may have been removed or the link is incorrect.
        </p>
        <Link href="/universities" className="doc-editor__back-link">
          Back to all universities
        </Link>
      </div>
    </main>
  );
}
