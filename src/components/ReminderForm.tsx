import { useState } from 'react'
import { Input } from './ui/input'
import { Select } from './ui/select'
import { Button } from './ui/button'
import { CalendarEvent } from '../features/calendar/types'
import { useI18n } from '../providers/I18nProvider'
import { RichTextEditor } from './RichTextEditor'

type Props = {
  initial?: Partial<CalendarEvent>
  onSubmit: (evt: CalendarEvent) => void
  onCancel: () => void
}

export function ReminderForm({ initial, onSubmit, onCancel }: Props) {
  const { t } = useI18n()
  const [summary, setSummary] = useState(initial?.summary ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [location, setLocation] = useState(initial?.location ?? '')
  const [start, setStart] = useState(initial?.start?.dateTime ?? '')
  const [end, setEnd] = useState(initial?.end?.dateTime ?? '')
  const [allDay, setAllDay] = useState(!!initial?.start?.date && !!initial?.end?.date)
  const [visibility, setVisibility] = useState<CalendarEvent['visibility']>(initial?.visibility ?? 'default')
  const [transparency, setTransparency] = useState<CalendarEvent['transparency']>(initial?.transparency ?? 'opaque')
  const [colorId, setColorId] = useState(initial?.colorId ?? '')
  const [attendees, setAttendees] = useState((initial?.attendees ?? []).map(a => a.email).join(','))
  const [remMethod, setRemMethod] = useState<'popup' | 'email'>(initial?.reminders?.overrides?.[0]?.method ?? 'popup')
  const [remMinutes, setRemMinutes] = useState<number>(initial?.reminders?.overrides?.[0]?.minutes ?? 30)
  const [rrule, setRrule] = useState((initial?.recurrence ?? [])[0] ?? '')

  return (
    <form className="space-y-3" onSubmit={e => { e.preventDefault();
      const toRFC3339 = (val: string) => {
        const d = new Date(val)
        if (isNaN(d.getTime())) return val
        const p = (n: number) => String(n).padStart(2, '0')
        const off = -d.getTimezoneOffset()
        const sign = off >= 0 ? '+' : '-'
        const abs = Math.abs(off)
        const hh = p(Math.floor(abs / 60))
        const mm = p(abs % 60)
        return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}${sign}${hh}:${mm}`
      }
      const evt: CalendarEvent = {
        summary,
        description: description || undefined,
        location: location || undefined,
        colorId: colorId || undefined,
        visibility,
        transparency,
        start: allDay ? { date: start?.slice(0, 10) } : { dateTime: toRFC3339(start) },
        end: allDay ? { date: end?.slice(0, 10) } : { dateTime: toRFC3339(end) },
        attendees: attendees ? attendees.split(',').map(e => ({ email: e.trim() })).filter(a => a.email) : undefined,
        recurrence: rrule ? [rrule] : undefined,
        reminders: remMinutes ? { useDefault: false, overrides: [{ method: remMethod, minutes: Number(remMinutes) }] } : { useDefault: true },
      }
      onSubmit(evt)
    }}>
      <div>
        <label className="text-sm">{t('form.summary')}</label>
        <Input value={summary} onChange={e => setSummary(e.target.value)} required />
      </div>
      <div>
        <label className="text-sm">{t('form.description')}</label>
        <RichTextEditor value={description} onChange={setDescription} />
      </div>
      <div>
        <label className="text-sm">{t('form.location')}</label>
        <Input value={location} onChange={e => setLocation(e.target.value)} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-sm">{t('form.start')}</label>
          {allDay ? (
            <Input type="date" value={start} onChange={e => setStart(e.target.value)} required />
          ) : (
            <Input type="datetime-local" value={start} onChange={e => setStart(e.target.value)} required />
          )}
        </div>
        <div>
          <label className="text-sm">{t('form.end')}</label>
          {allDay ? (
            <Input type="date" value={end} onChange={e => setEnd(e.target.value)} required />
          ) : (
            <Input type="datetime-local" value={end} onChange={e => setEnd(e.target.value)} required />
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <input id="allDay" type="checkbox" checked={allDay} onChange={e => setAllDay(e.target.checked)} />
        <label htmlFor="allDay" className="text-sm">{t('form.allDay')}</label>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-sm">{t('form.visibility')}</label>
          <Select value={visibility} onChange={e => setVisibility(e.target.value as any)}>
            <option value="default">Default</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="confidential">Confidential</option>
          </Select>
        </div>
        <div>
          <label className="text-sm">{t('form.transparency')}</label>
          <Select value={transparency} onChange={e => setTransparency(e.target.value as any)}>
            <option value="opaque">Opaque</option>
            <option value="transparent">Transparent</option>
          </Select>
        </div>
      </div>
      <div>
        <label className="text-sm">{t('form.colorId')}</label>
        <Input value={colorId} onChange={e => setColorId(e.target.value)} placeholder="mis. 11" />
      </div>
      <div>
        <label className="text-sm">{t('form.attendees')}</label>
        <Input value={attendees} onChange={e => setAttendees(e.target.value)} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-sm">{t('form.reminderMethod')}</label>
          <Select value={remMethod} onChange={e => setRemMethod(e.target.value as any)}>
            <option value="popup">Popup</option>
            <option value="email">Email</option>
          </Select>
        </div>
        <div>
          <label className="text-sm">{t('form.reminderMinutes')}</label>
          <Input type="number" value={remMinutes} onChange={e => setRemMinutes(Number(e.target.value))} />
        </div>
      </div>
      <div>
        <label className="text-sm">{t('form.rrule')}</label>
        <Input value={rrule} onChange={e => setRrule(e.target.value)} placeholder="RRULE:FREQ=DAILY;COUNT=10" />
      </div>
      <div className="sticky bottom-0 bg-white dark:bg-slate-800 border-t border-neutral-200 dark:border-slate-700 mt-4 p-2 flex justify-end gap-2">
        <Button variant="outline" type="button" onClick={onCancel}>{t('form.cancel')}</Button>
        <Button variant="primary" type="submit">{t('form.save')}</Button>
      </div>
    </form>
  )
}
