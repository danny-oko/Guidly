export type GoalStatus = 'active' | 'completed' | 'missed';

export type GoalFilter = 'all' | 'active' | 'completed' | 'missed';

export interface Goal {
  id: string;
  title: string;
  notes?: string;
  /** ISO date: YYYY-MM-DD */
  dueDate: string;
  punishment?: string;
  status: GoalStatus;
  completedAt?: string;
  createdAt: string;
}

export interface Plan {
  id: string;
  name: string;
  emoji: string;
  /** Personal motivation — why this plan matters */
  motivation?: string;
  goals: Goal[];
  createdAt: string;
}

export interface PlanProgress {
  pctDone: number;
  totalGoals: number;
  completedGoals: number;
  activeGoals: number;
  missedGoals: number;
  overdueGoals: number;
}

export interface AppState {
  plans: Plan[];
  activePlanId: string | null;
}
