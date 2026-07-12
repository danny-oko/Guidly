'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Layers,
} from 'lucide-react';

import DashboardSearchBar, {
  type StatusFilter,
} from '../dashboard/DashboardSearchBar';
import type { UniversityStatus } from '../../lib/types/university.types';
import type { SheetUniversityListItem } from '../../lib/types/sheet-university.types';
import {
  mapRowsToSheetUniversities,
  sheetRecordToListItem,
} from '../../lib/utils/sheet-university-mapper';
import { sheetUniversityToListItem } from '../../lib/utils/university-list-mappers';
import UniversityList from './UniversityList';
import UniversityListItem from './UniversityListItem';
import UniversityListScrollSection from './UniversityListScrollSection';

function normalizeStatus(value?: string): StatusFilter | undefined {
  if (!value) return undefined;

  const normalized = value.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (normalized === 'submitted') return 'Submitted';
  if (normalized === 'pending') return 'Pending';
  if (normalized === 'notfinished' || normalized === 'unfinished') {
    return 'Not-Finished';
  }

  return undefined;
}

export default function UniversitiesSearchControls() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<StatusFilter>('All');
  const [searchValue, setSearchValue] = useState('');
  const [universities, setUniversities] = useState<SheetUniversityListItem[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [myListIds, setMyListIds] = useState<Set<string>>(() => new Set());
  const [statusOverrides, setStatusOverrides] = useState<
    Record<string, StatusFilter | undefined>
  >({});

  useEffect(() => {
    let shouldIgnore = false;

    async function loadUniversities() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/sheets-robot', {
          cache: 'no-store',
        });
        const result = await response.json();

        if (!response.ok || !result.success || !Array.isArray(result.data)) {
          throw new Error(result.error || 'Failed to load universities');
        }

        if (!shouldIgnore) {
          const records = mapRowsToSheetUniversities(result.data);
          setUniversities(records.map(sheetRecordToListItem));
        }
      } catch (caughtError) {
        if (!shouldIgnore) {
          setError(
            caughtError instanceof Error
              ? caughtError.message
              : 'Failed to load universities',
          );
        }
      } finally {
        if (!shouldIgnore) {
          setIsLoading(false);
        }
      }
    }

    loadUniversities();

    return () => {
      shouldIgnore = true;
    };
  }, []);

  const filteredUniversities = useMemo(() => {
    const query = searchValue.trim().toLowerCase();

    return universities.filter((university) => {
      const status = statusOverrides[university.id] ?? university.status;
      const matchesSearch = query
        ? university.searchText.includes(query)
        : true;
      const matchesStatus =
        activeFilter === 'All' || !status || status === activeFilter;

      return matchesSearch && matchesStatus;
    });
  }, [activeFilter, searchValue, statusOverrides, universities]);

  const handleAddToList = (id: string | number) => {
    const key = String(id);
    setMyListIds((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const handleChangeStatus = (
    id: string | number,
    status: UniversityStatus,
  ) => {
    const key = String(id);
    setStatusOverrides((current) => ({
      ...current,
      [key]: status,
    }));
  };

  const handleOpenDetails = (id: string | number) => {
    router.push(`/universities/${encodeURIComponent(String(id))}`);
  };

  const statusCounts = useMemo(() => {
    const counts = {
      total: universities.length,
      submitted: 0,
      pending: 0,
      unfinished: 0,
    };

    for (const university of universities) {
      const status = statusOverrides[university.id] ?? university.status;
      if (status === 'Submitted') counts.submitted += 1;
      if (status === 'Pending') counts.pending += 1;
      if (status === 'Not-Finished') counts.unfinished += 1;
    }

    return counts;
  }, [statusOverrides, universities]);

  return (
    <div className="universities-page__inner">
      <header className="universities-panel" aria-label="University filters">
        <div className="universities-panel__top">
          <div className="universities-panel__heading">
            <div className="universities-header__eyebrow">
              <GraduationCap size={14} strokeWidth={2.2} aria-hidden />
              <span>College shortlist</span>
            </div>
            <h1 className="universities-header__title">Universities</h1>
          </div>

          <div
            className="universities-stats universities-stats--compact"
            aria-label="Application summary"
          >
            <div className="universities-stat universities-stat--blue">
              <span className="universities-stat__icon" aria-hidden>
                <Layers size={14} strokeWidth={2.2} />
              </span>
              <span className="universities-stat__value">{statusCounts.total}</span>
              <span className="universities-stat__label">Total</span>
            </div>
            <div className="universities-stat universities-stat--green">
              <span className="universities-stat__icon" aria-hidden>
                <CheckCircle2 size={14} strokeWidth={2.2} />
              </span>
              <span className="universities-stat__value">
                {statusCounts.submitted}
              </span>
              <span className="universities-stat__label">Submitted</span>
            </div>
            <div className="universities-stat universities-stat--yellow">
              <span className="universities-stat__icon" aria-hidden>
                <Clock3 size={14} strokeWidth={2.2} />
              </span>
              <span className="universities-stat__value">{statusCounts.pending}</span>
              <span className="universities-stat__label">Pending</span>
            </div>
            <div className="universities-stat universities-stat--pink">
              <span className="universities-stat__icon" aria-hidden>
                <AlertCircle size={14} strokeWidth={2.2} />
              </span>
              <span className="universities-stat__value">
                {statusCounts.unfinished}
              </span>
              <span className="universities-stat__label">Not finished</span>
            </div>
          </div>
        </div>

        <div className="universities-panel__controls">
          <DashboardSearchBar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            searchValue={searchValue}
            onSearchChange={setSearchValue}
          />
        </div>
      </header>

      <section className="universities-results" aria-label="University list">
        <div className="universities-results__head">
          <div className="universities-results__title-group">
            <h2 className="universities-results__title">Your shortlist</h2>
            <span className="universities-results__count">
              {filteredUniversities.length}
            </span>
          </div>
          {!isLoading && !error && (
            <p className="universities-results__meta">
              {activeFilter === 'All'
                ? 'Showing all tracked schools'
                : `Filtered by ${activeFilter}`}
            </p>
          )}
        </div>

        <UniversityListScrollSection>
            {isLoading && (
              <div className="universities-results__state">
                <p>Loading universities...</p>
              </div>
            )}

            {error && (
              <div className="universities-results__state universities-results__state--error">
                <p>{error}</p>
              </div>
            )}

            {!isLoading && !error && filteredUniversities.length === 0 && (
              <div className="universities-results__state">
                <p className="universities-results__state-title">
                  No matches found
                </p>
                <p className="universities-results__state-text">
                  Try adjusting your search or status filter.
                </p>
              </div>
            )}

            {!isLoading && !error && filteredUniversities.length > 0 && (
              <UniversityList>
                {filteredUniversities.map((university) => {
                  const status = statusOverrides[university.id] ?? university.status;

                  return (
                    <UniversityListItem
                      key={university.id}
                      university={{
                        ...sheetUniversityToListItem(university),
                        status,
                      }}
                      isInMyList={myListIds.has(university.id)}
                      onSelect={handleOpenDetails}
                      onAddToList={handleAddToList}
                      onChangeStatus={handleChangeStatus}
                      onOpenDetails={handleOpenDetails}
                    />
                  );
                })}
              </UniversityList>
            )}
          </UniversityListScrollSection>
      </section>
    </div>
  );
}
