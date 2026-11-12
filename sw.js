/* Offline support. The app shell is served from cache and refreshed in the background,
   so a new version shows up on the launch after it was fetched. Bump V when the shell file list changes. */
const V = 'macro-ledger-v1';
const SHELL = ['./', 'index.html', 'manifest.json', 'icon.svg', 'icon-180.png', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png'];
const FONT_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== V).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

const usable = res => res && (res.ok || res.type === 'opaque');

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (url.origin === location.origin) {
    // Stale-while-revalidate: answer from cache at once, refresh the copy for next time.
    e.respondWith(caches.open(V).then(async cache => {
      const hit = await cache.match(req, { ignoreSearch: true });
      const fresh = fetch(req, { cache: 'no-cache' })
        .then(res => { if (usable(res)) cache.put(req, res.clone()); return res; });
      if (hit) { e.waitUntil(fresh.catch(() => {})); return hit; }
      return fresh.catch(() => req.mode === 'navigate' ? cache.match('index.html') : Response.error());
    }));
    return;
  }

  if (FONT_HOSTS.includes(url.hostname)) {
    // Fonts never change at a given URL, so cache-first.
    e.respondWith(caches.open(V).then(async cache => {
      const hit = await cache.match(req);
      if (hit) return hit;
      const res = await fetch(req);
      if (usable(res)) cache.put(req, res.clone());
      return res;
    }));
  }
  // Everything else (the Anthropic API) goes straight to the network.
});
