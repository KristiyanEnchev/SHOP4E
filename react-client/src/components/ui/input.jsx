import * as React from 'react';

import { cn } from '@/lib/utils';

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm',
        'shadow-sm transition-colors file:border-0 file:bg-transparent',
        'file:text-sm file:font-medium placeholder:text-muted-foreground',
        'focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
