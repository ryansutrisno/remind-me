import { ReactNode, useEffect, useState } from 'react'
import { hasAccessToken, initGoogleOAuth } from '../../lib/google'

export function AuthGate({ children, onRequireLogin }: { children: ReactNode; onRequireLogin: () => void }) {
  const [authed, setAuthed] = useState(hasAccessToken())
  useEffect(() => {
    try { initGoogleOAuth() } catch {}
    const id = setInterval(() => setAuthed(hasAccessToken()), 500)
    return () => clearInterval(id)
  }, [])
  if (!authed) {
    onRequireLogin()
    return null
  }
  return <>{children}</>
}

