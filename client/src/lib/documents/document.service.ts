import type { CreateDocumentInput, DocumentAccent, EssayDocument } from './document.types';

const DOCUMENT_ACCENTS: DocumentAccent[] = ['pink', 'blue', 'green', 'yellow'];

function pickAccent(seed: number): DocumentAccent {
  return DOCUMENT_ACCENTS[seed % DOCUMENT_ACCENTS.length];
}

export function createDocumentId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `essay-${crypto.randomUUID()}`;
  }

  return `essay-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export function createDocument(input: CreateDocumentInput = {}): EssayDocument {
  const now = new Date().toISOString();
  const accent = input.accent ?? pickAccent(Date.now());

  return {
    id: createDocumentId(),
    title: input.title?.trim() || 'Untitled document',
    lastOpenedAt: now,
    createdAt: now,
    accent,
  };
}

export function formatDocumentDate(value: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}

export function formatRelativeOpened(value: string): string {
  const openedAt = new Date(value).getTime();
  const diffMs = Date.now() - openedAt;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) {
    return 'Opened today';
  }

  if (diffDays === 1) {
    return 'Opened yesterday';
  }

  if (diffDays < 7) {
    return `Opened ${diffDays} days ago`;
  }

  return `Opened ${formatDocumentDate(value)}`;
}
