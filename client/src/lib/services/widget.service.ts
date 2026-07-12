import dummyData from '@/lib/data/widget-dummy.json';
import type { WidgetData } from '@/lib/types/widget.types';

/** Replace with a real DB/API call when backend is ready. */
export async function getWidgetData(): Promise<WidgetData> {
  return dummyData as WidgetData;
}
