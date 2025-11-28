import { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn('inline-flex items-center rounded-md border border-neutral-300 px-2 py-1 text-xs', className)} {...props} />
}

