'use client';

import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  Layers,
  Target,
} from 'lucide-react';

import type { GoalFilter, Plan } from '@/lib/types/game-plan.types';
import { getPlanProgress } from '@/lib/utils/game-plan';

import GamePlanTabs from './GamePlanTabs';

const FILTERS: { id: GoalFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'completed', label: 'Done' },
  { id: 'missed', label: 'Missed' },
];

interface Props {
  plans: Plan[];
  activePlan: Plan | null;
  activePlanId: string | null;
  goalFilter: GoalFilter;
  onFilterChange: (filter: GoalFilter) => void;
  onSelectPlan: (id: string) => void;
  onAddPlan: () => void;
  onDeletePlan: (id: string) => void;
  onAddGoal: () => void;
}

export default function GamePlanPanel({
  plans,
  activePlan,
  activePlanId,
  goalFilter,
  onFilterChange,
  onSelectPlan,
  onAddPlan,
  onDeletePlan,
  onAddGoal,
}: Props) {
  const progress = activePlan ? getPlanProgress(activePlan) : null;

  return (
    <header
      className="universities-panel game-plan-panel"
      aria-label="Game plan"
    >
      <div className="universities-panel__top">
        <div className="universities-panel__heading">
          <div className="universities-header__eyebrow">
            <Target size={14} strokeWidth={2.2} aria-hidden />
            <span>Accountability</span>
          </div>
          <h1 className="universities-header__title">Game plan</h1>
        </div>

        <div
          className="universities-stats universities-stats--compact"
          aria-label="Goal summary"
        >
          <div className="universities-stat universities-stat--blue">
            <span className="universities-stat__icon" aria-hidden>
              <Layers size={14} strokeWidth={2.2} />
            </span>
            <span className="universities-stat__value">
              {progress?.totalGoals ?? 0}
            </span>
            <span className="universities-stat__label">Total</span>
          </div>
          <div className="universities-stat universities-stat--yellow">
            <span className="universities-stat__icon" aria-hidden>
              <Clock3 size={14} strokeWidth={2.2} />
            </span>
            <span className="universities-stat__value">
              {progress?.activeGoals ?? 0}
            </span>
            <span className="universities-stat__label">Active</span>
          </div>
          <div className="universities-stat universities-stat--green">
            <span className="universities-stat__icon" aria-hidden>
              <CheckCircle2 size={14} strokeWidth={2.2} />
            </span>
            <span className="universities-stat__value">
              {progress?.completedGoals ?? 0}
            </span>
            <span className="universities-stat__label">Done</span>
          </div>
          <div className="universities-stat universities-stat--pink">
            <span className="universities-stat__icon" aria-hidden>
              <AlertCircle size={14} strokeWidth={2.2} />
            </span>
            <span className="universities-stat__value">
              {progress?.missedGoals ?? 0}
            </span>
            <span className="universities-stat__label">Missed</span>
          </div>
        </div>
      </div>

      <div className="universities-panel__controls game-plan-panel__controls">
        <GamePlanTabs
          plans={plans}
          activePlanId={activePlanId}
          onSelectPlan={onSelectPlan}
          onAddPlan={onAddPlan}
          onDeletePlan={onDeletePlan}
        />

        <div className="dashboard-search game-plan-panel__filters">
          <div className="dashboard-search__filters">
            {FILTERS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`dashboard-search__chip${
                  goalFilter === item.id
                    ? ' dashboard-search__chip--active'
                    : ''
                }`}
                onClick={() => onFilterChange(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="game-plan-panel__actions">
            <button
              type="button"
              className="game-plan-panel__btn game-plan-panel__btn--secondary"
              onClick={onAddPlan}
            >
              + New plan
            </button>
            <button
              type="button"
              className="game-plan-panel__btn"
              onClick={onAddGoal}
              disabled={!activePlan}
            >
              + Add goal
            </button>
          </div>
        </div>

        {activePlan && (
          <div className="game-plan-panel__motivation-row">
            <p
              className={`game-plan-panel__motivation${
                activePlan.motivation
                  ? ''
                  : ' game-plan-panel__motivation--empty'
              }`}
            >
              {activePlan.motivation ??
                'Add motivation to remind yourself why this plan matters.'}
            </p>
          </div>
        )}
      </div>
    </header>
  );
}
