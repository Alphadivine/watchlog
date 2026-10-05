# Changelog

## 2026-10 — Predicted dub release days
- **Dub release-day tracking.** Dubs almost always drop on a fixed weekday
  each week, but no API publishes that day ahead of time — so WatchLog now
  figures it out two ways:
  - **Auto-learn:** when anyone bumps a show's 🎙️ dub counter after a new
    episode, the date is recorded automatically, the weekday is worked out,
    and the next dub is predicted as +7 days (marked *est.*).
  - **Set by hand:** a new **Dub release day** dropdown in a show's Edit
    panel lets you pick the weekday (e.g. "Saturdays"); it's shared with the
    whole group and takes effect immediately.
- Shows with a known/declared dub day now appear **on that day in the weekly
  calendar** with a countdown, instead of sitting in a loose list. A purple
  legend distinguishes estimated dub days from exact sub airings.
- New database columns: `dub_day` (0–6 weekday override) and `dub_date`
  (date the latest dub was recorded). **Run the migration in
  `Supabase/schema.sql` (or the two `alter table` lines) before using this
  version**, or saves to the new fields will fail.

## 2026-10 — Dub-day placement fix
- Fixed a hand-set **Dub release day** being ignored in the weekly view: the
  grid checked the *sub* air day first, so a show set to e.g. Saturday still
  showed under its sub's day (e.g. Monday). A manually set dub day now takes
  priority over the sub schedule (WatchLog is dub-first) and applies even
  before any dub episode has been counted. The now-redundant sub day/time tag
  is hidden on cards placed on their dub day.

## 2026-09 — Finished section & dub-still-releasing bucket
- Shows marked **Finished** collapse into their own tucked-away section in
  both the Weekly and List views instead of cluttering the active lineup.
- Shows whose **sub has finished but whose dub is still coming** (e.g. 22 of
  24 dub episodes out) get a dedicated **🎙️ Dub still releasing** section
  instead of being wrongly lumped into "no upcoming episodes."

## 2026-08 — WatchLog launch
- Shared anime release tracker built on **AniList** (schedules) and
  **Supabase** (accounts, sync, realtime).
- Auto air day / time / next-episode countdown in each viewer's local
  timezone; Weekly, List, and Poster views.
- Accounts & profiles, personal lists in a shared space, **＋ Add to mine**,
  community dub tracking, delay-aware countdowns, ratings with group average,
  streaming links, calendar (.ics) export, bulk import, genre browse,
  trending, light/dark themes, and a mobile-friendly layout.
