import type { ScheduleEvent } from '@/lib/types/schedule.types';

export const EVENT_TYPE_STYLE: Record<ScheduleEvent['type'], string> = {
  class: 'bg-[#b8d1f3] border-[#9ebde8] text-[#121212]',
  study: 'bg-[#e8d069] border-[#d9bd4f] text-[#121212]',
  deadline: 'bg-[#f5c6d6] border-[#e3adc2] text-[#121212]',
  meeting: 'bg-[#b8d8a0] border-[#9fcb81] text-[#121212]',
  exam: 'bg-[#f5c6d6] border-[#e3adc2] text-[#121212]',
  event: 'bg-[#f3efe6] border-[#e2dccf] text-[#121212]',
};
