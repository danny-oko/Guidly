import type {
  AppState,
  Goal,
  GoalStatus,
  Plan,
  PlanProgress,
} from '../types/game-plan.types';

export const uid = (): string => Math.random().toString(36).slice(2, 9);

export const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export interface FormattedDate {
  day: number;
  weekday: string;
  month: string;
  year: number;
  iso: string;
}

export function formatDate(iso: string): FormattedDate {
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return {
    day: date.getDate(),
    weekday: WEEKDAYS[date.getDay()],
    month: MONTHS[date.getMonth()],
    year: date.getFullYear(),
    iso,
  };
}

export function todayIso(): string {
  const now = new Date();
  return [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
  ].join('-');
}

export function daysUntil(iso: string): number {
  const [y, m, d] = iso.split('-').map(Number);
  const target = new Date(y, m - 1, d);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / 86_400_000);
}

export function makeGoal(
  title: string,
  dueDate: string,
  punishment?: string,
  notes?: string,
): Goal {
  return {
    id: uid(),
    title,
    dueDate,
    punishment: punishment?.trim() || undefined,
    notes: notes?.trim() || undefined,
    status: 'active',
    createdAt: new Date().toISOString(),
  };
}

export function makePlan(
  name: string,
  emoji: string,
  motivation?: string,
): Plan {
  return {
    id: uid(),
    name,
    emoji,
    motivation: motivation?.trim() || undefined,
    goals: [],
    createdAt: new Date().toISOString(),
  };
}

/** Resolve active goals past their due date as missed */
export function resolveGoalStatuses(goals: Goal[], today = todayIso()): Goal[] {
  return goals.map((goal) => {
    if (goal.status !== 'active') return goal;
    if (goal.dueDate >= today) return goal;
    return { ...goal, status: 'missed' as GoalStatus };
  });
}

export function syncPlanGoals(plan: Plan): Plan {
  return { ...plan, goals: resolveGoalStatuses(plan.goals) };
}

export function getPlanProgress(plan: Plan): PlanProgress {
  const goals = resolveGoalStatuses(plan.goals);
  const today = todayIso();

  const completedGoals = goals.filter((g) => g.status === 'completed').length;
  const missedGoals = goals.filter((g) => g.status === 'missed').length;
  const activeGoals = goals.filter((g) => g.status === 'active').length;
  const overdueGoals = goals.filter(
    (g) => g.status === 'active' && g.dueDate < today,
  ).length;
  const totalGoals = goals.length;
  const pctDone =
    totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

  return {
    pctDone,
    totalGoals,
    completedGoals,
    activeGoals,
    missedGoals,
    overdueGoals,
  };
}

export function getMissedPunishments(plan: Plan): Goal[] {
  return resolveGoalStatuses(plan.goals).filter(
    (goal) => goal.status === 'missed' && Boolean(goal.punishment),
  );
}

export function getLatestPlans(plans: Plan[], limit = 3): Plan[] {
  return [...plans]
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
    .slice(0, limit);
}

export const STORAGE_KEY = 'gp_tracker_v4';

function syncAllPlans(state: AppState): AppState {
  return {
    ...state,
    plans: state.plans.map(syncPlanGoals),
  };
}

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as AppState;
      return syncAllPlans(parsed);
    }
  } catch {
    /* ignore corrupt storage */
  }
  return { plans: [], activePlanId: null };
}

export function saveState(state: AppState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(syncAllPlans(state)));
  } catch {
    /* ignore quota errors */
  }
}

export const PLAN_EMOJIS = [
  '📋',
  '📚',
  '🏋️',
  '🎯',
  '💻',
  '✍️',
  '🧠',
  '🎵',
  '🌱',
  '⚡',
  '🔥',
  '🏆',
  '🚀',
  '📖',
  '🧪',
];

export const MOTIVATION_PROMPTS = [
  'I want to stay consistent and prove I can follow through.',
  'Small daily wins will compound into my dream outcome.',
  'Accountability keeps me honest when motivation fades.',
];
