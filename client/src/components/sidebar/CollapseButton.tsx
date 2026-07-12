'use client';

import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface CollapseButtonProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function CollapseButton({
  isCollapsed,
  onToggle,
}: CollapseButtonProps) {
  return (
    <button
      onClick={onToggle}
      aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      className="collapse-btn"
    >
      <ChevronLeft
        size={14}
        strokeWidth={2.5}
        className={`collapse-btn__icon transition-transform duration-300 ease-in-out ${
          isCollapsed ? 'rotate-180' : 'rotate-0'
        }`}
      />
    </button>
  );
}
