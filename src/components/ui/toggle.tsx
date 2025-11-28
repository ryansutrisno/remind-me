import { ReactNode } from 'react'
import { Switch } from './switch'

type Props = {
  checked: boolean
  onToggle: () => void
  label: ReactNode
}

export function Toggle({ checked, onToggle, label }: Props) {
  return (
    <button type="button" onClick={onToggle} className="inline-flex items-center gap-2 select-none">
      <Switch checked={checked} />
      <span className="text-xs whitespace-nowrap leading-none">{label}</span>
    </button>
  )
}

