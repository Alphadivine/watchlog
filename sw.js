/* WatchLog service worker — offline app shell. Bump CACHE to force an update. */
const CACHE = "watchlog-v1";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));
});

self.addEventListener("activate", e=>{
  e.waitUntil(
    caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener("fetch", e=>{
  const req = e.request;
  if(req.method !== "GET") return;
  const url = new URL(req.url);
  // Let cross-origin requests (Firebase, AniList, CDNs) go straight to the network.
  if(url.origin !== location.origin) return;
  // Navigations: network-first, fall back to the cached shell when offline.
  if(req.mode === "navigate"){
    e.respondWith(
      fetch(req).then(r=>{ const cp=r.clone(); caches.open(CACHE).then(c=>c.put("./index.html", cp)); return r; })
        .catch(()=>caches.match("./index.html"))
    );
    return;
  }
  // Other same-origin assets: cache-first, then network (and cache it).
  e.respondWith(
    caches.match(req).then(c=> c || fetch(req).then(r=>{ const cp=r.clone(); caches.open(CACHE).then(cc=>cc.put(req, cp)); return r; }))
  );
});
