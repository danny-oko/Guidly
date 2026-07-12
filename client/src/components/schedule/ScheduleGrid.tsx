'use client';

import { useEffect, useMemo, useState } from 'react';

import {
  MOCK_SCHEDULE_EVENTS,
  SCHEDULE_WEEK_DAYS,
} from '@/lib/data/schedule-mock';
import type {
  PositionedScheduleEvent,
  ScheduleEvent,
} from '@/lib/types/schedule.types';
import {
  SCHEDULE_GRID_END_MINUTES,
  SCHEDULE_GRID_START_MINUTES,
  SCHEDULE_SLOT_HEIGHT_PX,
} from '@/lib/utils/schedule-grid';
import { ScheduleMonthlyView } from './ScheduleMonthlyView';
import { ScheduleSearchInput } from './ScheduleSearchInput';
import { ScheduleTodayView } from './ScheduleTodayView';
import { ScheduleViewTabs } from './ScheduleViewTabs';
import { ScheduleWeeklyHeader } from './ScheduleWeeklyHeader';
import { ScheduleWeeklyTimeline } from './ScheduleWeeklyTimeline';

function toIsoDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function toMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

function clampPositionedEvent(
  event: ScheduleEvent,
): PositionedScheduleEvent | null {
  const start = toMinutes(event.startTime);
  const end = toMinutes(event.endTime);
  const range = SCHEDULE_GRID_END_MINUTES - SCHEDULE_GRID_START_MINUTES;

  if (
    end <= SCHEDULE_GRID_START_MINUTES ||
    start >= SCHEDULE_GRID_END_MINUTES
  ) {
    return null;
  }

  const clampedStart = Math.max(start, SCHEDULE_GRID_START_MINUTES);
  const clampedEnd = Math.max(
    clampedStart + 30,
    Math.min(end, SCHEDULE_GRID_END_MINUTES),
  );

  const topPx = ((clampedStart - SCHEDULE_GRID_START_MINUTES) / range) * 100;
  const estimateLines = (text?: string, charsPerLine = 20) => {
    if (!text) return 0;
    return Math.max(1, Math.ceil(text.length / charsPerLine));
  };

  const titleLines = estimateLines(event.title, 18);
  const placeLines = estimateLines(event.place, 22);
  const noteLines = estimateLines(event.note, 22);
  const timeLines = 1;
  const statusLines = event.status ? 1 : 0;
  const totalLines =
    titleLines + placeLines + noteLines + timeLines + statusLines;

  // Higher baseline and multiplier so longer content fully fits.
  const dynamicMinHeight = 8 + totalLines * 3.1;
  const heightPx = Math.max(
    ((clampedEnd - clampedStart) / range) * 100,
    dynamicMinHeight,
  );

  return {
    ...event,
    topPx,
    heightPx,
  };
}

