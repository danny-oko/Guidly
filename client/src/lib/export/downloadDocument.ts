import type { Editor } from '@tiptap/react';

function sanitizeFilename(title: string): string {
  const normalized = title
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  return normalized || 'document';
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export async function downloadDocumentDocx(
  editor: Editor,
  title: string,
): Promise<void> {
  const response = await fetch('/api/documents/export/docx', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      html: editor.getHTML(),
      title,
    }),
  });

  if (!response.ok) {
    throw new Error('Unable to export DOCX file');
  }

  const blob = await response.blob();
  triggerDownload(blob, `${sanitizeFilename(title)}.docx`);
}
