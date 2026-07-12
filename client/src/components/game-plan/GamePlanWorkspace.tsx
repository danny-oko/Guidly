'use client';

import { useState } from 'react';

import AddGoalModal from './AddGoalModal';
import ConfirmModal from './ConfirmModal';
import CreatePlanModal from './CreatePlanModal';
import GamePlanEmptyState from './GamePlanEmptyState';
import GamePlanPanel from './GamePlanPanel';
import GoalList from './GoalList';
import { useGamePlanState } from './useGamePlanState';

export default function GamePlanWorkspace() {
  const {
    plans,
    activePlan,
    goalFilter,
    setGoalFilter,
    filteredGoals,
    selectPlan,
    addPlan,
    deletePlan,
    addGoal,
    completeGoal,
    reopenGoal,
    deleteGoal,
  } = useGamePlanState();

  const [showCreatePlan, setShowCreatePlan] = useState(false);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [pendingDeletePlanId, setPendingDeletePlanId] = useState<string | null>(
    null,
  );

  const pendingPlan = plans.find((plan) => plan.id === pendingDeletePlanId);

  return (
    <div className="game-plan-page">
      <div className="game-plan-page__inner">
        {plans.length === 0 ? (
          <GamePlanEmptyState onCreatePlan={() => setShowCreatePlan(true)} />
        ) : (
          <>
            <GamePlanPanel
              plans={plans}
              activePlan={activePlan}
              activePlanId={activePlan?.id ?? null}
              goalFilter={goalFilter}
              onFilterChange={setGoalFilter}
              onSelectPlan={selectPlan}
              onAddPlan={() => setShowCreatePlan(true)}
              onDeletePlan={setPendingDeletePlanId}
              onAddGoal={() => setShowAddGoal(true)}
            />

            {activePlan && (
              <GoalList
                goals={filteredGoals}
                filter={goalFilter}
                planName={activePlan.name}
                onAddGoal={() => setShowAddGoal(true)}
                onCompleteGoal={(goalId) => completeGoal(activePlan.id, goalId)}
                onReopenGoal={(goalId) => reopenGoal(activePlan.id, goalId)}
                onDeleteGoal={(goalId) => deleteGoal(activePlan.id, goalId)}
              />
            )}
          </>
        )}
      </div>

      {showCreatePlan && (
        <CreatePlanModal
          onAdd={(name, emoji, motivation) => {
            addPlan(name, emoji, motivation);
            setShowCreatePlan(false);
          }}
          onCancel={() => setShowCreatePlan(false)}
        />
      )}

      {showAddGoal && activePlan && (
        <AddGoalModal
          onAdd={(title, dueDate, punishment, notes) => {
            addGoal(activePlan.id, title, dueDate, punishment, notes);
            setShowAddGoal(false);
          }}
          onCancel={() => setShowAddGoal(false)}
        />
      )}

      {pendingDeletePlanId && pendingPlan && (
        <ConfirmModal
          message={`Delete "${pendingPlan.name}" and all its goals? This cannot be undone.`}
          confirmLabel="Delete plan"
          onConfirm={() => {
            deletePlan(pendingDeletePlanId);
            setPendingDeletePlanId(null);
          }}
          onCancel={() => setPendingDeletePlanId(null)}
        />
      )}
    </div>
  );
}
