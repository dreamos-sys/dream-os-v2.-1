/* ============================================
   🕌 DREAM OS 2026 - SERVICE WORKER
   Version: 2026.1.0
   ISO 27001 Compliant
   ============================================ */

const CACHE_NAME = 'dreamos-v2026.1.0';
const STATIC_CACHE = 'dreamos-static-v1';
const DYNAMIC_CACHE = 'dreamos-dynamic-v1';

// Critical resources to cache immediately
const CRITICAL_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/css/dream-engine-2026.css',
  '/css/dream-foundation-2026.css',
  '/css/dream-responsive-layout.css',
  '/js/dream-core.js',
  '/js/ai-orchestrator.js',
  '/assets/icons/icon-192x192.png',
  '/assets/icons/icon-512x512.png'
];

// External resources to cache
const EXTERNAL_RESOURCES = [
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
  'https://cdnjs.cloudflare.com'
];

// ============================================
// INSTALL EVENT - Cache critical assets
// ============================================
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Caching critical assets');
        return cache.addAll(CRITICAL_ASSETS);
      })
      .then(() => {
        console.log('[SW] Installation complete');
        return self.skipWaiting();
      })
      .catch((err) => {
        console.warn('[SW] Cache failed:', err);      })
  );
});

// ============================================
// ACTIVATE EVENT - Clean old caches
// ============================================
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== STATIC_CACHE && name !== DYNAMIC_CACHE)
            .map((name) => {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => {
        console.log('[SW] Activation complete');
        return self.clients.claim();
      })
  );
});

// ============================================
// FETCH EVENT - Network first, fallback to cache
// ============================================
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') return;
  
  // Skip chrome-extension and other non-http(s) requests
  if (!url.protocol.startsWith('http')) return;
  
  // Handle API requests differently (Supabase, Cloudflare)
  if (url.hostname.includes('supabase.co') || 
      url.hostname.includes('cloudflare.com')) {
    event.respondWith(handleApiRequest(request));
    return;
  }
  
  // Handle external resources (fonts, CDN)  if (EXTERNAL_RESOURCES.some(ext => url.origin.includes(ext))) {
    event.respondWith(handleExternalResource(request));
    return;
  }
  
  // Handle same-origin requests
  event.respondWith(handleSameOriginRequest(request));
});

// ============================================
// API REQUEST STRATEGY - Network first
// ============================================
async function handleApiRequest(request) {
  try {
    const networkResponse = await fetch(request);
    return networkResponse;
  } catch (error) {
    console.warn('[SW] API request failed, returning offline response');
    return new Response(
      JSON.stringify({ error: 'Offline mode', cached: true }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// ============================================
// EXTERNAL RESOURCE STRATEGY - Cache first
// ============================================
async function handleExternalResource(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    // Return cached version, but update in background
    fetch(request).then((response) => {
      if (response.ok) {
        caches.open(STATIC_CACHE).then((cache) => {
          cache.put(request, response);
        });
      }
    });
    
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.warn('[SW] External resource failed:', request.url);
    return new Response('', { status: 404 });
  }
}

// ============================================
// SAME-ORIGIN STRATEGY - Stale while revalidate
// ============================================
async function handleSameOriginRequest(request) {
  const cachedResponse = await caches.match(request);
  
  const fetchPromise = fetch(request)
    .then((networkResponse) => {
      if (networkResponse.ok) {
        const cache = caches.open(DYNAMIC_CACHE);
        cache.then((c) => c.put(request, networkResponse.clone()));
      }
      return networkResponse;
    })
    .catch(() => {
      console.warn('[SW] Network failed, serving from cache');
      return cachedResponse || caches.match('/offline.html');
    });
  
  return cachedResponse || fetchPromise;
}

// ============================================
// PUSH NOTIFICATIONS
// ============================================
self.addEventListener('push', (event) => {
  const data = event.data?.json() || {};
  
  const options = {
    body: data.body || 'Dream OS Notification',
    icon: '/assets/icons/icon-192x192.png',
    badge: '/assets/icons/icon-96x96.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: data.primaryKey || 1
    },
    actions: [
      { action: 'open', title: 'Open App' },
      { action: 'dismiss', title: 'Dismiss' }    ]
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title || 'Dream OS 2026', options)
  );
});

// ============================================
// NOTIFICATION CLICK
// ============================================
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.matchAll({ type: 'window' })
        .then((clientList) => {
          for (const client of clientList) {
            if (client.url === '/' && 'focus' in client) {
              return client.focus();
            }
          }
          if (clients.openWindow) {
            return clients.openWindow('/');
          }
        })
    );
  }
});

// ============================================
// BACKGROUND SYNC
// ============================================
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-data') {
    event.waitUntil(syncData());
  }
});

async function syncData() {
  console.log('[SW] Background sync triggered');
  // Implement your sync logic here
}

// ============================================
// MESSAGE HANDLING
// ============================================
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_URLS') {
    event.waitUntil(
      caches.open(DYNAMIC_CACHE)
        .then((cache) => cache.addAll(event.data.urls))
    );
  }
});

// ============================================
// PERIODIC BACKGROUND SYNC (Chrome 89+)
// ============================================
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'periodic-prayer-update') {
    event.waitUntil(updatePrayerTimes());
  }
});

async function updatePrayerTimes() {
  console.log('[SW] Updating prayer times in background');
  // Fetch and cache new prayer times
}

console.log('[SW] Service Worker loaded successfully');
