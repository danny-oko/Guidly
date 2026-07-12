'use client';

import { Trash2 } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface DeleteDocumentDialogProps {
  documentId: string;
  documentTitle: string;
  onDelete: (documentId: string) => Promise<void>;
}

export default function DeleteDocumentDialog({
  documentId,
  documentTitle,
  onDelete,
}: DeleteDocumentDialogProps) {
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const displayTitle = documentTitle.trim() || 'Untitled document';

  const handleOpenChange = (nextOpen: boolean) => {
    if (deleting) {
      return;
    }

    setOpen(nextOpen);

    if (!nextOpen) {
      setError(null);
    }
  };

  const handleConfirmDelete = async () => {
    setDeleting(true);
    setError(null);

    try {
      await onDelete(documentId);
      setOpen(false);
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : 'Unable to delete document',
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="essays-doc-card__delete"
          aria-label={`Delete ${displayTitle}`}
          title="Delete document"
        >
          <Trash2 size={15} strokeWidth={2.25} />
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete document?</DialogTitle>
          <DialogDescription>
            <span className="font-semibold text-foreground">{displayTitle}</span>{' '}
            will be permanently deleted from your workspace and TipTap. This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        {error ? (
          <p className="text-sm font-medium text-destructive">{error}</p>
        ) : null}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={deleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirmDelete}
            disabled={deleting}
          >
            {deleting ? 'Deleting...' : 'Delete document'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
