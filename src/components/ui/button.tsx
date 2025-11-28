import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '../../lib/cn'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'outline' | 'ghost' | 'primary'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { className, variant = 'default', size = 'md', ...props },
  ref,
) {
  const base = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] transition-transform'
  const variants = {
    default: 'bg-neutral-900 text-neutral-100 hover:bg-neutral-800 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700',
    outline: 'border border-neutral-300 text-neutral-900 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800',
    ghost: 'hover:bg-neutral-100 dark:hover:bg-neutral-800',
    primary: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 dark:from-blue-600 dark:to-indigo-600 dark:hover:from-blue-500 dark:hover:to-indigo-500 shadow-sm focus:ring-blue-400',
  }
  const sizes = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
  }
  return (
    <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props} />
  )
})
