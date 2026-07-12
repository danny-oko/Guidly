'use client';

import { useState } from 'react';
import { WidgetCalendar } from '../../lib/types/widget.types';
import { WidgetEvent } from '../../lib/types/widget.types';
import {
  buildCalendarGrid,
  getMonthLabel,
  toIsoDate,
  WEEKDAYS,
} from '../../lib/utils/calendar';

// import type { WidgetCalendar } from '@/lib/types/widget.types';
// import {
//   WEEKDAYS,
//   buildCalendarGrid,
//   getMonthLabel,
//   toIsoDate,
// } from '@/lib/utils/calendar';

interface CalendarWidgetProps {
  calendar: WidgetCalendar;
  events: WidgetEvent[];
}

export default function CalendarWidget({ calendar, events }: CalendarWidgetProps) {
  const { month, year, selectedDate, highlightedDates } = calendar;
  const [displayMonth, setDisplayMonth] = useState(month);
  const [displayYear, setDisplayYear] = useState(year);
  const cells = buildCalendarGrid(displayMonth, displayYear);
  const highlightedSet = new Set(highlightedDates);

  const handlePreviousMonth = () => {
    if (displayMonth === 1) {
      setDisplayMonth(12);
      setDisplayYear((prev) => prev - 1);
      return;
    }

    setDisplayMonth((prev) => prev - 1);
  };

  const handleNextMonth = () => {
    if (displayMonth === 12) {
      setDisplayMonth(1);
      setDisplayYear((prev) => prev + 1);
      return;
    }

    setDisplayMonth((prev) => prev + 1);
  };

  return (
    <section className="widget-card calendar-widget">
      <div className="calendar-widget__header">
        <h2 className="calendar-widget__title">
          {getMonthLabel(displayMonth, displayYear)}
        </h2>
        <div className="calendar-widget__nav">
          <button
            type="button"
            className="calendar-widget__nav-btn"
            aria-label="Previous month"
            onClick={handlePreviousMonth}
          >
            ‹
          </button>
          <button
            type="button"
            className="calendar-widget__nav-btn"
            aria-label="Next month"
            onClick={handleNextMonth}
          >
            ›
          </button>
        </div>
      </div>

      <div className="calendar-widget__weekdays">
        {WEEKDAYS.map((day) => (
          <span key={day} className="calendar-widget__weekday">
            {day}
          </span>
        ))}
      </div>

      <div className="calendar-widget__grid">
        {cells.map((day, index) => {
          if (day === null) {
            return (
              <span
                key={`empty-${index}`}
                className="calendar-widget__day calendar-widget__day--empty"
              />
            );
          }

          const isoDate = toIsoDate(displayYear, displayMonth, day);
          const isSelected = isoDate === selectedDate;
          const isHighlighted = highlightedSet.has(isoDate);
          const hasSchedules = isSelected || isHighlighted;

          return (
            <div key={isoDate} className="calendar-widget__day-cell">
              <span
                className={[
                  'calendar-widget__day',
                  hasSchedules && 'calendar-widget__day--has-schedule',
                  isSelected && 'calendar-widget__day--selected',
                  !isSelected &&
                    isHighlighted &&
                    'calendar-widget__day--highlighted',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {day}
              </span>

              {hasSchedules ? (
                <div className="calendar-widget__tooltip">
                  <p className="calendar-widget__tooltip-title">Schedules</p>
                  <ul className="calendar-widget__tooltip-list">
                    {events.slice(0, 3).map((event) => (
                      <li key={event.id}>
                        <span>{event.startTime}</span>
                        <span>{event.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

    </section>
  );
}
