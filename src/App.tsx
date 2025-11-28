import { useState } from 'react'
import { QueryProvider } from './providers/QueryProvider'
import { ThemeProvider, useTheme } from './providers/ThemeProvider'
import { LoginPage } from './pages/LoginPage'
import { hasAccessToken } from './lib/google'
import { Dashboard } from './pages/Dashboard'
import { I18nProvider, useI18n } from './providers/I18nProvider'
import { Select } from './components/ui/select'
import { FiGlobe } from 'react-icons/fi'

function Shell() {
  const { mode, setMode } = useTheme()
  const { lang, toggle, t } = useI18n()
  return (
    <div>
      <header className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h1 className="text-xl font-semibold">{t('app.title')}</h1>
          <p className="text-sm opacity-70">{t('app.tagline')}</p>
        </div>
        <div className="flex items-center gap-2">
          <button aria-label="Toggle language" className="inline-flex items-center gap-1 h-10 px-3 rounded-md border border-neutral-300 dark:border-neutral-700" onClick={toggle}>
            <FiGlobe />
            <span className="text-xs">{lang.toUpperCase()}</span>
          </button>
          <Select value={mode} onChange={e => setMode(e.target.value as any)}>
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </Select>
        </div>
      </header>
    </div>
  )
}

export function App() {
  const [authed, setAuthed] = useState(hasAccessToken())
  useState(() => {
    const t = setInterval(() => setAuthed(hasAccessToken()), 500)
    return () => clearInterval(t)
  })
  return (
    <I18nProvider>
      <ThemeProvider>
        <QueryProvider>
          <div className="min-h-screen text-neutral-900 dark:text-neutral-100">
            {authed ? (
              <>
                <Shell />
                <div className="p-4"><Dashboard /></div>
              </>
            ) : (
              <LoginPage />
            )}
          </div>
        </QueryProvider>
      </ThemeProvider>
    </I18nProvider>
  )
}
