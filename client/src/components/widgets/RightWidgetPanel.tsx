import { getWidgetData } from '../../lib/services/widget.service';
import CalendarWidget from './CalendarWidget';
import EventsTimeline from './EventsTimeline';
import WidgetTopBar from './WidgetTopBar';

export default async function RightWidgetPanel() {
  const { calendar, events, notifications } = await getWidgetData();

  return (
    <aside className="widget-panel">
      <div className="widget-panel__top">
        <WidgetTopBar unreadCount={notifications.unreadCount} />
      </div>

      <div className="widget-panel__body">
        <CalendarWidget calendar={calendar} events={events} />
        <EventsTimeline selectedDate={calendar.selectedDate} events={events} />
      </div>
    </aside>
  );
}
