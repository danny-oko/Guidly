'use client';

import { Tags } from 'lucide-react';
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type MouseEvent,
} from 'react';

import type { UniversityStatus } from '../../lib/types/university.types';
import {
  getStatusOptionClassName,
  UNIVERSITY_STATUS_OPTIONS,
} from '../../lib/utils/university-status';

interface UniversityStatusDropdownProps {
  currentStatus?: UniversityStatus;
  onSelect: (status: UniversityStatus) => void;
}

function stopActionEvent(event: MouseEvent) {
  event.stopPropagation();
}

export default function UniversityStatusDropdown({
  currentStatus,
  onSelect,
}: UniversityStatusDropdownProps) {
  const menuId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  const updateMenuPosition = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    setMenuStyle({
      top: rect.bottom + 6,
      left: rect.right,
    });
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const openMenu = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      stopActionEvent(event);
      updateMenuPosition();
      setIsOpen(true);
    },
    [updateMenuPosition],
  );

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target)) return;
      if (
        document
          .getElementById(menuId)
          ?.contains(target)
      ) {
        return;
      }
      closeMenu();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu();
    };

    const handleScroll = () => closeMenu();

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', closeMenu);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', closeMenu);
    };
  }, [closeMenu, isOpen, menuId]);

  const handleSelect = (
    event: MouseEvent<HTMLButtonElement>,
    status: UniversityStatus,
  ) => {
    stopActionEvent(event);
    onSelect(status);
    closeMenu();
  };

  return (
    <div className="uni-list-item__status-menu">
      <button
        ref={triggerRef}
        type="button"
        className="uni-list-item__action"
        aria-label="Change status"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={openMenu}
      >
        <Tags size={15} strokeWidth={2.2} aria-hidden />
      </button>

      {isOpen && (
        <div
          id={menuId}
          className="uni-status-dropdown"
          role="menu"
          aria-label="Change application status"
          style={{
            top: menuStyle.top,
            left: menuStyle.left,
          }}
        >
          {UNIVERSITY_STATUS_OPTIONS.map((status) => {
            const variant = getStatusOptionClassName(status);
            const isSelected = currentStatus === status;

            return (
              <button
                key={status}
                type="button"
                role="menuitem"
                className={[
                  'uni-status-dropdown__option',
                  `uni-status-dropdown__option--${variant}`,
                  isSelected ? 'uni-status-dropdown__option--selected' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                aria-current={isSelected ? 'true' : undefined}
                onClick={(event) => handleSelect(event, status)}
              >
                {status}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
