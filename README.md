# 📺 WatchLog

A shared anime release tracker for you and your friends. See what airs each day, track your progress, know when the **English dub** drops, and browse what everyone else is watching — all in one place, synced live. Separate **🍿 Shows** and **🎬 Movies** boards track non-anime TV & films (Netflix, Prime, Disney+, …) too.

WatchLog is a single self-contained HTML file. No build step, no framework, no server of your own — it runs entirely in the browser and stores shared data in a free [Firebase](https://firebase.google.com) (Firestore) project.

> **Live site:** **https://alphadivine.github.io/watchlog/**

---

## ✨ Features

- **🎌 Anime · 🍿 Shows · 🎬 Movies boards** — a toggle at the top switches between your anime (AniList), live-action/Western TV series, and movies — the last two from every service, powered by [TMDB](https://www.themoviedb.org). TV and movies are separate boards so films don't clutter your series list. Search any title, preview it, and track status, progress and ratings; currently-airing series get a next-episode countdown (with season · episode) and every card shows where to stream it. All three boards share your account, profiles and views.
- **Auto schedule from [AniList](https://anilist.co)** — add a show and it pulls the air day, air time, and a live next-episode countdown automatically.
- **Local timezones** — everyone sees air times converted to their own timezone from UTC.
- **Three views** — a Sun→Sat weekly calendar, a detailed list, and a poster wall.
- **Accounts & profiles** — Firebase email/password login (with a **Forgot password?** reset-by-email link); pick a display name, accent color, and an avatar: an emoji preset, a custom image URL, or an **anime character portrait** (browse a show's cast from AniList, Crunchyroll-style).
- **Personal lists, shared space** — everyone has their own list with their own progress/status/rating/notes, and can view anyone else's list read-only. Tap **＋ Add to mine** to copy a show you spotted on a friend's list.
- **Community dub tracking + predicted release day** — no public API exposes English dub dates, so the group tracks the latest dubbed episode with a shared, bumpable counter. WatchLog then **learns each show's dub weekday** from when the counter is bumped (or you can set it by hand in Edit) and shows the next dub on its expected day in the weekly calendar, with a countdown.
- **Finished & Dropped sections** — shows you mark Finished or Dropped collapse into their own tucked-away sections instead of cluttering your active lineup.
- **Watch-sync** — on shows you both track, each card shows where everyone is (e.g. "You · Ep 5 · Demon · Ep 4"), with an "in sync ✓" when matched.
- **"Pick for us"** — a 🎲 toolbar button picks a random title from your Plan to watch when you can't decide.
- **Season grouping** — same-show seasons collapse into one expandable card (each season stays separately tracked).
- **What's new popup** — a ✨ button (and a once-per-version popup) summarizes new features.
- **Preview before adding** — every search result has an ⓘ button to read the synopsis, genres and streaming links without adding it; add from the preview if it looks good.
- **Installable app (PWA)** — add to your home screen for a fullscreen, app-like experience that loads offline.
- **Backup & password** — export your list to a JSON file, and change your password, from your profile.
- **Delay-aware** — auto-re-syncs when a countdown elapses, shows an honest "expected…/checking" state, and offers a shared "delayed this week" flag that clears itself once the episode airs.
- **Bulk import** from an AniList username (MyAnimeList via the AniList bridge — see notes).
- **Genre browse, trending, search-as-you-type, filters & sorting.**
- **Browse by release day** — in ＋ Add anime, tap a weekday to see everything airing that day in your timezone (great for filling an empty slot).
- **Ratings** with a per-show group average, **streaming links** (Crunchyroll/Netflix/etc.), **calendar (.ics) export**, and optional **browser notifications** ~1h before a show airs.
- **Light/dark themes, per-user accent tint, and a mobile-friendly layout** (add to home screen for an app-like feel).

---

## 🧩 How it works

- **Frontend:** one `index.html` (HTML + CSS + vanilla JS, no dependencies bundled — the Firebase SDK loads from Google's CDN).
- **Anime data:** the public [AniList GraphQL API](https://docs.anilist.co) (no key required).
- **Movie/TV data (Shows board):** [TMDB](https://www.themoviedb.org) via a free read token in `CONFIG.TMDB` — see `Docs/Setup guide (TMDB).md`.
- **Storage & sync:** a Firebase **Firestore** database with live `onSnapshot` updates, and **Firebase Auth** (email/password) for accounts. The app ships the Firebase *web config* (apiKey etc.), which is designed to be public — access is governed by the Firestore security rules in `Firebase/firestore.rules`.

There is no backend to run — hosting is just serving a static file.

---

## 🚀 Self-hosting setup

See **`Docs/Setup guide (Firebase).md`** for the full walkthrough. In brief:

1. **Create a Firebase project** at [console.firebase.google.com](https://console.firebase.google.com) (free Spark plan is fine).
2. **Enable Firestore** (Build → Firestore Database → Create, start in production mode) and **Authentication → Email/Password**.
3. **Publish the security rules** from `Firebase/firestore.rules` (Firestore → Rules → paste → Publish).
4. **Register a Web app** (Project settings → Your apps → Web) and copy its config into the `CONFIG.FIREBASE` block near the top of `index.html`:

   ```js
   const CONFIG = {
     FIREBASE: {
       apiKey:            "AIza…",
       authDomain:        "your-project.firebaseapp.com",
       projectId:         "your-project",
       storageBucket:     "your-project.firebasestorage.app",
       messagingSenderId: "0000000000",
       appId:             "1:0000000000:web:abc123"
     },
   };
   ```

5. *(Optional — for the 🍿 Shows board)* add a free **TMDB** read token to `CONFIG.TMDB` in `index.html`. See **`Docs/Setup guide (TMDB).md`**. The Anime board works without it.
6. **Deploy** the `Site/` folder to GitHub Pages (or any static host). Share the link; everyone who opens it and logs in shares the same board. Use `?board=NAME` on the URL to run separate groups off the same database.

> The Firebase web config is safe to commit to a public repo — your data is
> protected by the Firestore rules, not by hiding the config.

---

## 🔁 Migrating from the old Supabase version

Earlier builds used Supabase. To move existing lists over, open **`Site/migrate.html`**
in your browser once per person: paste your Firebase config, load the old data,
log in with your Firebase account, and pick your profile name — it copies that
list (progress, ratings, dub days and all) into Firestore under your new account.
Delete `migrate.html` after everyone's done. Details in the setup guide.

---

## 🔄 Updating
Replace `index.html` in your repo (edit or re-upload) and commit — Pages redeploys automatically in ~1 minute, same link. If a future version needs different data access, update `Firebase/firestore.rules` and re-publish them in the Firebase console.

---

## 📖 Using WatchLog
A friendly end-user walkthrough (great for pasting into Discord) lives in [`watchlog-guide-discord.md`](./watchlog-guide-discord.md). In short: log in, set your profile, add shows via search / genre / trending / import, and track progress, dubs, and delays from the cards.

### Tracking dub release days
Dubs almost always drop on a fixed weekday each week, but no API publishes that
day ahead of time — so WatchLog figures it out two ways:

- **Auto-learn (default):** whenever anyone bumps a show's 🎙️ dub counter after
  a new episode, the date is recorded, the weekday is worked out, and the next
  dub is predicted as +7 days — shown on that day in the weekly calendar with a
  countdown (marked *est.*).
- **Set it by hand:** open a show's **Edit** panel and pick a **Dub release day**
  (e.g. "Saturdays"). It takes effect immediately, overrides auto-learn, and is
  shared with the whole group.

Predicted dub days are estimates for the usual weekly cadence (purple in the
calendar); sub airings from AniList are exact.

---

## ⚠️ Notes & limitations
- **Dub dates** are community-maintained because no free API publishes English dub schedules; WatchLog learns/estimates the weekday rather than guessing exact dates.
- **MyAnimeList import**: MAL's public list API is restricted. Import your MAL list into AniList (AniList → Settings → Import) and then import from the AniList tab.
- **Notifications** fire only while the app tab is open (no background push).
- **Air schedules** reflect the original Japanese/sub broadcast (what AniList tracks).

---

## 🙏 Credits
Anime data from **[AniList](https://anilist.co)**. Movie & TV data from **[TMDB](https://www.themoviedb.org)** (this product uses the TMDB API but is not endorsed or certified by TMDB). Database, auth, and realtime by **[Firebase](https://firebase.google.com)**. Built as a fun project for tracking anime (and everything else) with friends. 📺✨

---

_Last updated: October 2026. Full change history in `CHANGELOG.md`._
