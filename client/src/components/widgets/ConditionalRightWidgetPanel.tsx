'use client';

import { usePathname } from 'next/navigation';
import type { PropsWithChildren } from 'react';

export default function ConditionalRightWidgetPanel({
  children,
}: PropsWithChildren) {
  const pathname = usePathname();

  if (pathname === '/calendar' || pathname.startsWith('/calendar/')) {
    return null;
  }

  if (/^\/universities\/[^/]+$/.test(pathname)) {
    return null;
  }

  return children;
}
