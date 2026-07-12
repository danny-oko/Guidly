type ScheduleViewMode = 'today' | 'weekly' | 'monthly';

type ScheduleViewTabsProps = {
  viewMode: ScheduleViewMode;
  onChangeViewMode: (mode: ScheduleViewMode) => void;
};

export function ScheduleViewTabs({
  viewMode,
  onChangeViewMode,
}: ScheduleViewTabsProps) {
  return (
    <div className="mb-3 flex shrink-0 overflow-x-auto px-1 py-1">
      <div className="inline-flex min-w-max items-center gap-2 rounded-full bg-transparent p-0.5">
        <button
          type="button"
          onClick={() => onChangeViewMode('today')}
          className={`dashboard-search__chip ${viewMode === 'today' ? 'dashboard-search__chip--active' : ''}`}
        >
          Today
        </button>
        <button
          type="button"
          onClick={() => onChangeViewMode('weekly')}
          className={`dashboard-search__chip ${viewMode === 'weekly' ? 'dashboard-search__chip--active' : ''}`}
        >
          Weekly
        </button>
        <button
          type="button"
          onClick={() => onChangeViewMode('monthly')}
          className={`dashboard-search__chip ${viewMode === 'monthly' ? 'dashboard-search__chip--active' : ''}`}
        >
          Monthly
        </button>
      </div>
    </div>
  );
}
