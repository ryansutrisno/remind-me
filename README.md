# Remind Me — Google Calendar Integrated Reminder App

Remind Me is a wrapper application to list and manage reminders based on Google Calendar. Built with React + TypeScript (Vite), Tailwind CSS, shadcn‑style components, system‑aware dark/light theme, and i18n (English + Bahasa Indonesia).

## Key Features

- Google Sign‑In (Google Identity Services, OAuth 2.0) directly in the browser.
- Display events/reminders from Google Calendar over a chosen time range.
- Create/edit form mirroring Google Calendar fields (summary, description, start/end, all‑day, location, color, visibility, transparency, attendees, recurrence RRULE, reminders).
- Delete events with confirmation.
- “Reminders only” filter to show only events that have reminders.
- Option to hide the “Birthdays” calendar for more relevant results.
- Mobile‑responsive UI, basic accessibility, loading skeleton, empty state, and informative error handling.
- Theme modes: System, Light, Dark (default follows the user system).
- i18n: English (default) and Bahasa Indonesia with a toggle.

## Tech Stack

- `React`, `TypeScript`, `Vite`
- `Tailwind CSS`, shadcn‑style custom minimal components
- `@tanstack/react-query` for fetching/caching
- `date-fns` for date formatting
- `react-icons` for icons

## Google Cloud Console Setup

1. Enable Google Calendar API in your Cloud project.
2. Create an OAuth Client ID of type `Web application`.
3. Add `Authorized JavaScript origins` for development: `http://localhost:5174/`.
4. Scopes required:
   - `https://www.googleapis.com/auth/calendar.readonly`
   - `https://www.googleapis.com/auth/calendar.events`
5. On the OAuth Consent Screen:
   - Set “User Type” to External.
   - Add your account under “Test users” if not published yet.

## Environment Configuration

Create `.env` or `.env.local` at project root:

```
VITE_GOOGLE_CLIENT_ID=<YOUR_GOOGLE_CLOUD_CLIENT_ID>
```

## Local Development

- Install deps: `npm install`
- Run dev server: `npm run dev`
- Open: `http://localhost:5174/`

Note: The dev port is set to `5174` with `strictPort: true` to avoid conflicts.

## Important Files

- `src/lib/google.ts` — OAuth init, token acquisition, and `googleFetch` wrapper.
- `src/features/calendar/api.ts` — REST calls (list calendars/events, create, update, delete).
- `src/features/calendar/hooks.ts` — React Query hooks for calendars/events and mutations.
- `src/pages/LoginPage.tsx` — login page (title, tagline, language toggle, theme dropdown, footer credit).
- `src/pages/Dashboard.tsx` — reminders list, filters, CRUD actions, form dialog.
- `src/components/ReminderForm.tsx` — form mirroring Google Calendar fields.
- `src/providers/ThemeProvider.tsx` — `system | light | dark` mode with persistence.
- `src/providers/I18nProvider.tsx` — minimal i18n for en/id.

## Calendar API Integration

- List calendars: `GET /calendar/v3/users/me/calendarList`
- List events: `GET /calendar/v3/calendars/{calendarId}/events?singleEvents=true&orderBy=startTime&timeMin=...&timeMax=...`
- Create event: `POST /calendar/v3/calendars/{calendarId}/events`
- Update event: `PATCH /calendar/v3/calendars/{calendarId}/events/{eventId}`
- Delete event: `DELETE /calendar/v3/calendars/{calendarId}/events/{eventId}`

Form ↔ Google Calendar field mapping:

- Title → `summary`
- Description → `description`
- Location → `location`
- Start/End → `start.dateTime` / `end.dateTime` or `start.date` / `end.date` (all‑day)
- Time zone → `start.timeZone` / `end.timeZone` (optional)
- Color → `colorId`
- Visibility → `visibility` (`default` | `public` | `private` | `confidential`)
- Transparency → `transparency` (`opaque` | `transparent`)
- Guests → `attendees[].email`
- Recurrence → `recurrence[]` (RRULE, e.g. `RRULE:FREQ=DAILY;COUNT=10`)
- Reminders → `reminders.useDefault` or `reminders.overrides[]` ({ method: `popup` | `email`, minutes: number })

## UX & Responsiveness

- Dashboard uses responsive grid (1→2 columns), primary actions are full‑width on mobile.
- Form dialog has `max-height` and `overflow-y-auto` to prevent overlap.
- Toggles use a unified component to avoid label shifting.

## Security

- OAuth token stored in memory (with minimal optional persistence). Do not commit secrets.
- Avoid logging sensitive data. Use minimal scopes required.

## Troubleshooting

- 401/403 (Unauthorized/Forbidden):
  - Ensure client ID is correct, origin `http://localhost:5174/` is registered, consent screen/test users configured, scopes granted.
  - Re‑consent: click “Sign in with Google” again.
- “Happy birthday!” dominates results:
  - Adjust the time range (default: now → +30 days).
  - Enable “Reminders only” and “Hide Birthdays calendar”.

## Notes

- Some accounts have migrated “Reminders” to “Google Tasks”; this app uses Calendar `events + reminders` to indicate reminders.

## Credits

Made with ❤️ by Ryan Sutrisno — https://ryansutrisno.com
