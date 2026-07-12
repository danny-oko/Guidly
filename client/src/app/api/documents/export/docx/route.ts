import HTMLtoDOCX from 'html-to-docx';
import { NextRequest, NextResponse } from 'next/server';

function sanitizeFilename(title: string): string {
  const normalized = title
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  return normalized || 'document';
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { html?: string; title?: string };
    const html = body.html?.trim();
    const title = body.title?.trim() || 'Untitled document';

    if (!html) {
      return NextResponse.json({ error: 'html is required' }, { status: 400 });
    }

    const documentHtml = `<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body>${html}</body></html>`;
    const fileBuffer = await HTMLtoDOCX(documentHtml, null, {
      title,
      font: 'Montserrat',
      fontSize: 22,
    });

    const filename = `${sanitizeFilename(title)}.docx`;
    const payload =
      fileBuffer instanceof ArrayBuffer
        ? fileBuffer
        : Uint8Array.from(fileBuffer as ArrayLike<number>);

    return new NextResponse(payload, {
      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'Unable to export document' },
      { status: 500 },
    );
  }
}
