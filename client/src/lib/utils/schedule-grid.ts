export const SCHEDULE_GRID_START_MINUTES = 8 * 60;
export const SCHEDULE_GRID_END_MINUTES = 21 * 60;
export const SCHEDULE_SLOT_MINUTES = 30;
export const SCHEDULE_SLOT_HEIGHT_PX = 48;
export const SCHEDULE_TIME_GUTTER_WIDTH_PX = 52;
export const SCHEDULE_DAY_MIN_WIDTH_PX = 120;

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

export function scheduleGridHeightPx(): number {
  const slotCount =
    (SCHEDULE_GRID_END_MINUTES - SCHEDULE_GRID_START_MINUTES) /
    SCHEDULE_SLOT_MINUTES;
  return slotCount * SCHEDULE_SLOT_HEIGHT_PX;
}

export function buildTimeSlotMinutes(): number[] {
  const slots: number[] = [];
  for (
    let m = SCHEDULE_GRID_START_MINUTES;
    m <= SCHEDULE_GRID_END_MINUTES;
    m += SCHEDULE_SLOT_MINUTES
  ) {
    slots.push(m);
  }
  return slots;
}

export function formatTimeLabel(minutesFromMidnight: number): string {
  const h = Math.floor(minutesFromMidnight / 60);
  const m = minutesFromMidnight % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function formatScheduleDayLabel(isoDate: string): string {
  const date = new Date(`${isoDate}T12:00:00`);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const weekday = WEEKDAY_LABELS[date.getDay()];
  return `${weekday} ${day}/${month}`;
}
