import { forwardRef, InputHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input(
  { className, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cn(
        'flex h-10 w-full rounded-md border border-input bg-white dark:bg-neutral-800 px-3 py-2 text-sm ring-offset-background',
        'placeholder:text-neutral-500 dark:placeholder:text-neutral-400',
        'focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
})
