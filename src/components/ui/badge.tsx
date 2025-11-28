import { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

type Props = HTMLAttributes<HTMLSpanElement> & {
  variant?: 'success' | 'warning' | 'error' | 'info'
}

export function Badge({ className, variant = 'info', ...props }: Props) {
  const variants = {
    success: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-100 dark:border-green-800',
    warning: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900 dark:text-amber-100 dark:border-amber-800',
    error: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-100 dark:border-red-800',
    info: 'bg-neutral-100 text-neutral-800 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:border-neutral-700',
  }
  return <span className={cn('inline-flex items-center rounded-md px-2 py-1 text-xs border', variants[variant], className)} {...props} />
}
