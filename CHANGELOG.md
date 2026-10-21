# Changelog

## 2026-10 — Auto dub dates from AnimeSchedule
- **Dub release info fills in automatically** — WatchLog can pull English-dub data
  (the weekly dub day, an estimated latest dub episode, and dub breaks) from
  **AnimeSchedule.net**, matched to your list by AniList ID, so dubs no longer have to
  be tracked entirely by hand. Marked **· AnimeSchedule** / *est.* so it's clearly an
  estimate, and the manual **🎙️** counter always overrides it.
- **Order of trust:** your group's 🎙️ bump (a human confirmed it) → AnimeSchedule
  (dub premiere + weekly cadence, capped at the season's episode count; long-runners
  with no episode total get the dub day but no guessed episode) → AniList auto-detect.
- **Setup:** adds a small, dedicated **Cloudflare Worker** (free, no API token) that
  relays AnimeSchedule with CORS — kept separate from the Party Up Worker. See
  `Docs/Setup guide (AnimeSchedule dubs).md`, then paste the Worker URL into
  `CONFIG.ANIMESCHEDULE.worker`. Blank = feature off, nothing changes.

## 2026-10 — Guide explains the statuses
- **Status meanings in the Help guide** — the ❓ Help guide now spells out what each
  status does: **Watching** (keeping up), **Caught up** (seen everything out so far,
  waiting on more), **Plan to watch** (saved for later), **Finished** (done — tucks
  into the collapsed ✔ Finished section and stops counting down), **Dropped** (gave
  up). Also clarifies that for anime each season is its own entry, so finishing one
  doesn't affect the others and a new season surfaces in the 🆕 New seasons callout.

## 2026-10 — Built-in "How to use" guide
- **❓ Help button** — a new **❓ Help** button in the top bar opens a short, friendly
  tour of the essentials: the three boards, adding titles, statuses & Coming soon,
  tracking season/episode and dub progress, recommendations, new-season alerts, and
  profiles/viewing friends' lists.
- **Auto-opens once for new users** — brand-new users see the guide automatically
  right after they set up their profile (gated per-device so it never nags). Existing
  users aren't interrupted; they'll see it noted in What's new and can open it from
  the ❓ button any time.

## 2026-10 — Dialogs don't close when you select text
- **Fixed a pop-up close bug** — while editing your profile (or in any dialog), if
  you dragged to highlight text in a field and released the mouse *outside* the box,
  the dialog would close and discard your edits. Pop-ups now close only on a true
  backdrop click (press **and** release on the dark area); a text selection that
  drifts onto the backdrop no longer dismisses them. Applies to the profile, add,
  edit, recommend, sign-in and what's-new dialogs.
- **Profile avatars already sync live** — note for the "friend sees my old avatar
  (panda) instead of Naruto" report: profiles update live across viewers, so this
  was a stale cached page on the other device. A hard refresh (and running this
  build) shows everyone's current avatar.

## 2026-10 — Hide boards you don't use
- **Choose your boards** — in your profile, under **Boards to show**, you can hide
  🎌 Anime, 🍿 Shows and/or 🎬 Movies tabs you don't care about. It's a per-person
  (per-device) preference, so a movies-only friend can hide anime entirely. You're
  always left with at least one board; if only one remains, the toggle hides itself,
  and if you were on a board you just hid, it switches to a visible one.

## 2026-10 — Recommend titles to each other
- **Recommendations** — tap the **💌** on any card (or in a title's details, incl.
  search results) to recommend it to **a specific friend or to everyone**, with an
  optional note. Recipients see it in a **📬 Recommended to you** section at the top
  of the matching board, with one-tap **Add to my list** or **Dismiss**. Works for
  anime, TV shows and movies; a recommendation disappears once you add it or dismiss
  it, and never shows something already on your list.
- **Setup:** adds a new Firestore **recs** collection — re-publish
  `Firebase/firestore.rules` in the Firebase console (see the Firebase setup guide)
  or recommendations can't be saved. (Local/solo mode doesn't show the feature.)

