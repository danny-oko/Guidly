interface DashboardHeaderProps {
  userName: string;
  totalUniversities: number;
  avgAcceptanceRate: number;
}

export default function DashboardHeader({
  userName,
  totalUniversities,
  avgAcceptanceRate,
}: DashboardHeaderProps) {
  return (
    <header className="dashboard-header">
      <h1 className="dashboard-header__title">Good morning, {userName}</h1>
      <p className="dashboard-header__subtitle">
        You&apos;re tracking {totalUniversities} universities with an average
        acceptance rate of {avgAcceptanceRate}%. Review your shortlist and
        upcoming deadlines below.
      </p>
    </header>
  );
}
