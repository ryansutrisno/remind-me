import { useEffect, useRef } from 'react'
import { Button } from './ui/button'
import { FiBold, FiItalic, FiUnderline, FiLink, FiList } from 'react-icons/fi'

type Props = {
  value: string
  onChange: (html: string) => void
}

export function RichTextEditor({ value, onChange }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== value) ref.current.innerHTML = value || ''
  }, [value])

  const cmd = (name: string, arg?: string) => {
    document.execCommand(name, false, arg)
    if (ref.current) onChange(ref.current.innerHTML)
  }

  return (
    <div className="rounded-md border border-neutral-300 dark:border-slate-700">
      <div className="flex gap-1 p-2 border-b border-neutral-200 dark:border-slate-700">
        <Button variant="ghost" size="sm" title="Bold" aria-label="Bold" onClick={() => cmd('bold')}><FiBold /></Button>
        <Button variant="ghost" size="sm" title="Italic" aria-label="Italic" onClick={() => cmd('italic')}><FiItalic /></Button>
        <Button variant="ghost" size="sm" title="Underline" aria-label="Underline" onClick={() => cmd('underline')}><FiUnderline /></Button>
        <Button variant="ghost" size="sm" title="Bullet list" aria-label="Bullet list" onClick={() => cmd('insertUnorderedList')}><FiList /></Button>
        <Button variant="ghost" size="sm" title="Link" aria-label="Link" onClick={() => { const url = prompt('Link URL'); if (url) cmd('createLink', url) }}><FiLink /></Button>
      </div>
      <div
        ref={ref}
        contentEditable
        className="min-h-[120px] p-3 bg-white dark:bg-slate-800 text-neutral-900 dark:text-neutral-100 outline-none"
        onInput={() => { if (ref.current) onChange(ref.current.innerHTML) }}
      />
    </div>
  )
}
