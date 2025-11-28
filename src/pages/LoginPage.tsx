import { Button } from '../components/ui/button'
import { getAccessToken, initGoogleOAuth } from '../lib/google'
import { useTheme } from '../providers/ThemeProvider'
import { Select } from '../components/ui/select'
import { useI18n } from '../providers/I18nProvider'
import { FiGlobe } from 'react-icons/fi'

export function LoginPage() {
  const { mode, setMode } = useTheme()
  const { t, toggle, lang } = useI18n()
  return (
    <div className="min-h-screen flex flex-col text-neutral-900 dark:text-neutral-100">
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
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full p-6 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
          <h2 className="text-lg font-semibold mb-2">{t('login.title')}</h2>
          <p className="text-sm opacity-80 mb-4">{t('login.desc')}</p>
          <Button className="w-full" onClick={async () => { initGoogleOAuth(); await getAccessToken({ prompt: 'consent' }) }}>{t('login.button')}</Button>
        </div>
      </main>
      <footer className="p-4 text-center text-xs opacity-70">
        <a href="https://ryansutrisno.com" target="_blank" rel="noreferrer" className="underline">Made with ❤️ by Ryan Sutrisno</a>
      </footer>
    </div>
  )
}
