'use client';

import { ArrowUp } from 'lucide-react';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';

interface UniversityListScrollSectionProps {
  children: ReactNode;
}

const SCROLL_THRESHOLD = 160;

export default function UniversityListScrollSection({
  children,
}: UniversityListScrollSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const handleScroll = () => {
      setShowScrollTop(scrollElement.scrollTop > SCROLL_THRESHOLD);
    };

    handleScroll();
    scrollElement.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      scrollElement.removeEventListener('scroll', handleScroll);
    };
  }, [children]);

  const scrollToTop = useCallback(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="universities-results__scroll-wrap">
      <div className="universities-results__body" ref={scrollRef}>
        {children}
      </div>
      <button
        type="button"
        className={[
          'universities-scroll-top',
          showScrollTop ? 'universities-scroll-top--visible' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-label="Scroll to top"
        onClick={scrollToTop}
      >
        <ArrowUp size={16} strokeWidth={2.4} aria-hidden />
      </button>
    </div>
  );
}
