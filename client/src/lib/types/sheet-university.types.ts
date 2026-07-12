export interface SheetUniversityRecord {
  id: string;
  rowIndex: number;
  name: string;
  city: string;
  state: string;
  stateFullName: string;
  website?: string;
  /** Normalized header key → cell value */
  fields: Record<string, string>;
  /** Original column headers in sheet order */
  headers: string[];
}

export interface SheetUniversityListItem {
  id: string;
  name: string;
  subtitle: string;
  field: string;
  qsRank: string;
  acceptanceRate: string;
  website?: string;
  status?: string;
  searchText: string;
}
