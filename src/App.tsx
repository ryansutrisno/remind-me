import { useEffect, useState } from 'react'
import { FiGlobe, FiLogOut } from 'react-icons/fi'
import { Button } from './components/ui/button'
import { getTokenRemainingMs, hasAccessToken, initGoogleOAuth, logoutGoogle, refreshTokenSilent } from './lib/google'
import { Dashboard } from './pages/Dashboard'
import { LoginPage } from './pages/LoginPage'
import { I18nProvider, useI18n } from './providers/I18nProvider'
import { QueryProvider } from './providers/QueryProvider'
import { ThemeProvider, useTheme } from './providers/ThemeProvider'

import { FiMoon, FiSun } from 'react-icons/fi'
import { Badge } from './components/ui/badge'

function Shell({ onLogout, status }: { onLogout: () => void; status: string }) {
  const { theme, setMode } = useTheme()
  const { lang, toggle, t } = useI18n()
  return (
    <div>
      <header className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h1 className="text-xl font-semibold">{t('app.title')}</h1>
          <p className="text-sm opacity-70">{t('app.tagline')}</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap justify-end">
          {(() => {
            const v = status === 'Connected' ? 'success' : status.startsWith('Refresh') || status.startsWith('Expiring') ? 'warning' : 'error'
            return <Badge variant={v}>{status}</Badge>
          })()}
          <button aria-label="Toggle language" className="inline-flex items-center gap-1 h-10 px-3 rounded-md border border-neutral-300 dark:border-neutral-700" onClick={toggle}>
            <FiGlobe />
            <span className="text-xs">{lang.toUpperCase()}</span>
          </button>
          <Button variant="ghost" aria-label="Toggle theme" title="Toggle theme" onClick={() => setMode(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <FiSun className="h-5 w-5 text-yellow-400" /> : <FiMoon className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" title="Logout" aria-label="Logout" onClick={onLogout}><FiLogOut className="h-5 w-5 text-blue-500" /></Button>
        </div>
      </header>
    </div>
  )
}

export function App() {
  const [authed, setAuthed] = useState(hasAccessToken())
  const [status, setStatus] = useState('Not connected')
  useEffect(() => {
    try { initGoogleOAuth() } catch { }
    const t = setInterval(() => {
      const ok = hasAccessToken()
      setAuthed(ok)
      if (!ok) setStatus('Not connected')
      else {
        const left = getTokenRemainingMs()
        if (left < 60_000) setStatus('Expiring…')
        else if (left < 180_000) setStatus('Refreshing…')
        else setStatus('Connected')
      }
    }, 1000)
    const r = setInterval(async () => {
      if (hasAccessToken() && getTokenRemainingMs() < 180_000) {
        try { await refreshTokenSilent(); setStatus('Connected') } catch { }
      }
    }, 30000)
    return () => clearInterval(t)
  }, [])
  return (
    <I18nProvider>
      <ThemeProvider>
        <QueryProvider>
          <div className="min-h-screen text-neutral-900 dark:text-neutral-100">
            {authed ? (
              <>
                <Shell onLogout={() => { logoutGoogle(); setAuthed(false); setStatus('Not connected') }} status={status} />
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
