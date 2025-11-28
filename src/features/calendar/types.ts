export type CalendarListEntry = {
  id: string
  summary: string
  primary?: boolean
}

export type EventReminder = { method: 'email' | 'popup'; minutes: number }
export type EventAttendee = { email: string }

export type CalendarEvent = {
  id?: string
  summary: string
  description?: string
  location?: string
  colorId?: string
  visibility?: 'default' | 'public' | 'private' | 'confidential'
  transparency?: 'opaque' | 'transparent'
  start: { dateTime?: string; date?: string; timeZone?: string }
  end: { dateTime?: string; date?: string; timeZone?: string }
  attendees?: EventAttendee[]
  recurrence?: string[]
  reminders?: { useDefault?: boolean; overrides?: EventReminder[] }
}

