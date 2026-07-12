'use client';

import { PropsWithChildren, useEffect } from 'react';

interface Props extends PropsWithChildren {
  onClose: () => void;
  panelClassName?: string;
  ariaLabel?: string;
}

export default function GamePlanModalShell({
  onClose,
  panelClassName = 'game-plan-modal__panel',
  ariaLabel,
  children,
}: Props) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      onClose();
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div
      className="game-plan-modal"
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      onClick={onClose}
    >
      <div
        className={panelClassName}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
