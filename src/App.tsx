import { useEffect, useState } from 'react'
import { FiGlobe, FiLogOut } from 'react-icons/fi'
import { getTokenRemainingMs, hasAccessToken, initGoogleOAuth, logoutGoogle, refreshTokenSilent } from './lib/google'
import { Dashboard } from './pages/Dashboard'
import { LoginPage } from './pages/LoginPage'
import { I18nProvider, useI18n } from './providers/I18nProvider'
import { QueryProvider } from './providers/QueryProvider'
import { ThemeProvider, useTheme } from './providers/ThemeProvider'

import { FiMoon, FiSun } from 'react-icons/fi'
import { Badge } from './components/ui/badge'
import { useCalendars } from './features/calendar/hooks'
import { getUserInfo } from './lib/google'

function Shell({ onLogout, status }: { onLogout: () => void; status: string }) {
  const { theme, setMode } = useTheme()
  const { lang, toggle, t } = useI18n()
  const { data: calendars } = useCalendars()
  const primary = calendars?.find(c => c.primary) || calendars?.[0]
  const [userEmail, setUserEmail] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  useEffect(() => { (async () => { try { const u = await getUserInfo(); setUserEmail(u.email || primary?.summary || ''); setAvatarUrl(u.picture || '') } catch { } })() }, [primary?.summary])
  const email = userEmail || primary?.summary || 'Account'
  const initial = email?.charAt(0).toUpperCase()
  const [open, setOpen] = useState(false)
  return (
    <div>
      <header className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
        <div>
          <h1 className="text-xl font-semibold">{t('app.title')}</h1>
          <p className="text-sm opacity-70">{t('app.tagline')}</p>
        </div>
        <div className="relative flex items-center gap-2 flex-wrap justify-end">
          {(() => {
            const v = status === 'Connected' ? 'success' : status.startsWith('Refresh') || status.startsWith('Expiring') ? 'warning' : 'error'
            return <Badge variant={v}>{status}</Badge>
          })()}
          <button aria-label="Account menu" title="Account menu" className="flex items-center justify-center p-0 h-10 w-10" onClick={() => setOpen(o => !o)}>
            {avatarUrl ? (
              <img src={avatarUrl} alt="avatar" className="h-8 w-8 rounded-full object-cover" />
            ) : (
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-sm shadow ring-1 ring-blue-400/40">{initial}</span>
            )}
          </button>
          {open && (
            <div className="absolute right-0 top-12 z-50 w-56 rounded-md border border-neutral-200 bg-white p-2 shadow-md dark:border-slate-700 dark:bg-slate-800">
              <div className="mb-2">
                <div className="text-xs opacity-70">Account</div>
                <Badge variant="info" className="mt-1 w-full justify-center">{email}</Badge>
              </div>
              <button className="flex w-full items-center justify-between py-2 px-2 rounded-md hover:bg-neutral-100 dark:hover:bg-slate-700" onClick={(e) => { e.stopPropagation(); toggle() }}>
                <span className="text-sm">Language</span>
                <span className="inline-flex items-center gap-1 text-xs"><FiGlobe /> {lang.toUpperCase()}</span>
              </button>
              <button className="flex w-full items-center justify-between py-2 px-2 rounded-md hover:bg-neutral-100 dark:hover:bg-slate-700" onClick={(e) => { e.stopPropagation(); setMode(theme === 'dark' ? 'light' : 'dark') }}>
                <span className="text-sm">Theme</span>
                <span className="inline-flex items-center">{theme === 'dark' ? <FiSun className="h-5 w-5 text-yellow-400" /> : <FiMoon className="h-5 w-5" />}</span>
              </button>
              <button className="flex w-full items-center justify-between py-2 px-2 rounded-md hover:bg-neutral-100 dark:hover:bg-slate-700" onClick={(e) => { e.stopPropagation(); onLogout() }}>
                <span className="text-sm">Logout</span>
                <FiLogOut className="h-5 w-5 text-blue-500" />
              </button>
            </div>
          )}
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
