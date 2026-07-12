import { Bell, Settings, UserRound } from 'lucide-react';

interface WidgetTopBarProps {
  unreadCount: number;
}

export default function WidgetTopBar({ unreadCount }: WidgetTopBarProps) {
  return (
    <header className="widget-topbar">
      <button type="button" className="widget-topbar__btn" aria-label="Profile">
        <UserRound size={18} strokeWidth={1.8} />
      </button>
      <button type="button" className="widget-topbar__btn widget-topbar__btn--badge" aria-label="Notifications">
        <Bell size={18} strokeWidth={1.8} />
        {unreadCount > 0 && (
          <span className="widget-topbar__badge" aria-hidden="true">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>
      <button type="button" className="widget-topbar__btn" aria-label="Settings">
        <Settings size={18} strokeWidth={1.8} />
      </button>
    </header>
  );
}
