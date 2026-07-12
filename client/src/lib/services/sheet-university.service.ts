import { fetchSheetRows } from '../google/fetch-sheet-rows';
import type { SheetUniversityRecord } from '../types/sheet-university.types';
import {
  findSheetUniversityByRouteId,
  mapRowsToSheetUniversities,
} from '../utils/sheet-university-mapper';

let cachedUniversities: SheetUniversityRecord[] | null = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 5 * 60 * 1000;

async function getSheetUniversities(): Promise<SheetUniversityRecord[]> {
  const now = Date.now();
  if (cachedUniversities && now - cacheTimestamp < CACHE_TTL_MS) {
    return cachedUniversities;
  }

  const rows = await fetchSheetRows();
  cachedUniversities = mapRowsToSheetUniversities(rows);
  cacheTimestamp = now;
  return cachedUniversities;
}

export async function getSheetUniversityByRouteId(
  routeId: string,
): Promise<SheetUniversityRecord | undefined> {
  const universities = await getSheetUniversities();
  return findSheetUniversityByRouteId(universities, routeId);
}

export async function getAllSheetUniversities(): Promise<SheetUniversityRecord[]> {
  return getSheetUniversities();
}
