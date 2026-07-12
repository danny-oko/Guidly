import {
  DashboardData,
  DashboardStats,
  University,
} from '../types/university.types';
import universitiesData from '../data/universities-dummy.json';

export function computeStats(universities: University[]): DashboardStats {
  const total = universities.length;

  if (total === 0) {
    return {
      totalUniversities: 0,
      avgAcceptanceRate: 0,
      avgSatScore: 0,
      avgQsRank: 0,
      avgCostAfterAid: 0,
      privateCount: 0,
      publicCount: 0,
      sizeBuckets: [
        { label: '<15k', count: 0 },
        { label: '15–30k', count: 0 },
        { label: '30–50k', count: 0 },
        { label: '50k+', count: 0 },
      ],
      acceptanceTrend: [],
    };
  }

  const avgAcceptanceRate = Math.round(
    universities.reduce((sum, uni) => sum + uni.acceptance_rate, 0) / total,
  );

  const avgSatScore = Math.round(
    universities.reduce((sum, uni) => sum + uni.average_sat_score, 0) / total,
  );

  const avgQsRank = Math.round(
    universities.reduce((sum, uni) => sum + uni.qs_rank, 0) / total,
  );

  const avgCostAfterAid = Math.round(
    universities.reduce((sum, uni) => sum + uni.cost_after_aid, 0) / total,
  );

  const privateCount = universities.filter(
    (uni) => uni.control === 'Private',
  ).length;
  const publicCount = universities.filter(
    (uni) => uni.control === 'Public',
  ).length;

  const sizeBuckets = [
    { label: '<15k', count: 0 },
    { label: '15–30k', count: 0 },
    { label: '30–50k', count: 0 },
    { label: '50k+', count: 0 },
  ];

  universities.forEach((uni) => {
    if (uni.size < 15000) sizeBuckets[0].count += 1;
    else if (uni.size < 30000) sizeBuckets[1].count += 1;
    else if (uni.size < 50000) sizeBuckets[2].count += 1;
    else sizeBuckets[3].count += 1;
  });

  const acceptanceTrend = [...universities]
    .sort((a, b) => a.qs_rank - b.qs_rank)
    .slice(0, 5)
    .map((uni) => ({
      name: uni.name.split(' ')[0],
      rate: uni.acceptance_rate,
    }));

  return {
    totalUniversities: total,
    avgAcceptanceRate,
    avgSatScore,
    avgQsRank,
    avgCostAfterAid,
    privateCount,
    publicCount,
    sizeBuckets,
    acceptanceTrend,
  };
}

export function getSparklineValues(universities: University[]): number[] {
  const topRanked = [...universities]
    .sort((a, b) => a.qs_rank - b.qs_rank)
    .slice(0, 5);

  if (topRanked.length === 0) return [];

  const pointCount = topRanked[0].acceptanceTrend.length;

  return Array.from({ length: pointCount }, (_, index) => {
    const sum = topRanked.reduce(
      (total, uni) => total + (uni.acceptanceTrend[index] ?? uni.acceptance_rate),
      0,
    );

    return sum / topRanked.length;
  });
}

export async function getDashboardData(): Promise<DashboardData> {
  const universities = universitiesData as University[];

  return {
    userName: 'Alex',
    universities,
    stats: computeStats(universities),
  };
}

export async function getUniversities(): Promise<University[]> {
  return universitiesData as University[];
}

export async function getUniversityById(
  id: number,
): Promise<University | undefined> {
  const universities = await getUniversities();
  return universities.find((uni) => uni.id === id);
}

export function universitySlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export async function getUniversityByRouteId(
  routeId: string,
): Promise<University | undefined> {
  const universities = await getUniversities();
  const numericId = Number(routeId);

  if (!Number.isNaN(numericId)) {
    return universities.find((uni) => uni.id === numericId);
  }

  const slug = routeId.toLowerCase();
  const bySlug = universities.find(
    (uni) => universitySlug(uni.name) === slug,
  );
  if (bySlug) return bySlug;

  const dashIndex = routeId.lastIndexOf('-');
  if (dashIndex > 0) {
    const namePart = routeId.slice(0, dashIndex);
    const byName = universities.find((uni) => uni.name === namePart);
    if (byName) return byName;
  }

  const byExactName = universities.find(
    (uni) => uni.name.toLowerCase() === routeId.toLowerCase(),
  );
  return byExactName;
}
