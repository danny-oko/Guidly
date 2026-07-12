const messageByWord = new Map<string, string>();

export function cacheSpellcheckMessage(word: string, message: string) {
  messageByWord.set(word.toLowerCase(), message);
}

export function clearSpellcheckMessages() {
  messageByWord.clear();
}

export function injectSpellcheckMessage(word: string) {
  const message = messageByWord.get(word.toLowerCase());
  const box = document.getElementById('suggestions-box');

  if (!box) {
    return;
  }

  const existing = box.querySelector('.doc-editor__spellcheck-message');

  if (!message) {
    existing?.remove();
    return;
  }

  const messageElement =
    existing instanceof HTMLParagraphElement
      ? existing
      : document.createElement('p');

  messageElement.className = 'doc-editor__spellcheck-message';
  messageElement.textContent = message;

  if (!existing) {
    box.prepend(messageElement);
  }
}
