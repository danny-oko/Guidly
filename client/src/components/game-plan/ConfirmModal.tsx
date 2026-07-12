'use client';

import GamePlanModalShell from './GamePlanModalShell';

interface Props {
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  message,
  confirmLabel = 'Delete anyway',
  onConfirm,
  onCancel,
}: Props) {
  return (
    <GamePlanModalShell
      onClose={onCancel}
      ariaLabel="Confirm action"
      panelClassName="game-plan-modal__panel game-plan-modal__panel--confirm"
    >
      <div className="game-plan-modal__confirm-icon" aria-hidden="true">
        ⚠️
      </div>
      <p className="game-plan-modal__confirm-text">{message}</p>
      <div className="game-plan-modal__actions">
        <button type="button" className="game-plan-modal__cancel" onClick={onCancel}>
          Cancel
        </button>
        <button type="button" className="game-plan-modal__confirm" onClick={onConfirm}>
          {confirmLabel}
        </button>
      </div>
    </GamePlanModalShell>
  );
}
