'use client';

interface Props {
  onCreatePlan: () => void;
}

const FEATURES = [
  {
    emoji: '🎯',
    title: 'Set your goals',
    text: 'Define what success looks like on your timeline.',
  },
  {
    emoji: '📈',
    title: 'Track progress',
    text: 'See completion at a glance across every plan.',
  },
  {
    emoji: '⚡',
    title: 'Stay accountable',
    text: 'Set punishments that keep you honest when you slip.',
  },
];

export default function GamePlanEmptyState({ onCreatePlan }: Props) {
  return (
    <div className="game-plan__empty">
      <div className="game-plan__empty-hero">
        <span className="game-plan__empty-icon" aria-hidden="true">
          🎯
        </span>
        <h2 className="game-plan__empty-title">Build your first game plan</h2>
        <p className="game-plan__empty-text">
          Turn intentions into commitments. Create a plan, add goals with
          deadlines, and define what happens if you miss them.
        </p>
        <button
          type="button"
          className="game-plan-panel__btn"
          onClick={onCreatePlan}
        >
          Create your first plan
        </button>
      </div>

      <div className="game-plan__empty-features">
        {FEATURES.map((feature) => (
          <article key={feature.title} className="game-plan__empty-feature">
            <span className="game-plan__empty-feature-icon" aria-hidden="true">
              {feature.emoji}
            </span>
            <strong>{feature.title}</strong>
            <span>{feature.text}</span>
          </article>
        ))}
      </div>
    </div>
  );
}