## 2026-10 — Smaller "What's new" + smarter add defaults
- **Shorter "What's new" popup** — the auto-popup now shows only what's changed
  **since you last looked** (usually a single entry), and the ✨ history view shows
  the latest few with older updates tucked behind a "Show older updates" toggle,
  instead of the whole list every time.
- **Upcoming shows default to "Plan to watch"** — adding an anime that **hasn't
  aired yet** (it would land in Coming soon) now comes in as *Plan to watch*
  instead of *Watching*, since you can't be watching it yet. Already-airing shows
  still default to Watching. (Movies/TV on the other boards already did this.)

## 2026-10 — New-season discovery for anime
- **"New seasons for your anime"** — WatchLog scans the sequel links of the anime
  you track and surfaces any **new season/sequel that's announced or airing but not
  on your list yet**, with a one-tap **＋ Add to my list**. So a new season dropping
  no longer slips by just because it's a separate AniList entry. It sits in a
  **collapsed bar** at the top of the Anime board (showing the count) so it doesn't
  crowd the screen — expand it when you want to browse. (Verified live: 12 upcoming
  sequels across a 70-title list — Frieren S3, Dandadan S3, Shield Hero S5, etc.)
- Added a sequel-details query (`SEQ_Q`); results are cached and refreshed with the
  rest of the live data.

## 2026-10 — Anime movies: grouped, labelled & filterable
- **Movie / OVA labels on anime** — anime that are movies (or OVAs, ONAs, specials)
  now carry a type label (🎬 Movie etc.) so you can tell them from TV seasons at a
  glance, on the card and in the Weekly/Poster views. (Needed adding `format` to
  the AniList refresh query.)
- **Anime movies group with the series** — a film clusters into the same series
  card as the show's seasons via AniList relations (verified: *Heroes Rising*
  lands in the My Hero franchise), and the group header shows the mix
  (e.g. "7 seasons · 2 🎬 movies").
- **Type filter** on the Anime board: All / 📺 Series / 🎬 Movies.
- **Anime movies drop the episode UI** — no "episode you're on" field, dub-episode
  counter, or "N eps" in details, since a film has no episodes.

## 2026-10 — New-season alerts for finished shows
- On the **Shows** board, a series you marked **Finished** that later gets a **new
  season** now gets a **🆕 New season** badge and floats into a **"New since you
  finished"** callout at the top of the board (both Weekly and List). It stays
  marked Finished until you tap **▶ Pick back up** to move it back to Watching.
- Detection snapshots the season/episode count when you mark a show Finished and
  compares it to TMDB later, so it catches both newly-airing and fully-dropped
  seasons. (Anime is unaffected — there each season is its own list entry.)

## 2026-10 — Ended vs between-seasons split (Shows)
- On the **Shows** board, series that have **finished airing** (TMDB "Ended"/
  "Canceled") now get their own **✅ Ended** section, split out from shows that are
  merely **💤 Between seasons** (returning, waiting on a new season). Applies to
  both the Weekly and List views, so a wrapped-up show no longer sits next to one
  that's just on hiatus.

## 2026-10 — Show password & movie/TV character avatars
- **Show-password toggle** — a 👁 tap-to-reveal on the login password field (and the
  change-password field) so you can confirm what you typed before submitting.
- **Movie & TV character avatars** — the profile avatar picker now has a
  **movie / TV** option alongside the anime one: search any film or series (or tap
  one of your tracked titles) and pick a character from its cast (actor portraits
  via TMDB). Handy for friends who don't watch anime.

## 2026-10 — Movie card fixes
- **Release dates on movie cards** — every movie now shows its release date, both
  already-released (*📅 Mar 31, 1999*) and upcoming (*📅 Releases Dec 18, 2026*),
  on the List and (as a year) Poster views.
- **Fixed the watch-sync line on movies** — it was showing a meaningless *S1 E0*
  (season/episode) for films. Movies now compare by **status** instead, so it
  reads e.g. "You · Plan · Demon · Plan · in sync ✓".

