# Changelog

## 2026-10 — First release (v1.0.0)

- Shared game-suggestion board with Google sign-in, a join code, and a group leader.
- Suggest games by name: details and cover art from RAWG (with a key) or Wikipedia.
- Built-in crossplay list of 110 multiplayer games, researched October 2026, with a source link per game.
- "Can we all play together?" check per game, based on who voted and what platform they play or own it on, including partial-crossplay cases (e.g. Xbox + Game Pass PC only).
- 👍 / 🤷 / 👎 voting with a most-wanted ranking.
- "Who owns it" per person and platform.
- Live PC price and best deal from CheapShark; console price, Game Pass and PS Plus as shared fields.
- Store links (Steam, Epic, PlayStation Store, Xbox Store, best PC deal).
- Statuses (Suggested, Up next, Playing, Finished, Dropped) and shared notes.
- Ideas tab to browse and suggest from the checked list; Crew tab with platforms and gamer tags.
- 🎲 Pick tonight, filters and sorting, phone layout, light/dark theme, installable PWA, demo mode without Firebase.
- Firestore security rules: members only; each person can change only their own vote and ownership; leader or suggester can remove a game.
