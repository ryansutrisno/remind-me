import { SelectHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        'h-10 w-full rounded-md border border-input bg-white dark:bg-slate-800 px-3 py-2 text-sm',
        'text-neutral-900 dark:text-neutral-100',
        'focus:outline-none focus:ring-2 focus:ring-ring',
        className,
      )}
      {...props}
    />
  )
}
