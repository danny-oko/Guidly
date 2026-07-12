import type { LanguageToolMatch, LanguageToolResponse } from './languageTool.types';

async function fetchLanguageToolMatches(text: string): Promise<LanguageToolMatch[]> {
  if (!text.trim()) {
    return [];
  }

  const formData = new FormData();
  formData.append('text', text);
  formData.append('language', 'en-US');

  const response = await fetch('/api/spellcheck', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    return [];
  }

  const data = (await response.json()) as LanguageToolResponse;
  return data.matches ?? [];
}

interface PendingSpellcheckRequest {
  text: string;
  resolve: (matches: LanguageToolMatch[]) => void;
}

const DEBOUNCE_MS = 650;
let debounceTimer: ReturnType<typeof setTimeout> | null = null;
let pendingRequests: PendingSpellcheckRequest[] = [];

export async function checkLanguageTool(text: string): Promise<LanguageToolMatch[]> {
  if (!text.trim()) {
    return [];
  }

  return new Promise((resolve) => {
    pendingRequests.push({ text, resolve });

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    debounceTimer = setTimeout(async () => {
      const batch = pendingRequests;
      pendingRequests = [];
      debounceTimer = null;

      const uniqueTexts = [...new Set(batch.map((request) => request.text))];
      const matchesByText = new Map<string, LanguageToolMatch[]>();

      await Promise.all(
        uniqueTexts.map(async (entry) => {
          matchesByText.set(entry, await fetchLanguageToolMatches(entry));
        }),
      );

      batch.forEach(({ text: requestText, resolve: resolveRequest }) => {
        resolveRequest(matchesByText.get(requestText) ?? []);
      });
    }, DEBOUNCE_MS);
  });
}
