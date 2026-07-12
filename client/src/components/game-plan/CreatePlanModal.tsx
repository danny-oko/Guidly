'use client';

import { useState } from 'react';

import { MOTIVATION_PROMPTS, PLAN_EMOJIS } from '@/lib/utils/game-plan';

import GamePlanModalShell from './GamePlanModalShell';

interface Props {
  onAdd: (name: string, emoji: string, motivation?: string) => void;
  onCancel: () => void;
}

export default function CreatePlanModal({ onAdd, onCancel }: Props) {
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('🎯');
  const [motivation, setMotivation] = useState('');
  const [error, setError] = useState('');

  function handleCreate() {
    setError('');
    if (!name.trim()) {
      setError('Give your plan a name so you can find it later.');
      return;
    }
    onAdd(name.trim(), emoji, motivation.trim() || undefined);
  }

  return (
    <GamePlanModalShell
      onClose={onCancel}
      ariaLabel="Start a new game plan"
      panelClassName="game-plan-modal__panel game-plan-modal__panel--wide"
    >
        <h2 className="game-plan-modal__title">Start a new game plan</h2>
        <p className="game-plan-modal__subtitle">
          Set goals on your terms, track progress, and define consequences if you
          slip.
        </p>

        <label className="game-plan-modal__label">Pick an icon</label>
        <div className="game-plan-modal__emoji-grid">
          {PLAN_EMOJIS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setEmoji(item)}
              className={`game-plan-modal__emoji${emoji === item ? ' game-plan-modal__emoji--active' : ''}`}
            >
              {item}
            </button>
          ))}
        </div>

        <label className="game-plan-modal__label" htmlFor="plan-name">
          Plan name
        </label>
        <input
          id="plan-name"
          autoFocus
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="e.g. Summer SAT sprint"
          className="game-plan-modal__input"
          onKeyDown={(event) => event.key === 'Enter' && handleCreate()}
        />

        <label className="game-plan-modal__label" htmlFor="plan-motivation">
          Why does this matter? (optional)
        </label>
        <textarea
          id="plan-motivation"
          value={motivation}
          onChange={(event) => setMotivation(event.target.value)}
          placeholder="Write what you are working toward..."
          className="game-plan-modal__textarea"
          rows={3}
        />

        <div className="game-plan-modal__prompts">
          {MOTIVATION_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              type="button"
              className="game-plan-modal__prompt"
              onClick={() => setMotivation(prompt)}
            >
              {prompt}
            </button>
          ))}
        </div>

        {error && <p className="game-plan-modal__error">{error}</p>}

        <div className="game-plan-modal__actions">
          <button type="button" className="game-plan-modal__cancel" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="game-plan-modal__confirm" onClick={handleCreate}>
            Create plan
          </button>
        </div>
    </GamePlanModalShell>
  );
}
