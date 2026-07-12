export const UNIVERSITY_ACCENTS = ['blue', 'pink', 'green'] as const;

export type UniversityAccent = (typeof UNIVERSITY_ACCENTS)[number];

export const UNIVERSITY_CARD_ACCENTS = [
  'blue',
  'pink',
  'green',
  'yellow',
] as const;

export type UniversityCardAccent = (typeof UNIVERSITY_CARD_ACCENTS)[number];

export function getUniversityAccent(index: number): UniversityAccent {
  return UNIVERSITY_ACCENTS[index % UNIVERSITY_ACCENTS.length];
}

export function getUniversityCardAccent(index: number): UniversityCardAccent {
  return UNIVERSITY_CARD_ACCENTS[index % UNIVERSITY_CARD_ACCENTS.length];
}

export function getUniversityStatusAccent(
  status?: 'Submitted' | 'Pending' | 'Not-Finished' | 'All',
): UniversityCardAccent {
  if (status === 'Submitted') return 'green';
  if (status === 'Pending') return 'yellow';
  if (status === 'Not-Finished') return 'pink';
  return 'blue';
}
