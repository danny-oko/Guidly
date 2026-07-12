import { SCHEDULE_WEEK_DAYS } from '@/lib/data/schedule-mock';
import type { PositionedScheduleEvent } from '@/lib/types/schedule.types';
import {
  SCHEDULE_TIME_GUTTER_WIDTH_PX,
  buildTimeSlotMinutes,
  formatTimeLabel,
} from '@/lib/utils/schedule-grid';

import { EVENT_TYPE_STYLE } from './scheduleGridShared';
import { ScheduleEventCardActions } from './ScheduleEventCardActions';

const timeSlots = buildTimeSlotMinutes();
const slotRows = timeSlots.slice(0, -1);

type ScheduleWeeklyTimelineProps = {
  todayHighlight: string;
  eventsByDay: Map<string, PositionedScheduleEvent[]>;
  rowHeightPx: number;
  currentLineTopPercent: number | null;
  currentMinutes: number;
  onEditEvent: (eventId: string) => void;
  onDeleteEvent: (eventId: string) => void;
};

export function ScheduleWeeklyTimeline({
  todayHighlight,
  eventsByDay,
  rowHeightPx,
  currentLineTopPercent,
  currentMinutes,
  onEditEvent,
  onDeleteEvent,
}: ScheduleWeeklyTimelineProps) {
  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-y-auto rounded-2xl border border-[#e8dfd0] bg-[#fffdf7]">
      <div className="flex h-full min-h-0 flex-1 items-stretch">
        <div
          className="flex min-h-full shrink-0 flex-col border-r border-[#e8dfd0]"
          style={{ width: SCHEDULE_TIME_GUTTER_WIDTH_PX }}
        >
          <div
            className="h-full min-h-0 flex-1"
            style={{
              backgroundImage: `repeating-linear-gradient(to bottom, transparent, transparent ${Math.max(rowHeightPx - 1, 1)}px, #efe9df ${Math.max(rowHeightPx - 1, 1)}px, #efe9df ${rowHeightPx}px)`,
            }}
          >
            {slotRows.map((minutes) => (
              <div
                key={minutes}
                className="flex items-start justify-end border-t border-[#efe9df] pr-2 pt-0.5"
                style={{ height: rowHeightPx }}
              >
                <span className="text-[11px] leading-none tabular-nums text-[#8a806f]">
                  {formatTimeLabel(minutes)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex h-full min-h-full min-w-0 flex-1 items-stretch self-stretch">
          {SCHEDULE_WEEK_DAYS.map((day, index) => {
            const isToday = day === todayHighlight;
            const dayEvents = eventsByDay.get(day) ?? [];
            const isLastDay = index === SCHEDULE_WEEK_DAYS.length - 1;

            return (
              <div
                key={day}
                className="relative h-full min-h-full min-w-[140px] flex-1 self-stretch sm:min-w-0"
              >
                <div
                  className="relative h-full min-h-full"
                  style={{
                    backgroundImage: `repeating-linear-gradient(to bottom, transparent, transparent ${Math.max(rowHeightPx - 1, 1)}px, #efe9df ${Math.max(rowHeightPx - 1, 1)}px, #efe9df ${rowHeightPx}px)`,
                  }}
                >
                  {slotRows.map((minutes) => (
                    <div
                      key={minutes}
                      className="border-t border-[#efe9df]"
                      style={{ height: rowHeightPx }}
                    />
                  ))}

                  {dayEvents.map((event) => (
                    <article
                      key={event.id}
                      className={`absolute left-0.5 right-0.5 z-20 overflow-hidden rounded-2xl border px-2 py-2.5 shadow-sm sm:left-1 sm:right-1 sm:px-4 sm:py-3.5 ${EVENT_TYPE_STYLE[event.type]}`}
                      style={{
                        top: `${event.topPx}%`,
                        height: `${event.heightPx}%`,
                      }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-[11px] font-semibold leading-snug sm:text-xs">
                          {event.title}
                        </h3>
                        <ScheduleEventCardActions
                          compact
                          onUpdate={() => onEditEvent(event.id)}
                          onDelete={() => onDeleteEvent(event.id)}
                        />
                      </div>

                      <p className="mt-1 text-[10px] leading-snug tabular-nums opacity-80 sm:mt-1.5">
                        {event.startTime} - {event.endTime}
                      </p>
                      {event.place ? (
                        <p className="mt-1 text-[10px] leading-snug opacity-80">
                          {event.place}
                        </p>
                      ) : null}
                      {event.note ? (
                        <p className="mt-1 text-[10px] leading-snug opacity-75">
                          {event.note}
                        </p>
                      ) : null}
                    </article>
                  ))}

                  {isToday && currentLineTopPercent !== null ? (
                    <div
                      className="pointer-events-none absolute right-0 left-0 z-30"
                      style={{ top: `${currentLineTopPercent}%` }}
                    >
                      <div className="absolute inset-x-0 border-t border-dotted border-[#ec4899]" />
                      <span className="absolute right-1 -top-2.5 rounded-full bg-[#ec4899] px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white tabular-nums">
                        {formatTimeLabel(currentMinutes)}
                      </span>
                    </div>
                  ) : null}
                </div>
                {!isLastDay ? (
                  <div className="pointer-events-none absolute top-0 bottom-0 right-0 w-px bg-[#e8dfd0]" />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
