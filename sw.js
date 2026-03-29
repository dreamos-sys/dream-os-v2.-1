// 🛡️ SMART WATCHDOG PRO
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((res) => {
            if (!res) {
                const url = event.request.url.split('/').pop();
                self.clients.matchAll().then(cs => {
                    cs.forEach(c => c.postMessage({type:'NEW_FILE', name:url}));
                });
            }
            return res || fetch(event.request);
        })
    );
});
