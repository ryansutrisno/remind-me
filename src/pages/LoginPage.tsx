import { FiGlobe, FiMoon, FiSun } from 'react-icons/fi'
import { Button } from '../components/ui/button'
import { RetroGrid } from '../components/ui/retro-grid'
import { getAccessToken, initGoogleOAuth } from '../lib/google'
import { useI18n } from '../providers/I18nProvider'
import { useTheme } from '../providers/ThemeProvider'

export function LoginPage() {
  const { theme, setMode } = useTheme()
  const { t, toggle, lang } = useI18n()
  return (
    <div className="relative min-h-screen flex flex-col text-neutral-900 dark:text-neutral-100 overflow-hidden">
      <header className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h1 className="text-xl font-semibold">{t('app.title')}</h1>
          <p className="text-sm opacity-70">{t('app.tagline')}</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap justify-end">
          <button aria-label="Toggle language" className="inline-flex items-center gap-1 h-10 px-3 rounded-md border border-neutral-300 dark:border-neutral-700" onClick={toggle}>
            <FiGlobe />
            <span className="text-xs">{lang.toUpperCase()}</span>
          </button>
          <Button variant="ghost" aria-label="Toggle theme" title="Toggle theme" onClick={() => setMode(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <FiSun className="h-5 w-5 text-yellow-400" /> : <FiMoon className="h-5 w-5" />}
          </Button>
        </div>
      </header>
      <main className="relative z-10 flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full p-6 rounded-lg border border-neutral-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">{t('login.title')}</h2>
          <p className="text-sm opacity-80 mb-4">{t('login.desc')}</p>
          <Button variant="primary" className="w-full" onClick={async () => { initGoogleOAuth(); await getAccessToken({ prompt: 'consent' }) }}>{t('login.button')}</Button>
        </div>
      </main>
      <footer className="p-4 text-center text-xs opacity-70">
        <a href="https://ryansutrisno.com" target="_blank" rel="noreferrer" className="underline">Made with ❤️ by Ryan Sutrisno</a>
      </footer>
      <RetroGrid angle={65} cellSize={60} opacity={0.25} lightLineColor="#64748b" darkLineColor="#0ea5e9" />
    </div>
  )
}
