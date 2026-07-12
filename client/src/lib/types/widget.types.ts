export type EventType = 'meeting' | 'deadline' | 'interview' | 'workshop';

export interface WidgetParticipant {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface WidgetEvent {
  id: string;
  title: string;
  location: string;
  startTime: string;
  endTime: string;
  type: EventType;
  participants?: WidgetParticipant[];
  extraParticipantCount?: number;
}

export interface WidgetCalendar {
  month: number;
  year: number;
  selectedDate: string;
  highlightedDates: string[];
}

export interface WidgetNotifications {
  unreadCount: number;
}

export interface WidgetData {
  calendar: WidgetCalendar;
  events: WidgetEvent[];
  notifications: WidgetNotifications;
}
