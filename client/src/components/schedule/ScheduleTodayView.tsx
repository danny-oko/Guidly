import type { ScheduleEvent } from '@/lib/types/schedule.types';

import { EVENT_TYPE_STYLE } from './scheduleGridShared';
import { ScheduleEventCardActions } from './ScheduleEventCardActions';

type ScheduleTodayViewProps = {
  todayEvents: ScheduleEvent[];
  onEditEvent: (eventId: string) => void;
  onDeleteEvent: (eventId: string) => void;
};

export function ScheduleTodayView({
  todayEvents,
  onEditEvent,
  onDeleteEvent,
}: ScheduleTodayViewProps) {
  return (
    <div className="min-h-0 flex-1 overflow-auto rounded-2xl border border-[#e8dfd0] bg-[#fffdf7] p-3 sm:p-4">
      <h2 className="mb-3 text-base font-bold text-[#121212] sm:text-lg">
        Today&apos;s schedule
      </h2>
      {todayEvents.length === 0 ? (
        <p className="text-sm text-[#666666]">No events for today.</p>
      ) : (
        <div className="space-y-3">
          {todayEvents.map((event) => (
            <article
              key={event.id}
              className={`rounded-2xl border px-3 py-2.5 sm:px-4 sm:py-3 ${EVENT_TYPE_STYLE[event.type]}`}
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-semibold">{event.title}</h3>
                <ScheduleEventCardActions
                  onUpdate={() => onEditEvent(event.id)}
                  onDelete={() => onDeleteEvent(event.id)}
                />
              </div>
              <p className="mt-1 text-xs tabular-nums">
                {event.startTime} - {event.endTime}
              </p>
              {event.place ? <p className="mt-1 text-xs">{event.place}</p> : null}
              {event.note ? (
                <p className="mt-1 text-xs opacity-80">{event.note}</p>
              ) : null}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
