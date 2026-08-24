import { ReactNode } from 'react'
import { FiGlobe, FiMoon, FiSun } from 'react-icons/fi'
import { Button } from './ui/button'
import { RetroGrid } from './ui/retro-grid'
import { useI18n } from '../providers/I18nProvider'
import { useTheme } from '../providers/ThemeProvider'
import { navigate } from '../lib/router'

export function LegalLayout({ children, title }: { children: ReactNode; title: string }) {
  const { theme, setMode } = useTheme()
  const { toggle, lang, t } = useI18n()

  return (
    <div className="relative min-h-screen flex flex-col text-neutral-900 dark:text-neutral-100 overflow-hidden">
      <header className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md z-20">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/')}>
            {t('nav.backToApp')}
          </Button>
          <div>
            <h1 className="text-xl font-semibold">{title}</h1>
            <p className="text-sm opacity-70">Remind Me</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap justify-end">
          <button aria-label="Toggle language" className="inline-flex items-center gap-1 h-10 px-3 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-slate-800" onClick={toggle}>
            <FiGlobe />
            <span className="text-xs">{lang.toUpperCase()}</span>
          </button>
          <Button variant="ghost" aria-label="Toggle theme" title="Toggle theme" onClick={() => setMode(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <FiSun className="h-5 w-5 text-yellow-400" /> : <FiMoon className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      <main className="relative z-10 flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto p-4 md:p-8">
          <div className="p-6 md:p-10 rounded-lg border border-neutral-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm prose dark:prose-invert max-w-none">
            {children}
          </div>
        </div>
      </main>

      <footer className="relative z-20 p-4 border-t border-neutral-200 dark:border-neutral-800 text-center text-sm opacity-70 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md flex flex-wrap gap-4 justify-center items-center">
        <span>© {new Date().getFullYear()} Ryan Sutrisno / trazmedia.com</span>
        <span>•</span>
        <button onClick={() => navigate('/privacy')} className="hover:underline">{t('nav.privacy')}</button>
        <span>•</span>
        <button onClick={() => navigate('/terms')} className="hover:underline">{t('nav.terms')}</button>
      </footer>
      <RetroGrid angle={65} cellSize={60} opacity={0.25} lightLineColor="#64748b" darkLineColor="#0ea5e9" />
    </div>
  )
}
