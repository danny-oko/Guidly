import * as React from 'react';

import { cn } from '@/lib/utils';

const variantClasses = {
  default:
    'bg-foreground text-background hover:opacity-90 focus-visible:ring-foreground/30',
  outline:
    'border border-border bg-background text-foreground hover:bg-muted focus-visible:ring-border',
  destructive:
    'bg-[var(--color-primary)] text-[var(--text-primary)] hover:bg-[var(--uni-accent-pink-icon)] hover:text-[var(--text-white)] focus-visible:ring-[var(--uni-accent-pink-icon)]/40',
  ghost: 'text-foreground hover:bg-muted focus-visible:ring-border',
} as const;

type ButtonVariant = keyof typeof variantClasses;

function Button({
  className,
  variant = 'default',
  type = 'button',
  ...props
}: React.ComponentProps<'button'> & {
  variant?: ButtonVariant;
}) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex h-9 items-center justify-center rounded-lg px-4 text-sm font-semibold transition-opacity outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50',
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}

export { Button };
