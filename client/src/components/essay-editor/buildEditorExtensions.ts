import type { HocuspocusProvider } from '@hocuspocus/provider';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCaret from '@tiptap/extension-collaboration-caret';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';
import type * as Y from 'yjs';

import { createSpellcheckerExtension } from './createSpellcheckerExtension';

interface CollaborationUser {
  name: string;
  color: string;
}

export function buildEditorExtensions(
  ydoc: Y.Doc,
  provider: HocuspocusProvider | null,
  user: CollaborationUser,
) {
  return [
    StarterKit.configure({
      undoRedo: false,
      link: {
        openOnClick: false,
        HTMLAttributes: {
          class: 'doc-editor__link',
        },
      },
    }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    TextStyle,
    Color,
    Underline,
    Highlight.configure({
      multicolor: true,
    }),
    Collaboration.configure({
      document: ydoc,
    }),
    ...(provider
      ? [
          CollaborationCaret.configure({
            provider,
            user,
          }),
        ]
      : []),
    createSpellcheckerExtension(),
  ];
}
