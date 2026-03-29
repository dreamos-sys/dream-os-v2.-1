const CACHE_NAME = 'dream-os-v13-pro';
self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(clients.claim()));

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((res) => {
            if (!res) {
                self.clients.matchAll().then(cs => {
                    cs.forEach(c => c.postMessage({type:'NEW_FILE', url:event.request.url}));
                });
            }
            return res || fetch(event.request);
        })
    );
});
