import type { SheetUniversityRecord } from '../../lib/types/sheet-university.types';
import {
  displayValue,
  getField,
  normalizeKey,
} from './sheet-university-mapper';
import type { UniversityFieldGroup } from './university-field-groups';

export function getGroupedFieldRows(
  university: SheetUniversityRecord,
  groups: UniversityFieldGroup[],
): { group: UniversityFieldGroup; rows: { label: string; value: string }[] }[] {
  return groups
    .map((group) => {
      const rows = group.keys
        .map((key) => {
          const headerIndex = university.headers.findIndex(
            (header) => normalizeKey(header) === key,
          );
          const label =
            headerIndex >= 0 ? university.headers[headerIndex] : key;
          const value = university.fields[key];
          if (!value?.trim()) return null;
          const display = displayValue(value);
          if (display === 'N/A') return null;
          return { label, value: display };
        })
        .filter(Boolean) as { label: string; value: string }[];

      return { group, rows };
    })
    .filter((entry) => entry.rows.length > 0);
}

export function getFieldRowsByKeys(
  university: SheetUniversityRecord,
  keys: string[],
): { label: string; value: string }[] {
  return keys
    .map((key) => {
      const headerIndex = university.headers.findIndex(
        (header) => normalizeKey(header) === key,
      );
      const label = headerIndex >= 0 ? university.headers[headerIndex] : key;
      const value = university.fields[key];
      if (!value?.trim()) return null;
      const display = displayValue(value);
      if (display === 'N/A') return null;
      return { label, value: display };
    })
    .filter(Boolean) as { label: string; value: string }[];
}

export function isTruthySheetValue(value?: string): boolean {
  if (!value?.trim()) return false;
  const normalized = value.trim().toLowerCase();
  return normalized === 'yes' || normalized === 'true' || normalized === '1';
}

export function getHighlightBadges(university: SheetUniversityRecord) {
  const hbcu = getField(university, ['hbcu']);
  const badges: { label: string; tone: 'green' | 'blue' | 'pink' | 'yellow' }[] =
    [];

  if (isTruthySheetValue(getField(university, ['inusnewsnationalt25lact5']))) {
    badges.push({ label: 'US News T25', tone: 'green' });
  }
  if (
    isTruthySheetValue(
      getField(university, ['inusnewsorforbesnationalt100lact40']),
    )
  ) {
    badges.push({ label: 'Top 100', tone: 'blue' });
  }
  if (
    isTruthySheetValue(
      getField(university, ['intimeshighereducationorqsglobaltop200']),
    )
  ) {
    badges.push({ label: 'Global Top 200', tone: 'pink' });
  }
  if (hbcu && hbcu.toLowerCase() !== 'no' && hbcu !== 'N/A') {
    badges.push({ label: 'HBCU', tone: 'yellow' });
  }

  return badges;
}
