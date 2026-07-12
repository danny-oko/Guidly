import { NextRequest, NextResponse } from 'next/server';

import { deleteCollabDocument } from '@/lib/tiptap/delete-collab-document';

export async function DELETE(request: NextRequest) {
  try {
    const body = (await request.json()) as { documentId?: string };
    const documentId = body.documentId?.trim();

    if (!documentId) {
      return NextResponse.json(
        { error: 'documentId is required' },
        { status: 400 },
      );
    }

    await deleteCollabDocument(documentId);

    return NextResponse.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unable to delete document';

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
