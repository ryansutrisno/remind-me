import { ReactNode } from 'react'
import { Switch } from './switch'

type Props = {
  checked: boolean
  onToggle: () => void
  label: ReactNode
}

export function Toggle({ checked, onToggle, label }: Props) {
  return (
    <div role="button" tabIndex={0} onClick={onToggle} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onToggle() }} className="inline-flex items-center gap-2 select-none">
      <Switch checked={checked} />
      <span className="text-xs leading-none max-w-[160px] truncate">{label}</span>
    </div>
  )
}
