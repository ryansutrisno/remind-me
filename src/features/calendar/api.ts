import { googleFetch } from '../../lib/google'
import type { CalendarEvent, CalendarListEntry } from './types'

const BASE = 'https://www.googleapis.com/calendar/v3'

export async function listCalendars() {
  const data = await googleFetch<{ items: CalendarListEntry[] }>(`${BASE}/users/me/calendarList`)
  return data.items
}

export async function listEvents(params: { calendarId: string; timeMin?: string; timeMax?: string }) {
  const { calendarId, timeMin, timeMax } = params
  const sp = new URLSearchParams({ singleEvents: 'true', orderBy: 'startTime' })
  if (timeMin) sp.set('timeMin', timeMin)
  if (timeMax) sp.set('timeMax', timeMax)
  const data = await googleFetch<{ items: CalendarEvent[] }>(`${BASE}/calendars/${encodeURIComponent(calendarId)}/events?${sp.toString()}`)
  return data.items
}

export async function createEvent(calendarId: string, evt: CalendarEvent) {
  return googleFetch<CalendarEvent>(`${BASE}/calendars/${encodeURIComponent(calendarId)}/events`, {
    method: 'POST',
    body: JSON.stringify(evt),
  })
}

export async function updateEvent(calendarId: string, eventId: string, partial: Partial<CalendarEvent>) {
  return googleFetch<CalendarEvent>(`${BASE}/calendars/${encodeURIComponent(calendarId)}/events/${encodeURIComponent(eventId)}`, {
    method: 'PATCH',
    body: JSON.stringify(partial),
  })
}

export async function deleteEvent(calendarId: string, eventId: string) {
  await googleFetch(`${BASE}/calendars/${encodeURIComponent(calendarId)}/events/${encodeURIComponent(eventId)}`, { method: 'DELETE' })
}

