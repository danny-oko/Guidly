import { Search } from 'lucide-react';
import Link from 'next/link';

const FILTER_BADGES = [
  { label: 'universities', href: '/universities' },
  { label: 'essays', href: '/essays' },
  { label: 'gameplan', href: '/game-plan' },
  { label: 'calendar', href: '/calendar' },
] as const;

export function ScheduleSearchInput() {
  return (
    <div className="dashboard-search mb-3">
      <label htmlFor="schedule-search" className="sr-only">
        Search schedule
      </label>
      <div className="dashboard-search__input-wrap max-w-[720px]">
        <Search
          size={16}
          strokeWidth={1.8}
          className="dashboard-search__icon"
        />
        <input
          id="schedule-search"
          type="search"
          className="dashboard-search__input"
          placeholder="Search"
          aria-label="Search schedules"
        />
        <div className="hidden flex-wrap items-center gap-1.5 sm:flex">
          {FILTER_BADGES.map((badge) => (
            <Link
              key={badge.label}
              href={badge.href}
              className="rounded-full border border-dotted border-[#e8dfd0] bg-white px-2.5 py-1 text-[11px] font-semibold capitalize text-[#666666] transition hover:bg-[#f6f1e7]"
            >
              {badge.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
