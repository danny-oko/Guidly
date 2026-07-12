import SpellcheckerExtension from '@farscrl/tiptap-extension-spellchecker';

import { languageToolProofreader } from '@/lib/spellcheck/languageToolProofreader';
import { injectSpellcheckMessage } from '@/lib/spellcheck/spellcheckMessage';

export function createSpellcheckerExtension() {
  return SpellcheckerExtension.configure({
    proofreader: languageToolProofreader,
    uiStrings: {
      noSuggestions: 'No suggestions found',
    },
    onShowSuggestionsEvent: injectSpellcheckMessage,
  });
}
