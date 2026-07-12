export function getTiptapServerId(): string {
  const serverId = process.env.TIPTAP_SERVER_ID?.trim();
  if (!serverId) {
    throw new Error('TIPTAP_SERVER_ID is not configured');
  }
  return serverId;
}

export function getTiptapServerSecret(): string {
  const secret = process.env.TIPTAP_SERVER_SECRET?.trim();
  if (!secret) {
    throw new Error('TIPTAP_SERVER_SECRET is not configured');
  }
  return secret;
}

export function getTiptapManagementApiSecret(): string {
  const secret = process.env.TIPTAP_MANAGEMENT_API_SECRET?.trim();
  if (!secret) {
    throw new Error('TIPTAP_MANAGEMENT_API_SECRET is not configured');
  }
  return secret;
}

export function getTiptapCollabWebSocketUrl(serverId: string): string {
  return `wss://${serverId}.collab.tiptap.cloud`;
}

export function getTiptapManagementApiBaseUrl(serverId: string): string {
  return `https://${serverId}.collab.tiptap.cloud`;
}
