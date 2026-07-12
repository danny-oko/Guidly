import type { UniversityStatus } from '../types/university.types';

export const UNIVERSITY_STATUS_OPTIONS: UniversityStatus[] = [
  'Submitted',
  'Pending',
  'Not-Finished',
];

export function getStatusOptionClassName(
  status: UniversityStatus,
): 'submitted' | 'pending' | 'unfinished' {
  if (status === 'Submitted') return 'submitted';
  if (status === 'Pending') return 'pending';
  return 'unfinished';
}
