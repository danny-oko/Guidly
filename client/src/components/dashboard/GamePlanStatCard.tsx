'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import type { Plan } from '@/lib/types/game-plan.types';
import {
  getLatestPlans,
  getPlanProgress,
  loadState,
} from '@/lib/utils/game-plan';

export default function GamePlanStatCard() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const state = loadState();
    setPlans(getLatestPlans(state.plans, 3));
    setReady(true);
  }, []);

  const hasPlans = plans.length > 0;

  return (
    <article className="stat-card stat-card--green">
      <div className="stat-card__head">
        <h2 className="stat-card__title">Game plans</h2>
        <Link href="/game-plan" className="stat-card__link">
          Open
        </Link>
      </div>

      {!ready ? (
        <div className="stat-card__game-plan-skeleton" aria-hidden="true" />
      ) : !hasPlans ? (
        <div className="stat-card__game-plan-empty">
          <p>No plans yet</p>
          <Link href="/game-plan" className="stat-card__game-plan-cta">
            Start a plan
          </Link>
        </div>
      ) : (
        <ul className="stat-card__game-plan-list">
          {plans.map((plan) => {
            const progress = getPlanProgress(plan);
            return (
              <li key={plan.id}>
                <Link href="/game-plan" className="stat-card__game-plan-item">
                  <span className="stat-card__game-plan-emoji" aria-hidden="true">
                    {plan.emoji}
                  </span>
                  <span className="stat-card__game-plan-body">
                    <span className="stat-card__game-plan-name">{plan.name}</span>
                    <span className="stat-card__game-plan-meta">
                      {progress.pctDone}% · {progress.completedGoals}/
                      {progress.totalGoals} goals
                      {progress.missedGoals > 0
                        ? ` · ${progress.missedGoals} missed`
                        : ''}
                    </span>
                    <span className="stat-card__game-plan-bar" aria-hidden="true">
                      <span
                        className="stat-card__game-plan-bar-fill"
                        style={{ width: `${progress.pctDone}%` }}
                      />
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </article>
  );
}
