## Tujuan Produk
- Aplikasi pembungkus yang menampilkan dan mengelola pengingat berbasis Google Calendar (events + reminders). 
- Login dengan Google, daftar pengingat responsif, mode gelap, dan form yang memetakan field Google Calendar secara konsisten.

## Arsitektur & Teknologi
- Frontend: React + TypeScript di `Vite`.
- Styling: Tailwind CSS + shadcn-ui untuk komponen.
- Ikon: `react-icons`.
- State & Data: `@tanstack/react-query` untuk fetching/caching, `date-fns` untuk waktu/tanggal.
- Autentikasi: Google Identity Services (OAuth 2.0) di browser (SPA) + akses langsung REST `https://www.googleapis.com/calendar/v3` dengan Bearer token.
- Konfigurasi: env `VITE_GOOGLE_CLIENT_ID` untuk OAuth (tanpa backend).

## Persiapan Google Cloud Console
1. Buat OAuth Client ID tipe `Web`. Tambahkan `Authorized JavaScript origins` sesuai pengembangan (mis. `http://localhost:5173`).
2. Scope minimal:
   - `https://www.googleapis.com/auth/calendar.readonly` (list, detail)
   - `https://www.googleapis.com/auth/calendar.events` (buat/ubah/hapus)
3. Catat `Client ID` → simpan sebagai `VITE_GOOGLE_CLIENT_ID`.

## Alur Autentikasi (GIS)
- Inisialisasi `google.accounts.oauth2.initTokenClient` dengan scopes di atas.
- `Sign in` memicu consent, menerima `access_token`.
- Simpan token di memory (opsional `localStorage` + expiry untuk UX). 
- Refresh token: panggil `tokenClient.requestAccessToken({ prompt: '' })` saat hampir kedaluwarsa (silent jika sudah diberi grant).
- Logout: hapus token dari penyimpanan lokal, reset state.

## Integrasi API Calendar
- List events (pengingat): `GET /calendar/v3/calendars/{calendarId}/events?singleEvents=true&orderBy=startTime&timeMin=...&timeMax=...`.
- Detail event: `GET /events/{eventId}`.
- Buat event: `POST /events`.
- Ubah event: `PATCH /events/{eventId}`.
- Hapus event: `DELETE /events/{eventId}`.
- Filter/pengayaan pengingat: gunakan `event.reminders` (`useDefault` atau `overrides`) untuk menandai notifikasi (popup/email) dan tampilkan badge “Diingatkan”.

## Pemetaan Field Form ↔ Google Calendar
- Judul: `summary`.
- Deskripsi: `description`.
- Lokasi: `location`.
- Waktu mulai/selesai: `start.dateTime` / `end.dateTime` (atau `start.date`/`end.date` untuk all-day).
- Zona waktu: `start.timeZone` / `end.timeZone` (default dari kalender jika kosong).
- Warna: `colorId`.
- Visibilitas: `visibility` (`default` | `public` | `private` | `confidential`).
- Transparansi: `transparency` (`opaque` | `transparent`).
- Tamu: `attendees[].email` (opsional).
- Recurrence: `recurrence[]` (RRULE; misal `RRULE:FREQ=DAILY;COUNT=10`).
- Reminders: `reminders.useDefault` atau `reminders.overrides[]` (item: `{ method: 'popup'|'email', minutes: number }`).
- Properti tambahan: `extendedProperties.private/public` jika perlu metadata khusus.

## Halaman & Komponen
- `AuthGate` + `LoginPage`: tombol Google Sign-In.
- `Dashboard`: 
  - Header: selector kalender, rentang waktu, pencarian, toggle mode gelap.
  - Daftar pengingat/events: Card/List (shadcn `card`, `badge`, `avatar` untuk attendees).
  - Aksi cepat: tambah, edit, hapus (dialog/modal).
- `ReminderFormModal` (Dialog): form lengkap (field di atas) + validasi.
- `Settings`: preferensi UI (tema), default calendar, default reminder minutes.

## UX & Responsivitas
- Mobile-first, grid/list adaptif (`sm`, `md`, `lg`).
- Mode gelap Tailwind `dark` dengan toggler class (persist di `localStorage`).
- Aksesibilitas: fokus ring, warna kontras, ARIA untuk dialog/form.

## State & Pengambilan Data
- React Query:
  - `useCalendars()` → list kalender pengguna.
  - `useEvents(calendarId, filters)` → daftar events.
  - Mutasi: `useCreateEvent`, `useUpdateEvent`, `useDeleteEvent` (optimistic update + rollback).
- Serialisasi tanggal dengan `date-fns` dan time zone aman.

## Validasi & Error Handling
- Validasi form dengan `zod` (opsional) + UI feedback shadcn (`toast`/`alert`).
- Tangani error OAuth (consent ditutup, scope kurang), 401/403 (token invalid), 429 (rate limit) dengan retry/backoff ringan.
- Empty states: tidak ada pengingat, belum login.

## Dependensi yang Akan Dipasang
- `react`, `react-dom`, `vite`, `typescript`.
- `tailwindcss`, `postcss`, `autoprefixer`.
- `@tanstack/react-query`, `date-fns`, `zod` (opsional).
- `react-icons`, `lucide-react` (opsional bila perlu icon tambahan shadcn).
- `shadcn-ui` (CLI) untuk generate komponen.

## Struktur Direktori (Rencana)
- `src/`:
  - `main.tsx`, `App.tsx`, `routes/` (router optional), `components/` (UI), `features/calendar/` (hooks + API), `providers/` (ThemeProvider, QueryClientProvider), `lib/google.ts` (GIS init + fetch wrapper), `types/google.ts` (subset tipe Event/Calendar).

## Keamanan & Privasi
- Tidak menyimpan token server-side; hanya di client (opsional persisted, dienkripsi atau minimal dengan expiry check).
- Jangan log token/PII. Hindari menempatkan secret di repo.

## Langkah Implementasi
1. Inisialisasi proyek Vite (React TS) dan setup Tailwind.
2. Integrasi shadcn-ui, generate komponen inti (Button, Card, Dialog, Input, Select, Switch, Badge, Toast).
3. Pasang React Query + Theme Provider + Dark mode.
4. Implement `google.ts`: init Token Client, helpers `fetchGoogle(url, token)`.
5. Hooks data: calendars/events + mutasi.
6. Halaman `Login` + guard.
7. `Dashboard` dengan filter & list + Form modal create/edit.
8. Fitur hapus event + konfirmasi.
9. Penyempurnaan UX: skeleton/loading, empty state, error boundary.
10. Uji manual (desktop/mobile) + polishing.

## Catatan Penting
- Google telah memigrasikan “Reminders” ke “Tasks” untuk sebagian pengguna; API Calendar tetap berbasis `events`. Aplikasi ini akan memakai `events + reminders` (popup/email) untuk menandai pengingat sebagaimana di Calendar.

## Hasil yang Diharapkan
- Aplikasi SPA responsif dengan login Google, listing pengingat, form dengan field yang ekuivalen Google Calendar, dukungan gelap/terang, dan aksi CRUD terhadap events pada kalender yang dipilih.

Silakan konfirmasi, Mas Bro. Begitu disetujui, aku langsung mulai nyusun proyeknya dan integrasinya dengan penuh semangat 😊