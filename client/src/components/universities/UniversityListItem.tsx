'use client';

import { ChevronRight, ListCheck, ListPlus } from 'lucide-react';
import type { MouseEvent, KeyboardEvent } from 'react';

import type { UniversityStatus } from '../../lib/types/university.types';
import { getUniversityStatusAccent } from '../../lib/utils/university-accent';
import {
  formatAcceptanceRate,
  formatQsBadge,
  getUniversityInitials,
} from '../../lib/utils/university-list-format';
import type { StatusFilter } from '../dashboard/DashboardSearchBar';
import UniversityStatusDropdown from './UniversityStatusDropdown';

export interface UniversityListItemData {
  id: string | number;
  name: string;
  subtitle: string;
  qsRank: string | number;
  acceptanceRate: string | number;
  status?: StatusFilter;
  website?: string;
}

interface UniversityListItemProps {
  university: UniversityListItemData;
  isSelected?: boolean;
  isInMyList?: boolean;
  onSelect?: (id: string | number) => void;
  onOpenDetails?: (id: string | number) => void;
  onAddToList?: (id: string | number) => void;
  onChangeStatus?: (id: string | number, status: UniversityStatus) => void;
}

function stopActionEvent(event: MouseEvent | KeyboardEvent) {
  event.stopPropagation();
}

export default function UniversityListItem({
  university,
  isSelected = false,
  isInMyList = false,
  onSelect,
  onOpenDetails,
  onAddToList,
  onChangeStatus,
}: UniversityListItemProps) {
  const accent = getUniversityStatusAccent(university.status);
  const className = [
    'uni-list-item',
    `uni-list-item--${accent}`,
    isSelected ? 'uni-list-item--selected' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const currentStatus =
    university.status && university.status !== 'All'
      ? university.status
      : undefined;

  const handleMainClick = () => {
    onSelect?.(university.id);
  };

  const handleMainKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!onSelect) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect(university.id);
    }
  };

  const handleOpenDetails = (event: MouseEvent<HTMLButtonElement>) => {
    stopActionEvent(event);
    (onOpenDetails ?? onSelect)?.(university.id);
  };

  const handleAddToList = (event: MouseEvent<HTMLButtonElement>) => {
    stopActionEvent(event);
    onAddToList?.(university.id);
  };

  const handleStatusSelect = (status: UniversityStatus) => {
    if (!onChangeStatus) return;
    onChangeStatus(university.id, status);
  };

  return (
    <article className={className}>
      <div
        className={[
          'uni-list-item__main',
          onSelect ? 'uni-list-item__main--interactive' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        role={onSelect ? 'button' : undefined}
        tabIndex={onSelect ? 0 : undefined}
        onClick={onSelect ? handleMainClick : undefined}
        onKeyDown={onSelect ? handleMainKeyDown : undefined}
      >
        <span className="uni-list-item__avatar">
          {getUniversityInitials(university.name)}
        </span>
        <span className="uni-list-item__body">
          <span className="uni-list-item__name">{university.name}</span>
          <span className="uni-list-item__field">{university.subtitle}</span>
        </span>
        <span className="uni-list-item__badges">
          <span className="uni-list-item__badge">
            {formatQsBadge(university.qsRank)}
          </span>
          <span className="uni-list-item__badge uni-list-item__badge--acceptance">
            {formatAcceptanceRate(university.acceptanceRate)}
          </span>
        </span>
      </div>

      <div className="uni-list-item__actions">
        <button
          type="button"
          className={[
            'uni-list-item__action',
            isInMyList ? 'uni-list-item__action--active' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          aria-label={isInMyList ? 'Remove from my list' : 'Add to my list'}
          aria-pressed={isInMyList}
          onClick={handleAddToList}
        >
          {isInMyList ? (
            <ListCheck size={15} strokeWidth={2.2} aria-hidden />
          ) : (
            <ListPlus size={15} strokeWidth={2.2} aria-hidden />
          )}
        </button>

        <UniversityStatusDropdown
          currentStatus={currentStatus}
          onSelect={handleStatusSelect}
        />

        <button
          type="button"
          className="uni-list-item__action uni-list-item__action--chevron"
          aria-label="View details"
          onClick={handleOpenDetails}
        >
          <ChevronRight size={15} strokeWidth={2.4} aria-hidden />
        </button>
      </div>
    </article>
  );
}
