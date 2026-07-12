'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import CollapseButton from './CollapseButton';
import NavItem from './NavItem';
import { isNavActive, NavItemConfig, navItems } from '../../lib/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`sidebar ${isCollapsed ? 'sidebar--collapsed' : 'sidebar--expanded'}`}
    >
      <div
        className={`sidebar__logo-row ${isCollapsed ? 'justify-center' : ''}`}
      >
        {!isCollapsed && (
          <Link href="/" className="sidebar__logo-text">
            Guidly
          </Link>
        )}
        {isCollapsed && (
          <Link href="/" className="sidebar__logo-dot" aria-label="Home" />
        )}

        <CollapseButton
          isCollapsed={isCollapsed}
          onToggle={() => setIsCollapsed((v) => !v)}
        />
      </div>

      <nav aria-label="Main navigation">
        <ul className="flex flex-col gap-2 p-4">
          {navItems.map((item: NavItemConfig) => (
            <NavItem
              key={item.id}
              href={item.href}
              icon={item.icon}
              label={item.label}
              isActive={isNavActive(item.href, pathname)}
              isCollapsed={isCollapsed}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
}
