import { useEffect, useState } from 'react'

export function navigate(path: string) {
  window.history.pushState({}, '', path)
  const navEvent = new PopStateEvent('popstate')
  window.dispatchEvent(navEvent)
}

export function usePathRoute() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener('popstate', onLocationChange)
    return () => window.removeEventListener('popstate', onLocationChange)
  }, [])

  return currentPath
}
