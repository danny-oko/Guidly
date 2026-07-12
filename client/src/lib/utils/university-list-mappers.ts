import type { StatusFilter } from '../../components/dashboard/DashboardSearchBar';
import type { UniversityListItemData } from '../../components/universities/UniversityListItem';
import type { University } from '../types/university.types';

export function universityToListItem(uni: University): UniversityListItemData {
  return {
    id: uni.id,
    name: uni.name,
    subtitle: uni.best_field,
    qsRank: uni.qs_rank,
    acceptanceRate: uni.acceptance_rate,
    status: uni.status,
    website: uni.website,
  };
}

export function sheetUniversityToListItem(uni: {
  id: string;
  name: string;
  status?: StatusFilter;
  subtitle?: string;
  field: string;
  qsRank: string;
  acceptanceRate: string;
  website?: string;
}): UniversityListItemData {
  return {
    id: uni.id,
    name: uni.name,
    subtitle: uni.field !== 'N/A' ? uni.field : uni.subtitle || 'N/A',
    qsRank: uni.qsRank,
    acceptanceRate: uni.acceptanceRate,
    status: uni.status,
    website: uni.website,
  };
}
