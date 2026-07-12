export const TIPTAP_COLLAB_APP_ID =
  process.env.NEXT_PUBLIC_TIPTAP_SERVER_ID ??
  process.env.NEXT_PUBLIC_TIPTAP_COLLAB_APP_ID ??
  process.env.TIPTAP_SERVER_ID ??
  'y9drg45m';

export const TIPTAP_COLLAB_USER = {
  name: 'Alex Morgan',
  color: '#f5b8db',
};

export const DEFAULT_INITIAL_CONTENT = `
<h2>Untitled document</h2>
<p>Start writing your essay here. Changes sync in real time for everyone with access.</p>
`.trim();

export const TIPTAP_COLLAB_INITIAL_CONTENT =
  process.env.TIPTAP_COLLAB_INITIAL_CONTENT?.trim() || DEFAULT_INITIAL_CONTENT;

export const COLLABORATION_USER_COLORS = [
  '#f5b8db',
  '#b8d1f3',
  '#b8d8a0',
  '#e8d069',
  '#c49ab8',
];

export function getCollaborationUser(documentId: string) {
  const paletteIndex =
    documentId.split('').reduce((total, character) => total + character.charCodeAt(0), 0) %
    COLLABORATION_USER_COLORS.length;

  return {
    name: TIPTAP_COLLAB_USER.name,
    color: COLLABORATION_USER_COLORS[paletteIndex],
  };
}
