'use client';

import type { Goal } from '@/lib/types/game-plan.types';
import { daysUntil, formatDate } from '@/lib/utils/game-plan';

interface Props {
  goal: Goal;
  onComplete: () => void;
  onReopen: () => void;
  onDelete: () => void;
}

function dueLabel(dueDate: string, status: Goal['status']): string {
  if (status === 'completed') return 'Completed';
  if (status === 'missed') return 'Deadline passed';

  const days = daysUntil(dueDate);
  if (days === 0) return 'Due today';
  if (days === 1) return 'Due tomorrow';
  if (days > 1) return `${days} days left`;
  return `${Math.abs(days)} day${Math.abs(days) !== 1 ? 's' : ''} overdue`;
}

export default function GoalCard({ goal, onComplete, onReopen, onDelete }: Props) {
  const formatted = formatDate(goal.dueDate);
  const statusClass =
    goal.status === 'completed'
      ? 'game-plan__goal--completed'
      : goal.status === 'missed'
        ? 'game-plan__goal--missed'
        : daysUntil(goal.dueDate) <= 1
          ? 'game-plan__goal--urgent'
          : '';

  return (
    <article className={`game-plan__goal ${statusClass}`.trim()}>
      <div className="game-plan__goal-body">
        <h3 className="game-plan__goal-title">{goal.title}</h3>

        <div className="game-plan__goal-meta">
          <span className="game-plan__goal-date">
            {formatted.weekday}, {formatted.month} {formatted.day}
          </span>
          <span className="game-plan__goal-meta-sep" aria-hidden="true">
            ·
          </span>
          <span className="game-plan__goal-due">
            {dueLabel(goal.dueDate, goal.status)}
          </span>
        </div>

        {goal.notes && <p className="game-plan__goal-notes">{goal.notes}</p>}

        {goal.punishment && (
          <span className="game-plan__goal-stake-chip">
            <span aria-hidden="true">⚡</span>
            {goal.punishment}
          </span>
        )}
      </div>

      <div className="game-plan__goal-aside">
        <span className={`game-plan__goal-badge game-plan__goal-badge--${goal.status}`}>
          {goal.status}
        </span>

        <div className="game-plan__goal-actions">
        {goal.status === 'active' && (
          <button
            type="button"
            className="game-plan__goal-complete"
            onClick={onComplete}
          >
            Mark done
          </button>
        )}
        {goal.status === 'completed' && (
          <button
            type="button"
            className="game-plan__goal-reopen"
            onClick={onReopen}
          >
            Reopen
          </button>
        )}
        <button
          type="button"
          className="game-plan__goal-delete"
          aria-label={`Delete ${goal.title}`}
          onClick={onDelete}
        >
          Delete
        </button>
        </div>
      </div>
    </article>
  );
}
