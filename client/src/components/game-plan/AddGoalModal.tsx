'use client';

import { useState } from 'react';

import { todayIso } from '@/lib/utils/game-plan';

import GamePlanModalShell from './GamePlanModalShell';

interface Props {
  onAdd: (
    title: string,
    dueDate: string,
    punishment?: string,
    notes?: string,
  ) => void;
  onCancel: () => void;
}

export default function AddGoalModal({ onAdd, onCancel }: Props) {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState(todayIso());
  const [punishment, setPunishment] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  function handleAdd() {
    setError('');
    if (!title.trim()) {
      setError('Describe the goal you want to hit.');
      return;
    }
    if (!dueDate) {
      setError('Pick a deadline so you stay accountable.');
      return;
    }
    onAdd(
      title.trim(),
      dueDate,
      punishment.trim() || undefined,
      notes.trim() || undefined,
    );
  }

  return (
    <GamePlanModalShell
      onClose={onCancel}
      ariaLabel="Add a goal"
      panelClassName="game-plan-modal__panel game-plan-modal__panel--wide"
    >
        <h2 className="game-plan-modal__title">Add a goal</h2>
        <p className="game-plan-modal__subtitle">
          Be specific. If you miss the deadline, your punishment keeps you
          honest.
        </p>

        <label className="game-plan-modal__label" htmlFor="goal-title">
          Goal
        </label>
        <input
          id="goal-title"
          autoFocus
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="e.g. Finish 3 practice tests"
          className="game-plan-modal__input"
        />

        <label className="game-plan-modal__label" htmlFor="goal-due">
          Deadline
        </label>
        <input
          id="goal-due"
          type="date"
          value={dueDate}
          min={todayIso()}
          onChange={(event) => setDueDate(event.target.value)}
          className="game-plan-modal__input"
        />

        <label className="game-plan-modal__label" htmlFor="goal-punishment">
          Punishment if missed (optional)
        </label>
        <input
          id="goal-punishment"
          value={punishment}
          onChange={(event) => setPunishment(event.target.value)}
          placeholder="e.g. No social media for 24 hours"
          className="game-plan-modal__input"
        />

        <label className="game-plan-modal__label" htmlFor="goal-notes">
          Notes (optional)
        </label>
        <textarea
          id="goal-notes"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Break it down, link resources, etc."
          className="game-plan-modal__textarea"
          rows={2}
        />

        {error && <p className="game-plan-modal__error">{error}</p>}

        <div className="game-plan-modal__actions">
          <button type="button" className="game-plan-modal__cancel" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="game-plan-modal__confirm" onClick={handleAdd}>
            Add goal
          </button>
        </div>
    </GamePlanModalShell>
  );
}
