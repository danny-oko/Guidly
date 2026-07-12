'use client';

import { Check, Copy, Mail, Share2, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

interface ShareDialogProps {
  documentId: string;
  documentTitle?: string;
}

export default function ShareDialog({
  documentId,
  documentTitle = 'Untitled document',
}: ShareDialogProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(`${window.location.origin}/essays/${documentId}`);
    }
  }, [documentId]);

  useEffect(() => {
    if (!copied) return;

    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const handleCopyLink = useCallback(async () => {
    const url =
      shareUrl ||
      (typeof window !== 'undefined'
        ? `${window.location.origin}/essays/${documentId}`
        : '');

    if (!url) return;

    await navigator.clipboard.writeText(url);
    setCopied(true);
  }, [documentId, shareUrl]);

  const handleInvite = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSending(true);

    const url =
      shareUrl ||
      (typeof window !== 'undefined'
        ? `${window.location.origin}/essays/${documentId}`
        : '');

    try {
      const response = await fetch('/api/documents/share', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          shareUrl: url,
          documentTitle,
        }),
      });

      if (!response.ok) {
        const payload = (await response.json()) as { error?: string };
        throw new Error(payload.error || 'Unable to send invitation');
      }

      setSent(true);
      setEmail('');
    } catch (inviteError) {
      setError(
        inviteError instanceof Error
          ? inviteError.message
          : 'Unable to send invitation',
      );
    } finally {
      setSending(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSent(false);
    setError(null);
  };

  return (
    <>
      <button
        type="button"
        className="share-dialog__trigger"
        onClick={() => setOpen(true)}
      >
        <Share2 size={15} strokeWidth={2.2} />
        <span>Share</span>
      </button>

      {open ? (
        <div className="share-dialog__overlay" onClick={handleClose}>
          <div
            className="share-dialog__panel"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="share-dialog-title"
          >
            <div className="share-dialog__header">
              <h2 id="share-dialog-title" className="share-dialog__title">
                Share document
              </h2>
              <button
                type="button"
                className="share-dialog__close"
                onClick={handleClose}
                aria-label="Close share dialog"
              >
                <X size={18} strokeWidth={2.2} />
              </button>
            </div>

            <section className="share-dialog__section">
              <p className="share-dialog__label">Copy link</p>
              <div className="share-dialog__copy-row">
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  className="share-dialog__input"
                />
                <button
                  type="button"
                  className="share-dialog__copy-btn"
                  onClick={handleCopyLink}
                >
                  {copied ? (
                    <>
                      <Check size={15} strokeWidth={2.4} />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={15} strokeWidth={2.2} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </section>

            <section className="share-dialog__section">
              <p className="share-dialog__label">Invite by email</p>
              <form className="share-dialog__form" onSubmit={handleInvite}>
                <div className="share-dialog__email-row">
                  <span className="share-dialog__email-icon">
                    <Mail size={16} strokeWidth={2.2} />
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="colleague@university.edu"
                    className="share-dialog__input share-dialog__input--email"
                  />
                </div>
                {error ? <p className="share-dialog__error">{error}</p> : null}
                {sent ? (
                  <p className="share-dialog__success">Invitation sent successfully.</p>
                ) : null}
                <button
                  type="submit"
                  className="share-dialog__submit"
                  disabled={sending}
                >
                  {sending ? 'Sending...' : 'Send invitation'}
                </button>
              </form>
            </section>
          </div>
        </div>
      ) : null}
    </>
  );
}
