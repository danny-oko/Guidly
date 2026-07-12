'use client';

import { useEffect, useRef, useState } from 'react';
import { Pencil, X } from 'lucide-react';

type ScheduleEventCardActionsProps = {
  onUpdate: () => void;
  onDelete: () => void;
  compact?: boolean;
};

export function ScheduleEventCardActions({
  onUpdate,
  onDelete,
  compact = false,
}: ScheduleEventCardActionsProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonSizeClass = compact ? 'h-5 w-5' : 'h-6 w-6';
  const iconSize = compact ? 10 : 12;

  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  return (
    <div ref={containerRef} className="relative flex items-center gap-1">
      <button
        type="button"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Schedule actions"
        className={`${buttonSizeClass} inline-flex items-center justify-center rounded-full bg-white/70 text-[#374151] transition hover:bg-white`}
      >
        <Pencil size={iconSize} />
      </button>

      {menuOpen ? (
        <div className="absolute right-0 top-7 z-50 flex items-center gap-1 rounded-xl border border-[#e8dfd0] bg-white p-1.5 shadow-lg">
          <button
            type="button"
            onClick={() => {
              onUpdate();
              setMenuOpen(false);
            }}
            aria-label="Update schedule"
            className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-[#1f2937] transition hover:bg-[#f6f1e7]"
          >
            <Pencil size={13} />
          </button>
          <button
            type="button"
            onClick={() => {
              onDelete();
              setMenuOpen(false);
            }}
            aria-label="Delete schedule"
            className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-[#b91c1c] transition hover:bg-[#fff1f2]"
          >
            <X size={13} />
          </button>
        </div>
      ) : null}
    </div>
  );
}
