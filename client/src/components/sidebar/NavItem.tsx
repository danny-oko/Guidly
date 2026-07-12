'use client';

import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface NavItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  isCollapsed?: boolean;
}

export default function NavItem({
  href,
  icon: Icon,
  label,
  isActive = false,
  isCollapsed = false,
}: NavItemProps) {
  return (
    <li className="relative group">
      <Link
        href={href}
        className={`
          w-full flex items-center gap-3
          px-3 py-2.5 rounded-xl
          transition-all duration-200 ease-in-out
          font-medium text-sm
          ${isActive ? 'nav-item--active' : 'nav-item--idle'}
          ${isCollapsed ? 'justify-center px-0' : ''}
        `}
        aria-current={isActive ? 'page' : undefined}
        title={isCollapsed ? label : undefined}
      >
        <Icon
          size={18}
          strokeWidth={isActive ? 2.2 : 1.8}
          className={`flex-shrink-0 transition-colors duration-200 ${
            isActive ? 'icon-active' : 'icon-idle'
          }`}
        />
        {!isCollapsed && <span className="truncate leading-none">{label}</span>}
      </Link>

      {isCollapsed && (
        <div className="tooltip absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50 pointer-events-none">
          <span className="tooltip-label">{label}</span>
        </div>
      )}
    </li>
  );
}
