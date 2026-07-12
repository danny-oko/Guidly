import { SCHEDULE_WEEK_DAYS } from '@/lib/data/schedule-mock';
import {
  SCHEDULE_TIME_GUTTER_WIDTH_PX,
  formatScheduleDayLabel,
} from '@/lib/utils/schedule-grid';

type ScheduleWeeklyHeaderProps = {
  todayHighlight: string;
};

export function ScheduleWeeklyHeader({
  todayHighlight,
}: ScheduleWeeklyHeaderProps) {
  return (
    <div className="mb-3 flex shrink-0">
      <div
        className="shrink-0"
        style={{ width: SCHEDULE_TIME_GUTTER_WIDTH_PX }}
        aria-hidden
      />
      <div className="flex min-w-0 flex-1 gap-1 px-1 sm:gap-2">
        {SCHEDULE_WEEK_DAYS.map((day) => {
          const isToday = day === todayHighlight;

          return (
            <div
              key={day}
              className={`flex min-w-35 flex-1 items-center justify-center rounded-xl text-xs font-semibold sm:min-w-0 sm:text-sm ${
                isToday
                  ? 'bg-[#121212] py-3 text-white sm:py-4'
                  : 'bg-[#f3efe6] py-3 text-[#666666] sm:py-4'
              }`}
            >
              {formatScheduleDayLabel(day)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