## 2026-10 — New: Shows & Movies boards
- **Three boards.** A new **🎌 Anime · 🍿 Shows · 🎬 Movies** toggle at the top
  switches the whole board between your anime (AniList), live-action/Western **TV
  series**, and **movies** — the last two from every service (Netflix, Prime,
  Disney+, etc.), powered by **[TMDB](https://www.themoviedb.org)**. TV and movies
  are separate boards (search is scoped to each), so films don't clutter your
  series list. Your anime list is untouched — all three share the same account,
  profiles and views. The **Movies** board shows **List & Poster** views only
  (no Weekly — films have no weekly release cadence).
- **Season + episode tracking:** multi-season series track **both** the season and
  the episode you're on — the card reads *On S2 · E3 / 13* with separate season and
  episode steppers (and both in Edit), and watch-sync shows each person's season &
  episode. Movies stay a single watched/plan item.
- **At-a-glance on every card:** your spot (📍 S2 · E3) now shows in the List, Weekly
  and Poster views, alongside the **latest episode out** (📺 Latest S2·E8) and a
  **▸ behind** flag when new episodes are ahead of you — mirroring how the anime
  cards show aired-episode info.
- **Full tracking on the Shows side:** search any movie or series, read a preview
  (synopsis + where it streams) before adding, then track status, progress and
  ratings. Currently-airing series get a **next-episode countdown**; every card
  shows a **where-to-stream** badge for your region (default US). Finished/Dropped
  sections, watch-sync, "Pick for us", and the Weekly/List/Poster views all work
  on the Shows and Movies boards too.
- The dub tools, character avatars and AniList genre/trending/day browse stay on
  the Anime board, where they apply. Config lives in `CONFIG.TMDB` at the top of
  `index.html`; see `Docs/Setup guide (TMDB).md` to add your own free key.
- **Renamed** the browser tab / PWA title from "WatchLog · Anime Tracker" to just
  **WatchLog**, since it now tracks TV too.

## 2026-10 — Fixes: schedules for large lists & keep your place on sync
- **Schedules now load for every show, not just the first 50.** The live AniList
  refresh requested every tracked show's data in a single page, but AniList caps
  a page at 50 results — so on the shared board (82 shows) ~25 shows past the
  first 50 got **no** schedule data. They showed as "On break / loading" with no
  air day or countdown, and never-aired ones (e.g. *The Vermilion Mask*) never
  reached the new **Coming soon** bucket. The refresh now fetches ids in chunks
  of 50, so all shows get their air day, countdown, dub status and series links.
- **Background re-syncs no longer lose your place.** When Firestore pushed an
  update or a countdown elapsed, the board re-rendered and the page jumped back
  to the top and collapsed any expanded series card — as if it had reloaded
  mid-action. The re-render now restores your scroll position and keeps expanded
  series open, and it's deferred entirely while any dialog is open.

## 2026-10 — Unique counts & smarter season grouping
- **Count = unique anime:** the number next to each name now counts unique shows
  (all seasons of one anime count once), not every season separately.
- **Groups differently-named seasons/arcs:** series grouping now also uses
  AniList's prequel/sequel/side-story links, so arcs with distinct names (e.g.
  all of Demon Slayer's — Entertainment District, Swordsmith Village, Hashira
  Training, Infinity Castle…) collapse into one card. Title-matching and
  AniList links are combined, so nothing that grouped before stops grouping.
- **Manual "Series group" field** in Edit: type the same name on each part to
  force-group anything the auto-detection misses.

## 2026-10 — Fix: Add popup disrupted while adding
- Fixed the Add-anime popup getting disrupted ("kicked out") while adding
  several shows: each add triggered a full live-sync reload + AniList refresh +
  board re-render, and that churn behind the open popup caused jank, focus loss,
  and stray taps. Now the board re-render is **deferred while the Add/Edit dialog
  is open** (and applied the moment it closes), rapid refreshes are **coalesced**
  into one, and click-outside-to-close only fires when the press actually starts
  on the backdrop (so a reflow can't close it).

## 2026-10 — "Coming soon" section
- Split the weekly view's catch-all "No upcoming episodes" into two: **💤 On
  break** (between seasons / caught up) and **🔜 Coming soon** (shows that
  haven't aired yet, flagged NOT_YET_RELEASED by AniList). So a brand-new show
  like *The Vermilion Mask* no longer sits next to shows on hiatus.

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
