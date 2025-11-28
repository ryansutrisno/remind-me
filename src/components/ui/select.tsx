import { SelectHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn('h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring', className)} {...props} />
  )
}

