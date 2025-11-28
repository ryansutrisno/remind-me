import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'

type Lang = 'en' | 'id'
type Dict = Record<string, Record<Lang, string>>

const dict: Dict = {
  'app.title': { en: 'Remind Me', id: 'Remind Me' },
  'app.tagline': { en: 'Wrapper for reminders integrated with Google Calendar', id: 'Aplikasi pembungkus pengingat terintegrasi Google Calendar' },

  'login.title': { en: 'Sign in with Google', id: 'Masuk dengan Google' },
  'login.desc': { en: 'Remind Me helps list and manage reminders directly from your Google Calendar. Please sign in to allow reading and creating reminder events.', id: 'Remind Me membantu kamu melisting dan mengelola pengingat langsung dari Google Calendar kamu. Silakan login untuk mengizinkan akses membaca dan membuat event pengingat.' },
  'login.button': { en: 'Sign in with Google', id: 'Masuk dengan Google' },

  'dashboard.calendar': { en: 'Calendar', id: 'Kalender' },
  'dashboard.startFrom': { en: 'Start from', id: 'Mulai dari' },
  'dashboard.until': { en: 'Until', id: 'Sampai' },
  'dashboard.addReminder': { en: 'Add Reminder', id: 'Tambah Pengingat' },
  'dashboard.empty': { en: 'No events in this range.', id: 'Belum ada event pada rentang ini.' },
  'dashboard.error.calendars': { en: 'Failed to load calendars.', id: 'Gagal memuat daftar kalender.' },
  'dashboard.error.events': { en: 'Failed to load events.', id: 'Terjadi kesalahan memuat events.' },
  'filters.remindersOnly': { en: 'Reminders only', id: 'Hanya pengingat' },
  'filters.allEvents': { en: 'All events', id: 'Semua event' },
  'filters.birthdays.hide': { en: 'Hide Birthdays calendar', id: 'Sembunyikan kalender Ulang Tahun' },
  'filters.birthdays.show': { en: 'Show Birthdays calendar', id: 'Tampilkan kalender Ulang Tahun' },
  'filters.birthdays.excluded': { en: 'Birthdays calendar excluded by filter.', id: 'Kalender Ulang Tahun dikecualikan oleh filter.' },

  'event.reminded': { en: 'Reminded', id: 'Diingatkan' },
  'event.noReminder': { en: 'No reminder', id: 'Tanpa pengingat' },
  'event.noDescription': { en: '(No description)', id: '(Tidak ada deskripsi)' },
  'action.edit': { en: 'Edit', id: 'Ubah' },
  'action.delete': { en: 'Delete', id: 'Hapus' },
  'action.confirmDelete': { en: 'Delete this event?', id: 'Hapus event ini?' },

  'dialog.addTitle': { en: 'Add Reminder', id: 'Tambah Pengingat' },
  'dialog.editTitle': { en: 'Edit Reminder', id: 'Ubah Pengingat' },

  'form.summary': { en: 'Title', id: 'Judul' },
  'form.description': { en: 'Description', id: 'Deskripsi' },
  'form.location': { en: 'Location', id: 'Lokasi' },
  'form.start': { en: 'Start', id: 'Mulai' },
  'form.end': { en: 'End', id: 'Selesai' },
  'form.allDay': { en: 'All-day', id: 'Sepanjang hari' },
  'form.visibility': { en: 'Visibility', id: 'Visibilitas' },
  'form.transparency': { en: 'Transparency', id: 'Transparansi' },
  'form.colorId': { en: 'Color (colorId)', id: 'Warna (colorId)' },
  'form.attendees': { en: 'Guests (emails, comma-separated)', id: 'Tamu (email, pisahkan koma)' },
  'form.reminderMethod': { en: 'Reminder method', id: 'Metode pengingat' },
  'form.reminderMinutes': { en: 'Minutes before', id: 'Menit sebelum' },
  'form.rrule': { en: 'Recurrence (RRULE)', id: 'Recurrence (RRULE)' },
  'form.cancel': { en: 'Cancel', id: 'Batal' },
  'form.save': { en: 'Save', id: 'Simpan' },
}

type Ctx = {
  lang: Lang
  setLang: (l: Lang) => void
  toggle: () => void
  t: (key: keyof typeof dict) => string
}
const I18nCtx = createContext<Ctx | null>(null)

function getInitialLang(): Lang {
  const stored = localStorage.getItem('lang') as Lang | null
  if (stored === 'en' || stored === 'id') return stored
  return 'en'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => getInitialLang())
  useEffect(() => { localStorage.setItem('lang', lang) }, [lang])
  const value = useMemo<Ctx>(() => ({
    lang,
    setLang,
    toggle: () => setLang(lang === 'en' ? 'id' : 'en'),
    t: (key) => dict[key][lang],
  }), [lang])
  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nCtx)
  if (!ctx) throw new Error('I18nProvider missing')
  return ctx
}
