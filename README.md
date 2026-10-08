# ▶▶ Squad Queue

A shared "what should we play together?" board for you and your friends. Anyone in the crew can suggest a game, everyone votes, and the app tells you straight away whether the people who want to play can actually **play together across PC, PlayStation and Xbox**, where to buy it, and what it costs.

Squad Queue is a single self-contained `index.html` (plus a data file). No build step, no server of your own: it runs in the browser and stores shared data in a free [Firebase](https://firebase.google.com) (Firestore) project.

> **Live site:** **https://alphadivine.github.io/squad-queue/** *(once deployed)*

---

## ✨ Features

- **Suggest a game by name**: type a title and pick it from the results. Cover art and a description are pulled in automatically (from [RAWG](https://rawg.io) if a key is set, otherwise Wikipedia). Add a pitch for why the crew should play it.
- **Crossplay you can trust**: a built-in list of **110 popular multiplayer games** with crossplay checked in October 2026 (full / partial / none, cross-progression, player counts, free-to-play), each with a link to where it was verified. Anything not on the list can be filled in by whoever suggests it.
- **"Can we all play together?" check**: every card looks at who voted 👍 or 🤷 and what they play on, then says *"All 4 can play together"* or *"3 of 4 together · split: Sam (PS)"*. It understands awkward cases like Deep Rock Galactic, where Xbox and Game Pass PC play together but Steam and PlayStation don't.
- **Voting**: 👍 I'm in, 🤷 maybe, 👎 not for me. The queue sorts by most wanted, with #1, #2… badges.
- **Who owns it**: each person marks which platform they have it on (or that they don't own it), so you can see who still needs to buy it.
- **Prices & deals**: live PC price and the best current deal (with % off) from [CheapShark](https://www.cheapshark.com), refreshed every few days. Console price, Game Pass and PS Plus are tick-boxes anyone can fill in.
- **Where to get it**: links to Steam, Epic, PlayStation Store, Xbox Store and the cheapest PC deal.
- **Status tracking**: Suggested → Up next → Playing → Finished / Dropped, with shared notes (server name, mods, game night).
- **Ideas tab**: browse the 110 checked games, filter by crossplay or type (co-op, survival, party, battle royale…), and suggest one in a tap.
- **Crew tab**: everyone's platforms plus Steam / Epic / PSN / Xbox / Discord names with copy buttons, so adding each other is easy.
- **🎲 Pick tonight**: picks a game at random, weighted towards the most-wanted games that the whole interested group can play together.
- **Filters**: crossplay only, "whole crew fits", free, Game Pass / PS Plus, type, plus sort by most wanted, newest, cheapest or A–Z.
- **Google sign-in with a join code**: only people with the code you set can see the list. The leader (whoever sets the group up) can remove people and change the code.
- **Installable app (PWA)**, phone layout with bottom tabs, light / dark / system theme.

---

## 🧩 How it works

- **Frontend:** `index.html` (HTML + CSS + vanilla JS) and `data.js` (the built-in crossplay list). The Firebase SDK loads from Google's CDN.
- **Game details:** [RAWG API](https://rawg.io/apidocs) with a free key, or Wikipedia (no key) as the fallback.
- **PC prices:** [CheapShark API](https://apidocs.cheapshark.com) (no key).
- **Storage & sync:** Firebase **Firestore** with live updates and **Firebase Auth** (Google). The Firebase web config in `index.html` is designed to be public; access is controlled by the rules in `Firebase/firestore.rules`.
- **Demo mode:** with no Firebase config, the app runs entirely in one browser (handy for trying it out).

---

## 🚀 Setup

See **`Docs/Setup guide.md`** for the full browser-only walkthrough. In brief:

1. Create a new Firebase project, turn on **Firestore** and **Google** sign-in, add your GitHub Pages domain to *Authorized domains*.
2. Publish `Firebase/firestore.rules`.
3. Paste your Firebase web config into the `CONFIG.FIREBASE` block near the top of the script in `index.html`. *(Optional: add a free RAWG key to `CONFIG.RAWG_KEY`.)*
4. Upload the contents of `Site/` to a GitHub repo and turn on GitHub Pages.
5. Open the site, sign in, create the group and choose a join code. Send friends the link and the code.

Use `?group=NAME` on the URL to run a separate group off the same database.

---

## 🔄 Updating

Replace `index.html` (and `data.js` if the crossplay list changed) in the repo and commit. GitHub Pages redeploys in about a minute; a hard refresh (Ctrl+Shift+R) shows it immediately.

To update the crossplay list, edit `Source/crossplay.json` and regenerate `data.js` with `Source/build_data.py` (or just ask Claude to do it).

---

## ⚠️ Notes & limitations

- **Crossplay changes.** The built-in list was checked in October 2026. Games add crossplay in patches (and occasionally lose it), so anyone can correct a game's crossplay and note from its details panel.
- **Partial crossplay is simplified** to which platforms play together. Details like "opt-in toggle" or "no cross-invites" are in the note.
- **Console prices, Game Pass and PS Plus** aren't available from any free API, so they're filled in by the crew.
- **PC prices** come from CheapShark's store list (Steam, Epic, GOG, Humble, Fanatical and others), in USD.
- **Wikipedia fallback** gives a shorter description and guesses platforms from the text; check the platform boxes when suggesting.

---

## 🙏 Credits

Game data from **[RAWG](https://rawg.io)** and **[Wikipedia](https://www.wikipedia.org)**. PC prices from **[CheapShark](https://www.cheapshark.com)**. Crossplay research mainly via **[iscrossplay.com](https://iscrossplay.com)** plus publisher pages. Database, auth and realtime by **[Firebase](https://firebase.google.com)**.

---

_Last updated: October 2026. Full change history in `CHANGELOG.md`._
