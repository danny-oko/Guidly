export type ScheduleItemType =
  | 'class'
  | 'study'
  | 'deadline'
  | 'meeting'
  | 'exam'
  | 'event';

export type ScheduleItemStatus = 'upcoming' | 'in_progress' | 'done';

export type ScheduleEvent = {
  id: string;
  type: ScheduleItemType;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  place?: string;
  note?: string;
  status?: ScheduleItemStatus;
};

export type PositionedScheduleEvent = ScheduleEvent & {
  topPx: number;
  heightPx: number;
};
