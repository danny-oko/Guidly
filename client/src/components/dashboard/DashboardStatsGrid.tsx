import { DashboardStats } from '../../lib/types/university.types';
import { buildSmoothSparklinePath } from '../../lib/utils/sparkline';
import GamePlanStatCard from './GamePlanStatCard';

interface DashboardStatsGridProps {
  stats: DashboardStats;
  sparklineValues: number[];
}

export default function DashboardStatsGrid({
  stats,
  sparklineValues,
}: DashboardStatsGridProps) {
  const maxBucket = Math.max(...stats.sizeBuckets.map((b) => b.count), 1);
  const sparklinePath = buildSmoothSparklinePath(sparklineValues, 200, 56, 6);

  return (
    <section className="dashboard-stats">
      <article className="stat-card stat-card--yellow">
        <div className="stat-card__head">
          <h2 className="stat-card__title">By size</h2>
          <span className="stat-card__meta">
            {stats.totalUniversities} total
          </span>
        </div>
        <div className="stat-card__bars">
          {stats.sizeBuckets.map((bucket) => (
            <div key={bucket.label} className="stat-card__bar-col">
              <div
                className="stat-card__bar"
                style={{ height: `${(bucket.count / maxBucket) * 100}%` }}
              />
              <span className="stat-card__bar-label">{bucket.label}</span>
            </div>
          ))}
        </div>
      </article>

      <article className="stat-card stat-card--pink">
        <div className="stat-card__head">
          <h2 className="stat-card__title">Acceptance rates</h2>
          <span className="stat-card__meta">Top ranked</span>
        </div>
        <div className="stat-card__line-chart">
          <svg
            viewBox="0 0 200 56"
            preserveAspectRatio="none"
            className="stat-card__svg"
            aria-hidden="true"
          >
            <path
              d={sparklinePath}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="stat-card__line-labels">
            {stats.acceptanceTrend.map((point) => (
              <span key={point.name} className="stat-card__line-label">
                {point.name}
              </span>
            ))}
          </div>
        </div>
      </article>

      <GamePlanStatCard />

      <article className="stat-card stat-card--blue" aria-hidden="true" />
    </section>
  );
}
