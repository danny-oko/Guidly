'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import type { AppState, GoalFilter, Plan } from '@/lib/types/game-plan.types';
import {
  loadState,
  makeGoal,
  makePlan,
  saveState,
  syncPlanGoals,
} from '@/lib/utils/game-plan';

export function useGamePlanState() {
  const [state, setState] = useState<AppState>(() => loadState());
  const [goalFilter, setGoalFilter] = useState<GoalFilter>('all');

  useEffect(() => {
    saveState(state);
  }, [state]);

  const update = useCallback((fn: (prev: AppState) => AppState) => {
    setState((prev) => fn(prev));
  }, []);

  const plans = useMemo(
    () => state.plans.map(syncPlanGoals),
    [state.plans],
  );

  const activePlan =
    plans.find((plan) => plan.id === state.activePlanId) ?? plans[0] ?? null;

  const selectPlan = useCallback(
    (id: string) => update((s) => ({ ...s, activePlanId: id })),
    [update],
  );

  const addPlan = useCallback(
    (name: string, emoji: string, motivation?: string) => {
      const plan = makePlan(name, emoji, motivation);
      update((s) => ({
        ...s,
        plans: [...s.plans, plan],
        activePlanId: plan.id,
      }));
      return plan.id;
    },
    [update],
  );

  const deletePlan = useCallback(
    (id: string) => {
      update((s) => {
        const remaining = s.plans.filter((plan) => plan.id !== id);
        const newActiveId =
          s.activePlanId === id ? (remaining[0]?.id ?? null) : s.activePlanId;
        return { ...s, plans: remaining, activePlanId: newActiveId };
      });
    },
    [update],
  );

  const updatePlan = useCallback(
    (id: string, patch: Partial<Pick<Plan, 'name' | 'emoji' | 'motivation'>>) => {
      update((s) => ({
        ...s,
        plans: s.plans.map((plan) =>
          plan.id === id ? { ...plan, ...patch } : plan,
        ),
      }));
    },
    [update],
  );

  const addGoal = useCallback(
    (
      planId: string,
      title: string,
      dueDate: string,
      punishment?: string,
      notes?: string,
    ) => {
      const goal = makeGoal(title, dueDate, punishment, notes);
      update((s) => ({
        ...s,
        plans: s.plans.map((plan) =>
          plan.id === planId
            ? { ...plan, goals: [...plan.goals, goal] }
            : plan,
        ),
      }));
    },
    [update],
  );

  const completeGoal = useCallback(
    (planId: string, goalId: string) => {
      update((s) => ({
        ...s,
        plans: s.plans.map((plan) =>
          plan.id === planId
            ? {
                ...plan,
                goals: plan.goals.map((goal) =>
                  goal.id === goalId
                    ? {
                        ...goal,
                        status: 'completed' as const,
                        completedAt: new Date().toISOString(),
                      }
                    : goal,
                ),
              }
            : plan,
        ),
      }));
    },
    [update],
  );

  const reopenGoal = useCallback(
    (planId: string, goalId: string) => {
      update((s) => ({
        ...s,
        plans: s.plans.map((plan) =>
          plan.id === planId
            ? {
                ...plan,
                goals: plan.goals.map((goal) =>
                  goal.id === goalId
                    ? {
                        ...goal,
                        status: 'active' as const,
                        completedAt: undefined,
                      }
                    : goal,
                ),
              }
            : plan,
        ),
      }));
    },
    [update],
  );

  const deleteGoal = useCallback(
    (planId: string, goalId: string) => {
      update((s) => ({
        ...s,
        plans: s.plans.map((plan) =>
          plan.id === planId
            ? { ...plan, goals: plan.goals.filter((goal) => goal.id !== goalId) }
            : plan,
        ),
      }));
    },
    [update],
  );

  const filteredGoals = useMemo(() => {
    if (!activePlan) return [];
    const goals = syncPlanGoals(activePlan).goals;
    if (goalFilter === 'all') return goals;
    return goals.filter((goal) => goal.status === goalFilter);
  }, [activePlan, goalFilter]);

  return {
    plans,
    activePlan,
    goalFilter,
    setGoalFilter,
    filteredGoals,
    selectPlan,
    addPlan,
    deletePlan,
    updatePlan,
    addGoal,
    completeGoal,
    reopenGoal,
    deleteGoal,
  };
}
