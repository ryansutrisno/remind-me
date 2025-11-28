import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createEvent, deleteEvent, listCalendars, listEvents, updateEvent } from './api'
import type { CalendarEvent } from './types'

export function useCalendars() {
  return useQuery({ queryKey: ['calendars'], queryFn: listCalendars })
}

export function useEvents(calendarId?: string, filters?: { timeMin?: string; timeMax?: string }) {
  return useQuery({
    queryKey: ['events', calendarId, filters],
    queryFn: () => listEvents({ calendarId: calendarId!, timeMin: filters?.timeMin, timeMax: filters?.timeMax }),
    enabled: !!calendarId,
  })
}

export function useCreateEvent(calendarId?: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (evt: CalendarEvent) => createEvent(calendarId!, evt),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['events', calendarId] }),
  })
}

export function useUpdateEvent(calendarId?: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, partial }: { id: string; partial: Partial<CalendarEvent> }) => updateEvent(calendarId!, id, partial),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['events', calendarId] }),
  })
}

export function useDeleteEvent(calendarId?: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteEvent(calendarId!, id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['events', calendarId] }),
  })
}

