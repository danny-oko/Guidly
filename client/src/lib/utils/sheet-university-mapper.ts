import type {
  SheetUniversityListItem,
  SheetUniversityRecord,
} from '../types/sheet-university.types';

export type SheetRow = string[];

export function normalizeKey(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

export function getCellByKey(
  row: SheetRow,
  headers: string[],
  keys: string[],
): string | undefined {
  const index = headers.findIndex((header) =>
    keys.includes(normalizeKey(header)),
  );

  return index >= 0 ? row[index]?.trim() : undefined;
}

export function getField(
  record: SheetUniversityRecord,
  keys: string[],
): string | undefined {
  for (const key of keys) {
    const value = record.fields[normalizeKey(key)];
    if (value?.trim()) return value.trim();
  }
  return undefined;
}

export function displayValue(value?: string): string {
  return value?.trim() || 'N/A';
}

export function normalizeWebsiteUrl(raw: string): string | undefined {
  const trimmed = raw.trim();
  if (!trimmed || trimmed === 'N/A') return undefined;

  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (/^www\./i.test(trimmed)) return `https://${trimmed}`;
  if (/^[a-z0-9.-]+\.[a-z]{2,}/i.test(trimmed)) return `https://${trimmed}`;

  return undefined;
}

export function extractWebsiteFromText(text: string): string | undefined {
  const urlMatch = text.match(
    /(?:https?:\/\/|www\.)[^\s,;)]+|(?:[a-z0-9-]+\.)+(?:edu|org|com)(?:\/[^\s,;)]*)?/i,
  );
  if (!urlMatch) return undefined;

  return normalizeWebsiteUrl(urlMatch[0].replace(/[.,;]+$/, ''));
}

export function resolveUniversityWebsite(
  record: SheetUniversityRecord,
): string | undefined {
  const direct = getField(record, [
    'website',
    'url',
    'link',
    'officialwebsite',
    'universitywebsite',
    'homepage',
  ]);

  if (direct) {
    return normalizeWebsiteUrl(direct) ?? extractWebsiteFromText(direct);
  }

  for (const key of ['howtoapply', 'notes', 'source']) {
    const value = record.fields[key];
    if (value) {
      const found = extractWebsiteFromText(value);
      if (found) return found;
    }
  }

  for (const value of Object.values(record.fields)) {
    const found = extractWebsiteFromText(value);
    if (found) return found;
  }

  return undefined;
}

export function buildUniversitySlug(
  name: string,
  city?: string,
  state?: string,
): string {
  return [name, city, state]
    .filter(Boolean)
    .join('-')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function rowToFields(
  headers: string[],
  row: SheetRow,
): Record<string, string> {
  const fields: Record<string, string> = {};

  headers.forEach((header, index) => {
    fields[normalizeKey(header)] = row[index]?.trim() ?? '';
  });

  return fields;
}

export function mapRowsToSheetUniversities(
  rows: SheetRow[],
): SheetUniversityRecord[] {
  const [headerRow, ...dataRows] = rows;
  const headers =
    headerRow?.map(
      (header, index) => header?.trim() || `Column ${index + 1}`,
    ) ?? [];

  return dataRows
    .filter((row) => row.some((cell) => cell?.trim()))
    .map((row, rowIndex) => {
      const fields = rowToFields(headers, row);
      const name =
        getCellByKey(row, headers, [
          'universities',
          'university',
          'universityname',
          'name',
          'school',
          'college',
        ]) ||
        row[0]?.trim() ||
        `University ${rowIndex + 1}`;
      const city = getCellByKey(row, headers, ['city']) ?? '';
      const state = getCellByKey(row, headers, ['state']) ?? '';
      const stateFullName =
        getCellByKey(row, headers, ['nameofthestate', 'statefullname']) ?? '';

      const record: SheetUniversityRecord = {
        id: buildUniversitySlug(name, city, state),
        rowIndex,
        name,
        city,
        state,
        stateFullName,
        fields,
        headers,
      };

      return {
        ...record,
        website: resolveUniversityWebsite(record),
      };
    });
}

export function sheetRecordToListItem(
  record: SheetUniversityRecord,
): SheetUniversityListItem {
  const field =
    getField(record, ['primaryfocus', 'bestfield', 'field', 'major']) ?? '';
  const qsRank =
    getField(record, [
      'qsworlduniversitieswithintheunitedstates',
      'qsworlduniversities',
      'qsworldrank',
      'qs',
    ]) ?? '';
  const acceptanceRate =
    getField(record, ['acceptancerate', 'acceptance', 'overallacceptancerate']) ??
    '';
  const website = record.website ?? resolveUniversityWebsite(record);
  const subtitle = [record.city, record.state].filter(Boolean).join(', ');

  return {
    id: record.id,
    name: record.name,
    subtitle,
    field: displayValue(field),
    qsRank: displayValue(qsRank),
    acceptanceRate: displayValue(acceptanceRate),
    website,
    searchText: [
      record.name,
      subtitle,
      field,
      qsRank,
      acceptanceRate,
      ...Object.values(record.fields),
    ]
      .join(' ')
      .toLowerCase(),
  };
}

export function findSheetUniversityByRouteId(
  universities: SheetUniversityRecord[],
  routeId: string,
): SheetUniversityRecord | undefined {
  const decoded = decodeURIComponent(routeId);

  const bySlug = universities.find((uni) => uni.id === decoded.toLowerCase());
  if (bySlug) return bySlug;

  const legacyMatch = decoded.match(/^(.+)-(\d+)$/);
  if (legacyMatch) {
    const rowIndex = Number(legacyMatch[2]);
    const byRow = universities.find((uni) => uni.rowIndex === rowIndex);
    if (byRow) return byRow;

    const namePart = legacyMatch[1];
    const byName = universities.find((uni) => uni.name === namePart);
    if (byName) return byName;
  }

  const slugCandidate = decoded.toLowerCase();
  return universities.find((uni) => uni.id === slugCandidate);
}

export function parseNumericField(value?: string): number | null {
  if (!value?.trim()) return null;
  const cleaned = value.replace(/[^0-9.]/g, '');
  if (!cleaned) return null;
  const num = Number(cleaned);
  return Number.isNaN(num) ? null : num;
}
