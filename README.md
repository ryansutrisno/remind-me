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
   - `https://www.googleapis.com/auth/userinfo.profile`
   - `https://www.googleapis.com/auth/userinfo.email`
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
- `src/components/ui/retro-grid.tsx` — animated retro grid background for the login page.
- `public/ReminderApps.png` — Open Graph image used for social sharing.

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
- Theme control uses a compact icon toggle (sun/moon) for mobile friendliness.
- Account menu in the navbar groups language, theme and logout under a single avatar button.

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

### Sharing / Open Graph previews
- If Facebook/Twitter shows “Invalid URL” for images, ensure `og:image` and `twitter:image` use absolute URLs (e.g., `https://your-domain/ReminderApps.png`).
- Place your image in `public/ReminderApps.png` so it is served statically at the site root after build.
- After changing meta tags, use the sharing debugger to refresh the cache.

### OAuth consent
- After adding the profile/email scopes, you may need to re‑consent. Use the login button again to grant new scopes.

## Breaking Changes

1. OAuth scopes updated: the app now requests `userinfo.profile` and `userinfo.email` to show the Google avatar and email in the navbar. Update your OAuth Consent Screen and re‑consent.
2. Account menu redesign: language, theme and logout are moved under a single avatar button. Theme control is an icon toggle (no dropdown).
3. Default range preset: the dashboard uses “This year” by default and auto‑fills the Start/Until fields. Presets are available for month/week and last year/month/week.
4. Login page background: animated retro grid added. Ensure the global CSS includes `@keyframes grid` and `.animate-grid`.
5. Open Graph image: use `public/ReminderApps.png` with an absolute URL in `index.html` for reliable social previews.

## Notes

- Some accounts have migrated “Reminders” to “Google Tasks”; this app uses Calendar `events + reminders` to indicate reminders.

## Credits

Made with ❤️ by Ryan Sutrisno — https://ryansutrisno.com
