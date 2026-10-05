# Changelog

## 2026-10 — Anime character avatars
- **Anime character avatars:** in your profile, under the avatar options, search
  an anime (or tap one of your tracked shows) to load its cast, then tap a
  character to use their portrait as your avatar — Crunchyroll-style, with images
  pulled from AniList. Still works alongside the emoji presets and custom image
  URL.

## 2026-10 — New logo
- New app logo: a speech bubble with a play button (a nod to English dubs),
  replacing the plain play triangle. Updated the header badge, favicon, and the
  home-screen/PWA icons. Service worker cache bumped to v2 so the new icons
  refresh.

## 2026-10 — Browse by release day
- **Browse by release day:** the ＋ Add anime panel now has Sun–Sat chips. Tap a
  day to see every anime that airs that weekday in your timezone (via AniList's
  airing schedule) — handy for filling an empty day with something new. Each
  result still has the ⓘ preview and one-tap add.

## 2026-10 — Removed the "New this week" badge
- Removed the 🆕 "New ep/New dub" badge. It couldn't reliably tell when a new
  *dub* actually released — the sub version flagged sub airings (irrelevant for
  dub watchers), and the dub version only knew when the shared counter was last
  edited (so setup/migration edits looked like fresh releases). Clearer to drop
  it than to show a misleading signal.

## 2026-10 — Watch-sync & "Pick for us"
- **Watch-sync indicator:** on a show more than one person tracks, each card now
  shows where everyone is (e.g. "You · Ep 5 · Demon · Ep 4"), with an
  "in sync ✓" when your episodes match. Replaces the old "N also watching" line.
- **"Pick for us" button:** a 🎲 button in the toolbar picks a random title from
  your Plan to watch when you can't decide, and opens its details.

## 2026-10 — Installable app, season grouping, Dropped section, previews & more
- **Installable app (PWA):** added a web manifest, icons, and an offline service
  worker, so WatchLog installs on phones/desktop with its own icon, opens
  fullscreen, and loads instantly even offline.
- **Season grouping:** same-show seasons (detected by title) collapse into one
  expandable "series" card to cut clutter. Grouping happens within a section
  (active / Finished / Dropped), and each season stays its own editable entry.
- **"What's new" popup:** a ✨ button in the header (and an auto-popup once per
  version) shows what's been added/changed.
- **Dropped section:** shows marked Dropped now collapse into their own
  `✖ Dropped` section (like Finished) in both Weekly and List views, instead of
  cluttering the active lineup.
- **Read descriptions before adding:** each search result has an ⓘ button that
  opens a preview with the synopsis, genres, studio and streaming links —
  without adding the show. An **＋ Add to my list** button is right there if you
  decide to.
- **"New this week" cues:** a 🆕 badge marks shows whose sub or dub dropped in
  the last few days, so you can see at a glance what's new.
- **Backup / export:** a button in your profile downloads your list as a JSON
  file — a safety net and a portable copy.
- **Change password in-app:** a "Change password" field in your profile (cloud
  mode), complementing the Forgot-password link.
- **Sharper cover art:** cards now display AniList's larger cover image
  (~460px) instead of the stored low-res "small" (100px) — crisp on every
  screen, with no refetch or data change.
- **Cleaner Next-up banner:** when a show has no wide AniList banner image, the
  hero now shows its cover as a soft blurred backdrop (instead of stretching the
  small cover and looking blurry). Shows that have a real banner stay crisp.
- **Fix:** adding an anime no longer briefly shows two cards (a race between the
  optimistic add and the live-sync refresh).

## 2026-10 — Forgot-password link
- Added a **Forgot password?** link on the login screen. It emails a reset link
  (via Firebase Auth) so anyone can set their own password — handy when an
  account was created for them by someone else. Shown only in log-in mode.

## 2026-10 — Moved backend from Supabase to Firebase
- **Backend migrated to Firebase** (Firestore + Firebase Auth), so WatchLog now
  lives on the same platform as the other apps. The data layer (`CloudStore`),
  auth, and live sync (`onSnapshot`) were swapped over; the rest of the app is
  unchanged.
- Row-level security is now **`Firebase/firestore.rules`** (public read,
  owner-only write, plus a claim rule so migrated rows reattach on first login).
- Config is now the Firebase web config in `CONFIG.FIREBASE` at the top of
  `index.html` (apiKey/authDomain/projectId/…), instead of the Supabase URL/key.
- **`migrate.html`** added: a one-time, in-browser tool that copies existing
  lists (progress, ratings, dub days and all) from the old Supabase database into
  Firestore, assigned to each person's new account. Delete it after migrating.
- No feature or UI changes — same WatchLog, different backend.

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
