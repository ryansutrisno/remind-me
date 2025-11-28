import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'

type Theme = 'light' | 'dark'
type Mode = 'system' | Theme
type Ctx = { theme: Theme; mode: Mode; setMode: (m: Mode) => void }
const ThemeCtx = createContext<Ctx | null>(null)

function getInitialMode(): Mode {
  const stored = localStorage.getItem('themeMode') as Mode | null
  if (stored === 'light' || stored === 'dark' || stored === 'system') return stored
  return 'system'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>(() => getInitialMode())
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const apply = () => {
      const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
      const effective = mode === 'system' ? (prefersDark ? 'dark' : 'light') : mode
      setTheme(effective)
      const root = document.documentElement
      if (effective === 'dark') root.classList.add('dark')
      else root.classList.remove('dark')
    }
    localStorage.setItem('themeMode', mode)
    apply()
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)')
    const listener = () => mode === 'system' && apply()
    mq?.addEventListener('change', listener)
    return () => mq?.removeEventListener('change', listener)
  }, [mode])

  const value = useMemo<Ctx>(() => ({ theme, mode, setMode }), [theme, mode])
  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeCtx)
  if (!ctx) throw new Error('ThemeProvider missing')
  return ctx
}
