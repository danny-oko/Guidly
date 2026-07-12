import ScheduleGrid from '@/components/schedule/ScheduleGrid';
import WidgetTopBar from '@/components/widgets/WidgetTopBar';
import { getWidgetData } from '@/lib/services/widget.service';

export default async function CalendarPage() {
  const { notifications } = await getWidgetData();

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden p-3 sm:p-6">
      <header className="mb-3 flex shrink-0 items-start justify-between gap-3 sm:mb-4 sm:gap-4">
        <h1 className="text-lg font-bold tracking-tight sm:text-2xl">
          Weekly schedule
        </h1>
        <div className="hidden sm:block">
          <WidgetTopBar unreadCount={notifications.unreadCount} />
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col">
        <ScheduleGrid />
      </div>
    </div>
  );
}
