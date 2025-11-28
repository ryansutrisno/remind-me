import { ReactNode } from 'react'
import { cn } from '../../lib/cn'

type Props = {
  open: boolean
  onClose: () => void
  title?: ReactNode
  children?: ReactNode
}
export function Dialog({ open, onClose, title, children }: Props) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className={cn('relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900')}> 
        {title ? <div className="mb-3 text-lg font-semibold">{title}</div> : null}
        <div>{children}</div>
      </div>
    </div>
  )
}
