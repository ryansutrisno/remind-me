# Remind Me — Aplikasi Pengingat Terintegrasi Google Calendar

Aplikasi pembungkus untuk melisting dan mengelola pengingat berbasis Google Calendar. Dibangun dengan React + TypeScript (Vite), Tailwind CSS, komponen gaya shadcn-ui, dukungan mode gelap/terang berbasis sistem, dan i18n (English + Bahasa Indonesia).

## Fitur Utama
- Login dengan Google (Google Identity Services, OAuth 2.0) langsung di browser.
- Menampilkan daftar event/pengingat dari Google Calendar dalam rentang waktu yang dipilih.
- Form tambah/ubah pengingat dengan field yang setara Google Calendar (summary, description, start/end, all-day, location, color, visibility, transparency, attendees, recurrence RRULE, reminders).
- Hapus event dengan konfirmasi.
- Filter “Reminders only” untuk menampilkan hanya event yang memiliki pengingat.
- Opsi menyembunyikan kalender “Birthdays” agar hasil lebih relevan.
- Responsif mobile, aksesibilitas dasar, loading skeleton, empty state, dan error handling yang informatif.
- Mode tema: System, Light, Dark (default mengikuti sistem pengguna).
- I18n: English (default) dan Bahasa Indonesia dengan toggle ikon.

## Teknologi
- `React`, `TypeScript`, `Vite`
- `Tailwind CSS`, komponen UI ala shadcn (custom minimal)
- `@tanstack/react-query` untuk fetching/caching
- `date-fns` untuk format tanggal
- `react-icons` untuk ikon globe

## Persiapan Google Cloud Console
1. Aktifkan Google Calendar API di project Cloud.
2. Buat OAuth Client ID bertipe `Web application`.
3. Tambahkan `Authorized JavaScript origins` untuk pengembangan: `http://localhost:5174/`.
4. Scope yang digunakan:
   - `https://www.googleapis.com/auth/calendar.readonly`
   - `https://www.googleapis.com/auth/calendar.events`
5. Pada OAuth Consent Screen:
   - Set “User Type” ke External.
   - Tambahkan akun kamu di “Test users” jika belum publish.

## Konfigurasi Lingkungan
Buat file `.env` atau `.env.local` di root proyek:

```
VITE_GOOGLE_CLIENT_ID=<CLIENT_ID_DARI_GOOGLE_CLOUD>
```

## Menjalankan Secara Lokal
- Instal dependensi: `npm install`
- Jalankan dev server: `npm run dev`
- Buka: `http://localhost:5174/`

Catatan: Port dev default diatur ke `5174` dan menggunakan `strictPort: true` untuk menghindari bentrok.

## Struktur Berkas Penting
- `src/lib/google.ts` — inisialisasi OAuth, memperoleh token, dan wrapper `googleFetch`.
- `src/features/calendar/api.ts` — pemanggilan REST API Calendar (list calendars, list events, create, update, delete).
- `src/features/calendar/hooks.ts` — hooks React Query untuk data kalender/events dan mutasi.
- `src/pages/LoginPage.tsx` — halaman login (judul, tagline, toggle bahasa, dropdown tema, footer credit).
- `src/pages/Dashboard.tsx` — daftar pengingat, filter, aksi CRUD, dialog form.
- `src/components/ReminderForm.tsx` — form dengan field setara Google Calendar.
- `src/providers/ThemeProvider.tsx` — mode `system | light | dark` dengan persist.
- `src/providers/I18nProvider.tsx` — i18n minimal untuk en/id.

## Integrasi API Calendar
- List calendars: `GET /calendar/v3/users/me/calendarList`
- List events: `GET /calendar/v3/calendars/{calendarId}/events?singleEvents=true&orderBy=startTime&timeMin=...&timeMax=...`
- Create event: `POST /calendar/v3/calendars/{calendarId}/events`
- Update event: `PATCH /calendar/v3/calendars/{calendarId}/events/{eventId}`
- Delete event: `DELETE /calendar/v3/calendars/{calendarId}/events/{eventId}`

Pemetaan field form ↔ Google Calendar:
- Judul → `summary`
- Deskripsi → `description`
- Lokasi → `location`
- Waktu mulai/selesai → `start.dateTime` / `end.dateTime` atau `start.date` / `end.date` (all-day)
- Zona waktu → `start.timeZone` / `end.timeZone` (opsional)
- Warna → `colorId`
- Visibilitas → `visibility` (`default` | `public` | `private` | `confidential`)
- Transparansi → `transparency` (`opaque` | `transparent`)
- Tamu → `attendees[].email`
- Recurrence → `recurrence[]` (RRULE, misal `RRULE:FREQ=DAILY;COUNT=10`)
- Reminders → `reminders.useDefault` atau `reminders.overrides[]` ({ method: `popup` | `email`, minutes: number })

## UX dan Responsivitas
- Layout dashboard menggunakan grid responsif (1→2 kolom), tombol full-width di mobile.
- Dialog form memiliki `max-height` dan `overflow-y-auto` untuk mencegah overlap.
- Toggle disederhanakan dengan komponen `Toggle` agar label tidak shifting saat diklik.

## Keamanan
- Token OAuth hanya disimpan di memory (opsional persist minimal). Jangan commit secret.
- Jangan log data sensitif. Gunakan scope minimal yang diperlukan.

## Troubleshooting
- 401/403 (Unauthorized/Forbidden):
  - Pastikan client ID benar, origin `http://localhost:5174/` sudah terdaftar, consent screen dan test users sudah diatur, scope sesuai.
  - Re-consent: klik “Sign in with Google” ulang.
- Hasil penuh “Happy birthday!”:
  - Atur rentang waktu (default: sekarang hingga +30 hari).
  - Aktifkan “Reminders only” dan “Hide Birthdays calendar”.

## Catatan
- Beberapa akun memigrasikan “Reminders” ke “Google Tasks”; aplikasi ini memanfaatkan `events + reminders` di Calendar untuk menandai pengingat.

## Kredit
Made with ❤️ by Ryan Sutrisno — https://ryansutrisno.com

