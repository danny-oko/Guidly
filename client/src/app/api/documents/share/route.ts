import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  return new Resend(apiKey);
}

function buildShareEmailHtml(documentTitle: string, shareUrl: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document invitation</title>
  </head>
  <body style="margin:0;padding:0;background-color:#fdf9f0;font-family:'Montserrat',Arial,sans-serif;color:#000000;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#fdf9f0;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background-color:#f3efe6;border-radius:20px;overflow:hidden;">
            <tr>
              <td style="padding:32px 28px 24px;">
                <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#666666;">
                  Workspace invitation
                </p>
                <h1 style="margin:0 0 16px;font-size:24px;font-weight:800;line-height:1.2;color:#000000;">
                  You have been invited to edit a document
                </h1>
                <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#666666;">
                  You were invited to collaborate on <strong style="color:#000000;">${documentTitle}</strong>.
                  Open the document to start editing together in real time.
                </p>
                <a href="${shareUrl}" style="display:inline-block;padding:14px 22px;border-radius:9999px;background-color:#000000;color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;">
                  Open document
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding:0 28px 28px;">
                <p style="margin:0;font-size:12px;line-height:1.5;color:#666666;">
                  Or copy this link into your browser:<br />
                  <a href="${shareUrl}" style="color:#8eb5e8;word-break:break-all;">${shareUrl}</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      email?: string;
      shareUrl?: string;
      documentTitle?: string;
    };

    const email = body.email?.trim();
    const shareUrl = body.shareUrl?.trim();
    const documentTitle = body.documentTitle?.trim() || 'Untitled document';

    if (!email) {
      return NextResponse.json({ error: 'email is required' }, { status: 400 });
    }

    if (!shareUrl) {
      return NextResponse.json({ error: 'shareUrl is required' }, { status: 400 });
    }

    const resend = getResendClient();

    await resend.emails.send({
      from: 'University Guide <onboarding@resend.dev>',
      to: email,
      subject: `Invitation to edit ${documentTitle}`,
      html: buildShareEmailHtml(documentTitle, shareUrl),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unable to send invitation email';

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
