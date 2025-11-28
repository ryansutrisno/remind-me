type TokenInfo = {accessToken: string; expiresAt: number};
let tokenInfo: TokenInfo | null = null;
const STORAGE_KEY = 'oauth_token_info';

const SCOPES = [
  'https://www.googleapis.com/auth/calendar.readonly',
  'https://www.googleapis.com/auth/calendar.events',
].join(' ');

declare global {
  interface Window {
    google: any;
  }
}

function getClientId(): string {
  const id = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;
  if (!id) throw new Error('VITE_GOOGLE_CLIENT_ID belum dikonfigurasi');
  return id;
}

let tokenClient: any;

export function initGoogleOAuth() {
  if (tokenClient) return tokenClient;
  if (!window.google?.accounts?.oauth2)
    throw new Error('Google Identity Services belum tersedia');
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored) as TokenInfo;
      if (parsed?.expiresAt && parsed.expiresAt > Date.now())
        tokenInfo = parsed;
    } catch {}
  }
  tokenClient = window.google.accounts.oauth2.initTokenClient({
    client_id: getClientId(),
    scope: SCOPES,
    prompt: 'consent',
    callback: (resp: any) => {
      if (resp.error) {
        console.error('OAuth error', resp);
        return;
      }
      const expiresIn = resp.expires_in ?? 3600;
      tokenInfo = {
        accessToken: resp.access_token,
        expiresAt: Date.now() + expiresIn * 1000 - 30_000,
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tokenInfo));
      } catch {}
    },
  });
  return tokenClient;
}

export async function getAccessToken(opts?: {prompt?: '' | 'consent'}) {
  initGoogleOAuth();
  if (tokenInfo && tokenInfo.expiresAt > Date.now())
    return tokenInfo.accessToken;
  const tryGet = (prompt: '' | 'consent') =>
    new Promise<void>((resolve, reject) => {
      try {
        tokenClient.requestAccessToken({prompt});
        const check = setInterval(() => {
          if (tokenInfo?.accessToken) {
            clearInterval(check);
            resolve();
          }
        }, 50);
        setTimeout(() => {
          clearInterval(check);
          reject(new Error('Gagal memperoleh access token'));
        }, 8_000);
      } catch (e) {
        reject(e);
      }
    });
  try {
    await tryGet(opts?.prompt ?? '');
  } catch {
    await tryGet('consent');
  }
  return tokenInfo!.accessToken;
}

export async function googleFetch<T>(
  url: string,
  init?: RequestInit
): Promise<T> {
  const token = await getAccessToken({prompt: ''});
  const res = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Google API error ${res.status}: ${text}`);
  }
  return res.json() as Promise<T>;
}

export function logoutGoogle() {
  tokenInfo = null;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}

export function hasAccessToken() {
  return !!(tokenInfo && tokenInfo.expiresAt > Date.now());
}

export function getTokenRemainingMs() {
  if (!tokenInfo) return 0;
  return Math.max(0, tokenInfo.expiresAt - Date.now());
}

export async function refreshTokenSilent() {
  if (!tokenInfo) {
    return getAccessToken({prompt: 'consent'});
  }
  try {
    await getAccessToken({prompt: ''});
  } catch {
    await getAccessToken({prompt: 'consent'});
  }
}
