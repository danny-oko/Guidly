import {
  CalendarDays,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Map,
  type LucideIcon,
} from 'lucide-react';

export interface NavItemConfig {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  description: string;
}

export const navItems: NavItemConfig[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
    description: 'Overview of your university shortlist and deadlines.',
  },
  {
    id: 'essays',
    label: 'Essays',
    href: '/essays',
    icon: FileText,
    description: 'Draft and refine your application essays.',
  },
  {
    id: 'universities',
    label: 'Universities',
    href: '/universities',
    icon: GraduationCap,
    description: 'Browse and compare universities on your list.',
  },
  {
    id: 'calendar',
    label: 'Calendar',
    href: '/calendar',
    icon: CalendarDays,
    description: 'Track application deadlines and upcoming events.',
  },
  {
    id: 'game-plan',
    label: 'Game plan',
    href: '/game-plan',
    icon: Map,
    description: 'Follow your personalized application roadmap.',
  },
  {
    id: 'mongolian-universities',
    label: 'Universities in Mongolia',
    href: '/mongolian-universities',
    icon: GraduationCap,
    description: 'Look at the opportunities locally',
  },
];

export function isNavActive(href: string, pathname: string): boolean {
  if (href === '/') {
    return pathname === '/';
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function getNavItemByHref(href: string): NavItemConfig | undefined {
  return navItems.find((item) => item.href === href);
}
