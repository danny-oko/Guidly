import {
  Clock,
  GraduationCap,
  Users,
  Video,
  type LucideIcon,
} from 'lucide-react';
import { EventType, WidgetEvent } from '../../lib/types/widget.types';

// import type { EventType, WidgetEvent } from '@/lib/types/widget.types';

const EVENT_ICONS: Record<EventType, LucideIcon> = {
  meeting: Users,
  deadline: Clock,
  interview: Video,
  workshop: GraduationCap,
};

const EVENT_COLORS: Record<EventType, string> = {
  meeting: 'event-item__icon--blue',
  deadline: 'event-item__icon--yellow',
  interview: 'event-item__icon--primary',
  workshop: 'event-item__icon--secondary',
};

interface EventItemProps {
  event: WidgetEvent;
}

export default function EventItem({ event }: EventItemProps) {
  const Icon = EVENT_ICONS[event.type];
  const iconColorClass = EVENT_COLORS[event.type];
  const timeLabel =
    event.startTime === event.endTime
      ? event.startTime
      : `${event.startTime} - ${event.endTime}`;

  return (
    <article className="event-item">
      <div className={`event-item__icon ${iconColorClass}`}>
        <Icon size={16} strokeWidth={1.8} />
      </div>

      <div className="event-item__body">
        <h3 className="event-item__title">{event.title}</h3>
        <p className="event-item__location">{event.location}</p>
        <p className="event-item__time">{timeLabel}</p>

        {event.participants && event.participants.length > 0 && (
          <div className="event-item__participants">
            {event.participants.map((participant) => (
              <span
                key={participant.id}
                className="event-item__avatar"
                title={participant.name}
              >
                {participant.name.charAt(0)}
              </span>
            ))}
            {event.extraParticipantCount ? (
              <span className="event-item__avatar event-item__avatar--more">
                +{event.extraParticipantCount}
              </span>
            ) : null}
          </div>
        )}
      </div>
    </article>
  );
}