export default function ScheduleGrid() {
  const [now, setNow] = useState(() => new Date());
  const [events, setEvents] = useState<ScheduleEvent[]>(MOCK_SCHEDULE_EVENTS);
  const [editDialogEventId, setEditDialogEventId] = useState<string | null>(
    null,
  );
  const [editTitleValue, setEditTitleValue] = useState('');
  const [viewMode, setViewMode] = useState<'today' | 'weekly' | 'monthly'>(
    'weekly',
  );

  useEffect(() => {
    const id = window.setInterval(() => {
      setNow(new Date());
    }, 60_000);

    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setViewMode('today');
    }
  }, []);

  const todayHighlight = useMemo(() => {
    const currentIsoDate = toIsoDateKey(now);
    if (
      SCHEDULE_WEEK_DAYS.includes(
        currentIsoDate as (typeof SCHEDULE_WEEK_DAYS)[number],
      )
    ) {
      return currentIsoDate;
    }

    // Keep a "today" highlight inside the fixed mock week by weekday index.
    const mondayFirstIndex = (now.getDay() + 6) % 7;
    return SCHEDULE_WEEK_DAYS[mondayFirstIndex];
  }, [now]);
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const showCurrentLine =
    currentMinutes >= SCHEDULE_GRID_START_MINUTES &&
    currentMinutes <= SCHEDULE_GRID_END_MINUTES;
  const currentLineTopPercent = showCurrentLine
    ? ((currentMinutes - SCHEDULE_GRID_START_MINUTES) /
        (SCHEDULE_GRID_END_MINUTES - SCHEDULE_GRID_START_MINUTES)) *
      100
    : null;
  const eventsByDay = useMemo(() => {
    const map = new Map<string, PositionedScheduleEvent[]>();

    for (const day of SCHEDULE_WEEK_DAYS) {
      const positioned = events
        .filter((event) => event.date === day)
        .map(clampPositionedEvent)
        .filter((event): event is PositionedScheduleEvent => event !== null);

      map.set(day, positioned);
    }

    return map;
  }, [events]);
  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => {
      const aKey = `${a.date} ${a.startTime}`;
      const bKey = `${b.date} ${b.startTime}`;
      return aKey.localeCompare(bKey);
    });
  }, [events]);
  const todayEvents = useMemo(() => {
    return sortedEvents.filter((event) => event.date === todayHighlight);
  }, [sortedEvents, todayHighlight]);
  const timelineStretchFactor = useMemo(() => {
    let maxRatio = 1;
    const range = SCHEDULE_GRID_END_MINUTES - SCHEDULE_GRID_START_MINUTES;

    for (const event of events) {
      const start = Math.max(
        toMinutes(event.startTime),
        SCHEDULE_GRID_START_MINUTES,
      );
      const end = Math.min(
        Math.max(toMinutes(event.endTime), start + 30),
        SCHEDULE_GRID_END_MINUTES,
      );
      const durationPct = ((end - start) / range) * 100;
      const positioned = clampPositionedEvent(event);
      if (!positioned || durationPct <= 0) continue;
      const ratio = positioned.heightPx / durationPct;
      if (ratio > maxRatio) maxRatio = ratio;
    }

    return Math.min(Math.max(maxRatio, 1), 2.2);
  }, [events]);
  const rowHeightPx = Math.round(
    SCHEDULE_SLOT_HEIGHT_PX * timelineStretchFactor,
  );

  const handleDeleteEvent = (eventId: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== eventId));
  };

  const handleOpenEditDialog = (eventId: string) => {
    const target = events.find((event) => event.id === eventId);
    if (!target) return;

    setEditDialogEventId(eventId);
    setEditTitleValue(target.title);
  };

  const handleCloseEditDialog = () => {
    setEditDialogEventId(null);
    setEditTitleValue('');
  };

  const handleSubmitEditDialog = () => {
    if (!editDialogEventId) return;
    const nextTitle = editTitleValue.trim();
    if (!nextTitle) return;

    setEvents((prev) =>
      prev.map((event) =>
        event.id === editDialogEventId ? { ...event, title: nextTitle } : event,
      ),
    );
    handleCloseEditDialog();
  };

  useEffect(() => {
    if (!editDialogEventId) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setEditDialogEventId(null);
      setEditTitleValue('');
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [editDialogEventId]);

  return (
    <div className="schedule-grid relative flex h-full w-full min-h-0 flex-col">
      <ScheduleSearchInput />
      <ScheduleViewTabs viewMode={viewMode} onChangeViewMode={setViewMode} />

      {viewMode === 'today' ? (
        <ScheduleTodayView
          todayEvents={todayEvents}
          onEditEvent={handleOpenEditDialog}
          onDeleteEvent={handleDeleteEvent}
        />
      ) : null}

      {viewMode === 'monthly' ? (
        <ScheduleMonthlyView
          sortedEvents={sortedEvents}
          onEditEvent={handleOpenEditDialog}
          onDeleteEvent={handleDeleteEvent}
        />
      ) : null}

      {viewMode === 'weekly' ? (
        <div className="min-h-0 flex-1 overflow-x-auto">
          <div className="flex h-full min-w-275 flex-col">
            <ScheduleWeeklyHeader todayHighlight={todayHighlight} />
            <ScheduleWeeklyTimeline
              todayHighlight={todayHighlight}
              eventsByDay={eventsByDay}
              rowHeightPx={rowHeightPx}
              currentLineTopPercent={currentLineTopPercent}
              currentMinutes={currentMinutes}
              onEditEvent={handleOpenEditDialog}
              onDeleteEvent={handleDeleteEvent}
            />
          </div>
        </div>
      ) : null}

      {editDialogEventId ? (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/25 p-4">
          <div className="w-full max-w-sm rounded-3xl border border-[#d9cfbe] bg-[#f3efe6] p-5 shadow-xl">
            <h3 className="text-2xl font-bold tracking-tight text-[#121212]">
              Update schedule
            </h3>
            <label
              htmlFor="edit-schedule-title"
              className="mt-4 block text-[13px] font-semibold text-[#666666]"
            >
              Title
            </label>
            <input
              id="edit-schedule-title"
              type="text"
              value={editTitleValue}
              onChange={(event) => setEditTitleValue(event.target.value)}
              className="mt-2 h-14 w-full rounded-2xl border border-[#d9cfbe] bg-[#fffdf7] px-5 text-sm outline-none focus:border-[#c9b79a]"
            />
            <div className="mt-5 flex justify-end items-center gap-3">
              <button
                type="button"
                onClick={handleCloseEditDialog}
                className="px-2 py-1 text-xl font-medium text-[#b91c1c]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmitEditDialog}
                className="px-2 py-1 text-xl font-medium text-[#121212]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
