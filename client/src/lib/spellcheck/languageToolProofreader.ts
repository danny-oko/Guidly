import type {
  IProofreaderInterface,
  ITextWithPosition,
} from '@farscrl/tiptap-extension-spellchecker';

import { checkLanguageTool } from './checkLanguageTool';
import {
  cacheSpellcheckMessage,
  clearSpellcheckMessages,
} from './spellcheckMessage';

const suggestionsByWord = new Map<string, string[]>();

export class LanguageToolProofreader implements IProofreaderInterface {
  normalizeTextForLanguage(text: string): string {
    return text.replace(/\u00A0/g, ' ');
  }

  async proofreadText(sentence: string): Promise<ITextWithPosition[]> {
    const matches = await checkLanguageTool(sentence);

    clearSpellcheckMessages();
    suggestionsByWord.clear();

    return matches.map((match) => {
      const word = sentence.slice(match.offset, match.offset + match.length);
      const replacements = match.replacements.map((replacement) => replacement.value);
      const key = word.toLowerCase();

      cacheSpellcheckMessage(word, match.message);
      suggestionsByWord.set(key, replacements);

      return {
        offset: match.offset,
        length: match.length,
        word,
      };
    });
  }

  async getSuggestions(word: string): Promise<string[]> {
    const normalized = this.normalizeTextForLanguage(word);
    const cached = suggestionsByWord.get(normalized.toLowerCase());

    if (cached?.length) {
      return cached;
    }

    const matches = await checkLanguageTool(normalized);
    const firstMatch = matches[0];

    if (!firstMatch) {
      return [];
    }

    cacheSpellcheckMessage(normalized, firstMatch.message);

    return firstMatch.replacements.map((replacement) => replacement.value);
  }
}

export const languageToolProofreader = new LanguageToolProofreader();
