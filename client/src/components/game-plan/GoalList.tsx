'use client';

import type { Goal, GoalFilter } from '@/lib/types/game-plan.types';

import GoalCard from './GoalCard';

interface Props {
  goals: Goal[];
  filter: GoalFilter;
  planName: string;
  onAddGoal: () => void;
  onCompleteGoal: (goalId: string) => void;
  onReopenGoal: (goalId: string) => void;
  onDeleteGoal: (goalId: string) => void;
}

function filterMeta(filter: GoalFilter, planName: string): string {
  if (filter === 'all') return `Showing all goals in ${planName}`;
  if (filter === 'completed') return `Showing completed goals in ${planName}`;
  return `Filtered by ${filter} in ${planName}`;
}

export default function GoalList({
  goals,
  filter,
  planName,
  onAddGoal,
  onCompleteGoal,
  onReopenGoal,
  onDeleteGoal,
}: Props) {
  return (
    <section className="universities-results game-plan-results" aria-label="Goals">
      <div className="universities-results__head">
        <div className="universities-results__title-group">
          <h2 className="universities-results__title">Your goals</h2>
          <span className="universities-results__count">{goals.length}</span>
        </div>
        <p className="universities-results__meta">{filterMeta(filter, planName)}</p>
      </div>

      {goals.length === 0 ? (
        <div className="universities-results__state game-plan-results__state">
          <p className="universities-results__state-title">
            {filter === 'all' ? 'No goals yet' : `No ${filter} goals`}
          </p>
          <p className="universities-results__state-text">
            {filter === 'all'
              ? 'Add a goal with a deadline and optional punishment to stay accountable.'
              : 'Try another filter or add a new goal.'}
          </p>
          {filter === 'all' && (
            <button type="button" className="game-plan-panel__btn" onClick={onAddGoal}>
              + Add goal
            </button>
          )}
        </div>
      ) : (
        <div className="game-plan-results__body">
          <ul className="game-plan-results__list">
            {goals.map((goal) => (
              <li key={goal.id}>
                <GoalCard
                  goal={goal}
                  onComplete={() => onCompleteGoal(goal.id)}
                  onReopen={() => onReopenGoal(goal.id)}
                  onDelete={() => onDeleteGoal(goal.id)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
