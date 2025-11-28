import { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

type Props = HTMLAttributes<HTMLButtonElement> & { checked?: boolean }
export function Switch({ className, checked, ...props }: Props) {
  return (
    <button aria-pressed={checked} className={cn('inline-flex h-6 w-11 items-center rounded-full border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-ring', checked ? 'bg-neutral-900 dark:bg-neutral-100' : 'bg-neutral-200 dark:bg-neutral-800', className)} {...props}>
      <span className={cn('h-5 w-5 rounded-full bg-white dark:bg-neutral-900 transition-transform', checked ? 'translate-x-5' : 'translate-x-1')}></span>
    </button>
  )
}
