'use client';

import React from 'react';

interface NavSectionProps {
  label: string;
  isCollapsed?: boolean;
  children: React.ReactNode;
}

export default function NavSection({
  label,
  isCollapsed = false,
  children,
}: NavSectionProps) {
  return (
    <div className="nav-section">
      {!isCollapsed ? <p>{label}</p> : <div />}
      <ul className="flex flex-col gap-1">{children}</ul>
    </div>
  );
}
