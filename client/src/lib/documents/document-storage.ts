import type { EssayDocument } from './document.types';

const STORAGE_KEY = 'team2-essay-documents';

function sortDocuments(documents: EssayDocument[]): EssayDocument[] {
  return [...documents].sort(
    (left, right) =>
      new Date(right.lastOpenedAt).getTime() -
      new Date(left.lastOpenedAt).getTime(),
  );
}

function readStoredDocuments(): EssayDocument[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as EssayDocument[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeStoredDocuments(documents: EssayDocument[]): void {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
}

export function getClientDocuments(): EssayDocument[] {
  return sortDocuments(readStoredDocuments());
}

export function upsertClientDocument(document: EssayDocument): EssayDocument[] {
  const storedDocuments = readStoredDocuments();
  const existingIndex = storedDocuments.findIndex(
    (item) => item.id === document.id,
  );

  const nextDocuments =
    existingIndex >= 0
      ? storedDocuments.map((item, index) =>
          index === existingIndex ? document : item,
        )
      : [document, ...storedDocuments];

  writeStoredDocuments(nextDocuments);
  return sortDocuments(nextDocuments);
}

export function deleteClientDocument(documentId: string): EssayDocument[] {
  const storedDocuments = readStoredDocuments();
  const nextDocuments = storedDocuments.filter((item) => item.id !== documentId);

  writeStoredDocuments(nextDocuments);
  return sortDocuments(nextDocuments);
}

export function touchClientDocument(
  documentId: string,
  updates: Partial<EssayDocument> = {},
): EssayDocument {
  const storedDocuments = readStoredDocuments();
  const existing = storedDocuments.find((item) => item.id === documentId);
  const now = new Date().toISOString();

  const nextDocument: EssayDocument = existing
    ? {
        ...existing,
        ...updates,
        lastOpenedAt: now,
      }
    : {
        id: documentId,
        title: updates.title?.trim() || 'Untitled document',
        createdAt: now,
        lastOpenedAt: now,
        accent: updates.accent ?? 'pink',
      };

  upsertClientDocument(nextDocument);
  return nextDocument;
}
