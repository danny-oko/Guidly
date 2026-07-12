import {
  getTiptapManagementApiBaseUrl,
  getTiptapManagementApiSecret,
  getTiptapServerId,
} from '@/lib/tiptap/server-config';

export async function deleteCollabDocument(documentId: string): Promise<void> {
  const serverId = getTiptapServerId();
  const secret = getTiptapManagementApiSecret();
  const encodedDocumentId = encodeURIComponent(documentId);
  const response = await fetch(
    `${getTiptapManagementApiBaseUrl(serverId)}/api/documents/${encodedDocumentId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: secret,
      },
      cache: 'no-store',
    },
  );

  if (response.status === 204 || response.status === 404) {
    return;
  }

  const message = await response.text();
  throw new Error(message || `Unable to delete document (${response.status})`);
}
