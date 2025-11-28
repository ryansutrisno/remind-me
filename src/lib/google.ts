type TokenInfo = { accessToken: string; expiresAt: number }
let tokenInfo: TokenInfo | null = null

const SCOPES = [
  'https://www.googleapis.com/auth/calendar.readonly',
  'https://www.googleapis.com/auth/calendar.events',
].join(' ')

declare global {
  interface Window {
    google: any
  }
}

function getClientId(): string {
  const id = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined
  if (!id) throw new Error('VITE_GOOGLE_CLIENT_ID belum dikonfigurasi')
  return id
}

let tokenClient: any

export function initGoogleOAuth() {
  if (tokenClient) return tokenClient
  if (!window.google?.accounts?.oauth2) throw new Error('Google Identity Services belum tersedia')
  tokenClient = window.google.accounts.oauth2.initTokenClient({
    client_id: getClientId(),
    scope: SCOPES,
    prompt: 'consent',
    callback: (resp: any) => {
      if (resp.error) {
        console.error('OAuth error', resp)
        return
      }
      const expiresIn = 3600 // detik (biasanya 1 jam)
      tokenInfo = { accessToken: resp.access_token, expiresAt: Date.now() + expiresIn * 1000 - 30_000 }
    },
  })
  return tokenClient
}

export async function getAccessToken(opts?: { prompt?: '' | 'consent' }) {
  initGoogleOAuth()
  if (tokenInfo && tokenInfo.expiresAt > Date.now()) return tokenInfo.accessToken
  await new Promise<void>((resolve, reject) => {
    try {
      tokenClient.requestAccessToken({ prompt: opts?.prompt ?? 'consent' })
      const check = setInterval(() => {
        if (tokenInfo?.accessToken) {
          clearInterval(check)
          resolve()
        }
      }, 50)
      setTimeout(() => {
        clearInterval(check)
        reject(new Error('Gagal memperoleh access token'))
      }, 10_000)
    } catch (e) {
      reject(e)
    }
  })
  return tokenInfo!.accessToken
}

export async function googleFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const token = await getAccessToken({ prompt: '' })
  const res = await fetch(url, {
    ...init,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Google API error ${res.status}: ${text}`)
  }
  return res.json() as Promise<T>
}

export function logoutGoogle() {
  tokenInfo = null
}

export function hasAccessToken() {
  return !!(tokenInfo && tokenInfo.expiresAt > Date.now())
}
