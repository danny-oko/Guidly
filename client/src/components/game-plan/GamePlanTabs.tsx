'use client';

import type { Plan } from '@/lib/types/game-plan.types';
import { getPlanProgress } from '@/lib/utils/game-plan';

interface Props {
  plans: Plan[];
  activePlanId: string | null;
  onSelectPlan: (id: string) => void;
  onAddPlan: () => void;
  onDeletePlan: (id: string) => void;
}

export default function GamePlanTabs({
  plans,
  activePlanId,
  onSelectPlan,
  onAddPlan,
  onDeletePlan,
}: Props) {
  if (plans.length === 0) return null;

  return (
    <div className="game-plan-panel__tabs" role="tablist" aria-label="Game plans">
      {plans.map((plan) => {
        const progress = getPlanProgress(plan);
        const isActive = plan.id === activePlanId;

        return (
          <div
            key={plan.id}
            className={`game-plan-panel__tab-wrap${
              isActive ? ' game-plan-panel__tab-wrap--active' : ''
            }`}
          >
            <button
              type="button"
              role="tab"
              aria-selected={isActive}
              className="game-plan-panel__tab"
              onClick={() => onSelectPlan(plan.id)}
            >
              <span className="game-plan-panel__tab-emoji" aria-hidden="true">
                {plan.emoji}
              </span>
              <span className="game-plan-panel__tab-copy">
                <span className="game-plan-panel__tab-name">{plan.name}</span>
                <span className="game-plan-panel__tab-meta">
                  {progress.pctDone}% · {progress.totalGoals} goal
                  {progress.totalGoals !== 1 ? 's' : ''}
                </span>
              </span>
            </button>
            <button
              type="button"
              className="game-plan-panel__tab-delete"
              aria-label={`Delete ${plan.name}`}
              onClick={() => onDeletePlan(plan.id)}
            >
              ×
            </button>
          </div>
        );
      })}

      <button
        type="button"
        className="game-plan-panel__tab-add"
        aria-label="Create new plan"
        onClick={onAddPlan}
      >
        +
      </button>
    </div>
  );
}
