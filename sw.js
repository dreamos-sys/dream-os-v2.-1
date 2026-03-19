// GHOST KILLER: Resetting Service Worker
self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then(names => Promise.all(names.map(name => caches.delete(name)))));
  console.log('💀 SW KILLED: CACHE CLEARED BY MASTER M');
});
