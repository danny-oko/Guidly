'use client';

import { ArrowLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

import type { SheetUniversityRecord } from '../../lib/types/sheet-university.types';
import UniversityDetailsTabs from './UniversityDetailsTabs';
import UniversityProfileCard from './UniversityProfileCard';

interface UniversityDetailsPageProps {
  university: SheetUniversityRecord;
}

export default function UniversityDetailsPage({
  university,
}: UniversityDetailsPageProps) {
  const refId = university.id
    .split('-')
    .slice(0, 2)
    .map((part) => part.slice(0, 3).toUpperCase())
    .join('-');

  return (
    <main className="intelly-detail">
      <nav className="intelly-detail__crumb" aria-label="Breadcrumb">
        <Link href="/universities" className="intelly-detail__back">
          <ArrowLeft size={15} strokeWidth={2.2} aria-hidden />
        </Link>
        <Link href="/universities" className="intelly-detail__crumb-link">
          All universities
        </Link>
        <ChevronRight size={14} strokeWidth={2.2} aria-hidden />
        <span className="intelly-detail__crumb-current">
          {refId} — {university.name}
        </span>
      </nav>

      <div className="intelly-detail__grid">
        <UniversityProfileCard university={university} />
        <UniversityDetailsTabs university={university} />
      </div>
    </main>
  );
}
