import type { ReactNode } from 'react';

interface UniversityListProps {
  children: ReactNode;
  className?: string;
}

export default function UniversityList({
  children,
  className,
}: UniversityListProps) {
  return (
    <div
      className={['universities-list', className].filter(Boolean).join(' ')}
      role="list"
    >
      {children}
    </div>
  );
}
