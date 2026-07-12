'use client';

import { UniversityStatus } from '../../lib/types/university.types';
import { Search } from 'lucide-react';

export type StatusFilter = 'All' | UniversityStatus;

const STATUS_FILTERS: StatusFilter[] = [
  'All',
  'Submitted',
  'Pending',
  'Not-Finished',
];

interface DashboardSearchBarProps {
  activeFilter: StatusFilter;
  onFilterChange: (filter: StatusFilter) => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

export default function DashboardSearchBar({
  activeFilter,
  onFilterChange,
  searchValue,
  onSearchChange,
}: DashboardSearchBarProps) {
  return (
    <div className="dashboard-search">
      <div className="dashboard-search__input-wrap">
        <Search
          size={16}
          strokeWidth={1.8}
          className="dashboard-search__icon"
        />
        <input
          type="search"
          className="dashboard-search__input"
          placeholder="Search universities, fields, or deadlines..."
          aria-label="Search universities"
          value={searchValue}
          onChange={(event) => onSearchChange?.(event.target.value)}
        />
      </div>

      <div className="dashboard-search__filters">
        {STATUS_FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            className={`dashboard-search__chip ${
              activeFilter === filter ? 'dashboard-search__chip--active' : ''
            }`}
            onClick={() => onFilterChange(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}
