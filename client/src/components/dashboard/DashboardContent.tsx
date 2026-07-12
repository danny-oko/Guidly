'use client';

import { useEffect, useMemo, useState } from 'react';

import DashboardHeader from './DashboardHeader';
import DashboardSearchBar, { type StatusFilter } from './DashboardSearchBar';
import DashboardStatsGrid from './DashboardStatsGrid';
import UniversityExplorer from './UniversityExplorer';
import { University } from '../../lib/types/university.types';
import {
  computeStats,
  getSparklineValues,
} from '../../lib/services/university.service';
import type { UniversityStatus } from '../../lib/types/university.types';

interface DashboardContentProps {
  userName: string;
  universities: University[];
}

export default function DashboardContent({
  userName,
  universities,
}: DashboardContentProps) {
  const [activeFilter, setActiveFilter] = useState<StatusFilter>('All');
  const [selectedId, setSelectedId] = useState(universities[0]?.id ?? 0);
  const [myListIds, setMyListIds] = useState<Set<number>>(() => new Set());
  const [statusOverrides, setStatusOverrides] = useState<
    Record<number, StatusFilter | undefined>
  >({});

  const universitiesWithOverrides = useMemo(
    () =>
      universities.map((uni) => ({
        ...uni,
        status: statusOverrides[uni.id] ?? uni.status,
      })),
    [universities, statusOverrides],
  );

  const filteredUniversities = useMemo(() => {
    if (activeFilter === 'All') return universitiesWithOverrides;
    return universitiesWithOverrides.filter((uni) => uni.status === activeFilter);
  }, [activeFilter, universitiesWithOverrides]);

  const stats = useMemo(
    () => computeStats(filteredUniversities),
    [filteredUniversities],
  );

  const sparklineValues = useMemo(
    () => getSparklineValues(filteredUniversities),
    [filteredUniversities],
  );

  useEffect(() => {
    if (
      filteredUniversities.length > 0 &&
      !filteredUniversities.some((uni) => uni.id === selectedId)
    ) {
      setSelectedId(filteredUniversities[0].id);
    }
  }, [filteredUniversities, selectedId]);

  const handleAddToList = (id: number) => {
    setMyListIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleChangeStatus = (id: number, status: UniversityStatus) => {
    setStatusOverrides((current) => ({
      ...current,
      [id]: status,
    }));
  };

  return (
    <div className="dashboard-home">
      <div className="dashboard-home__top">
        <DashboardSearchBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
        <DashboardHeader
          userName={userName}
          totalUniversities={stats.totalUniversities}
          avgAcceptanceRate={stats.avgAcceptanceRate}
        />
        <DashboardStatsGrid stats={stats} sparklineValues={sparklineValues} />
      </div>

      <UniversityExplorer
        universities={filteredUniversities}
        selectedId={selectedId}
        onSelect={setSelectedId}
        myListIds={myListIds}
        onAddToList={handleAddToList}
        onChangeStatus={handleChangeStatus}
      />
    </div>
  );
}
