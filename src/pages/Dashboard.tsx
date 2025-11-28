import { useEffect, useState } from 'react'
import { useCalendars, useEvents, useCreateEvent, useUpdateEvent, useDeleteEvent } from '../features/calendar/hooks'
import { Button } from '../components/ui/button'
import { Select } from '../components/ui/select'
import { Toggle } from '../components/ui/toggle'
import { Card, CardContent, CardHeader } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Dialog } from '../components/ui/dialog'
import { ReminderForm } from '../components/ReminderForm'
import type { CalendarEvent } from '../features/calendar/types'
import { format } from 'date-fns'
import { id as localeID } from 'date-fns/locale'
import { useI18n } from '../providers/I18nProvider'

export function Dashboard() {
  const { t } = useI18n()
  const { data: calendars, isLoading: isCalLoading, error: calError } = useCalendars()
  const primary = calendars?.find(c => c.primary) || calendars?.[0]
  const [calendarId, setCalendarId] = useState<string | undefined>(undefined)
  const [hideBirthdays, setHideBirthdays] = useState(true)
  useEffect(() => {
    const isBirthdays = (summary?: string, id?: string) => {
      const s = (summary || '').toLowerCase()
      return s.includes('birthday') || (id || '').includes('group.v.calendar.google.com')
    }
    const filtered = calendars?.filter(c => hideBirthdays ? !isBirthdays(c.summary, c.id) : true) || []
    const defaultCal = filtered.find(c => c.primary) || filtered[0] || primary
    if (!calendarId && defaultCal?.id) setCalendarId(defaultCal.id)
    if (calendarId && hideBirthdays && calendars?.find(c => c.id === calendarId && isBirthdays(c.summary, c.id))) {
      const next = filtered[0]
      if (next?.id) setCalendarId(next.id)
    }
  }, [primary, calendarId, calendars, hideBirthdays])
  const now = new Date()
  const defaultMax = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
  const [timeMin, setTimeMin] = useState<string | undefined>(now.toISOString())
  const [timeMax, setTimeMax] = useState<string | undefined>(defaultMax.toISOString())
  const [onlyReminders, setOnlyReminders] = useState<boolean>(true)
  const { data: events, isLoading, error } = useEvents(calendarId, { timeMin, timeMax })
  const isBirthdaysCal = (summary?: string, id?: string) => {
    const s = (summary || '').toLowerCase()
    return s.includes('birthday') || (id || '').includes('group.v.calendar.google.com')
  }
  const filteredCalendars = calendars?.filter(c => hideBirthdays ? !isBirthdaysCal(c.summary, c.id) : true) || []
  const selectedCal = calendars?.find(c => c.id === calendarId)
  const birthdaysSelected = !!(selectedCal && isBirthdaysCal(selectedCal.summary, selectedCal.id))
  const createEvt = useCreateEvent(calendarId)
  const updateEvt = useUpdateEvent(calendarId)
  const deleteEvt = useDeleteEvent(calendarId)
  const [openForm, setOpenForm] = useState(false)
  const [editing, setEditing] = useState<CalendarEvent | null>(null)

  const items = (events || [])
    .filter(ev => !onlyReminders || !!(ev.reminders?.useDefault || (ev.reminders?.overrides && ev.reminders.overrides.length)))
    .filter(() => !(onlyReminders && birthdaysSelected))

  return (
    <div className="max-w-2xl mx-auto">
      {isCalLoading && (
        <Card><CardContent>
          <div className="animate-pulse space-y-2">
            <div className="h-4 w-1/3 bg-neutral-200 dark:bg-neutral-800 rounded" />
            <div className="h-3 w-1/2 bg-neutral-200 dark:bg-neutral-800 rounded" />
            <div className="h-3 w-2/3 bg-neutral-200 dark:bg-neutral-800 rounded" />
          </div>
        </CardContent></Card>
      )}
      {calError && (
        <Card><CardContent className="text-red-600 dark:text-red-400 text-sm">{t('dashboard.error.calendars')} {String((calError as any)?.message || '')}</CardContent></Card>
      )}
      {filteredCalendars && filteredCalendars.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3 items-end">
          <div>
            <label className="text-sm">{t('dashboard.calendar')}</label>
            <Select value={calendarId} onChange={e => setCalendarId(e.target.value)}>
              {filteredCalendars.map(c => <option key={c.id} value={c.id}>{c.summary}{c.primary ? ' (Utama)' : ''}</option>)}
            </Select>
          </div>
          <div>
            <label className="text-sm">{t('dashboard.startFrom')}</label>
            <input type="datetime-local" className="h-10 w-full px-3 rounded-md border border-neutral-300 dark:border-neutral-700" onChange={e => setTimeMin(new Date(e.target.value).toISOString())} />
          </div>
          <div>
            <label className="text-sm">{t('dashboard.until')}</label>
            <input type="datetime-local" className="h-10 w-full px-3 rounded-md border border-neutral-300 dark:border-neutral-700" onChange={e => setTimeMax(new Date(e.target.value).toISOString())} />
          </div>
          <div className="sm:flex sm:flex-wrap sm:justify-end gap-2 items-center">
            <Button className="w-full sm:w-auto" onClick={() => { setEditing(null); setOpenForm(true) }}>{t('dashboard.addReminder')}</Button>
            <Toggle checked={onlyReminders} onToggle={() => setOnlyReminders(v => !v)} label={onlyReminders ? t('filters.remindersOnly') : t('filters.allEvents')} />
            <Toggle checked={hideBirthdays} onToggle={() => setHideBirthdays(v => !v)} label={hideBirthdays ? t('filters.birthdays.hide') : t('filters.birthdays.show')} />
          </div>
        </div>
      )}

      <div className="grid gap-3">
        {isLoading && (
          <Card><CardContent>
            <div className="animate-pulse space-y-2">
              <div className="h-4 w-1/3 bg-neutral-200 dark:bg-neutral-800 rounded" />
              <div className="h-3 w-1/2 bg-neutral-200 dark:bg-neutral-800 rounded" />
              <div className="h-3 w-2/3 bg-neutral-200 dark:bg-neutral-800 rounded" />
            </div>
          </CardContent></Card>
        )}
        {error && (
          <Card><CardContent className="text-red-600 dark:text-red-400 text-sm">{t('dashboard.error.events')} {String((error as any)?.message || '')}</CardContent></Card>
        )}
        {items.map(ev => (
          <Card key={ev.id} className="">
            <CardHeader>
              <div className="flex justify-between">
                <div>
                  <div className="font-semibold">{ev.summary}</div>
                  <div className="text-xs opacity-70">{format(new Date(ev.start.dateTime || ev.start.date || ''), 'dd MMM yyyy HH:mm', { locale: localeID })}</div>
                </div>
                <div className="flex items-center gap-2">
                  {ev.reminders?.overrides?.length || ev.reminders?.useDefault ? <Badge>{t('event.reminded')}</Badge> : <Badge className="opacity-60">{t('event.noReminder')}</Badge>}
                  <Button variant="outline" onClick={() => { setEditing(ev); setOpenForm(true) }}>{t('action.edit')}</Button>
                  {ev.id && <Button variant="ghost" onClick={async () => { if (confirm(t('action.confirmDelete'))) await deleteEvt.mutateAsync(ev.id!) }}>{t('action.delete')}</Button>}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {ev.description ? <p className="text-sm">{ev.description}</p> : <p className="text-sm opacity-60">{t('event.noDescription')}</p>}
            </CardContent>
          </Card>
        ))}
        {!items.length && (
          <Card><CardContent>{birthdaysSelected && onlyReminders ? t('filters.birthdays.excluded') : t('dashboard.empty')}</CardContent></Card>
        )}
      </div>

      <Dialog open={openForm} onClose={() => setOpenForm(false)} title={editing ? t('dialog.editTitle') : t('dialog.addTitle')}>
        <ReminderForm initial={editing ?? undefined} onCancel={() => setOpenForm(false)} onSubmit={async (evt) => {
          if (editing?.id) await updateEvt.mutateAsync({ id: editing.id!, partial: evt })
          else await createEvt.mutateAsync(evt)
          setOpenForm(false)
        }} />
      </Dialog>
    </div>
  )
}
