import { WidgetEvent } from '../../lib/types/widget.types';
import { getShortDateLabel } from '../../lib/utils/calendar';
import EventItem from './EventItem';

interface EventsTimelineProps {
  selectedDate: string;
  events: WidgetEvent[];
  currentTime?: string;
}

export default function EventsTimeline({
  selectedDate,
  events,
  currentTime = '08:12',
}: EventsTimelineProps) {
  const sortedEvents = [...events].sort((a, b) =>
    a.startTime.localeCompare(b.startTime),
  );
  const timeMarkers = buildTimeMarkers(sortedEvents, currentTime);

  return (
    <section className="widget-card events-timeline">
      <header className="events-timeline__header">
        <h2 className="events-timeline__date">
          {getShortDateLabel(selectedDate)}
        </h2>
        <p className="events-timeline__subtitle">Today&apos;s timeline</p>
      </header>

      <div className="events-timeline__track">
        <div className="events-timeline__times">
          {timeMarkers.map((time) => (
            <div key={time} className="events-timeline__time-row">
              <span className="events-timeline__time">{time}</span>
              {time === currentTime && (
                <span className="events-timeline__now-marker">
                  {currentTime}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="events-timeline__list">
          {sortedEvents.map((event) => (
            <EventItem key={event.id} event={event} />
          ))}
        </div>
      </div>

      <button type="button" className="events-timeline__cta">
        View all details
      </button>
    </section>
  );
}

function buildTimeMarkers(
  events: WidgetEvent[],
  currentTime: string,
): string[] {
  const times = new Set<string>();

  events.forEach((event) => {
    times.add(event.startTime);
  });

  times.add(currentTime);

  return Array.from(times).sort((a, b) => a.localeCompare(b));
}
