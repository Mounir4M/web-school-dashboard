const CACHE_NAME = 'school-dashboard-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Install - cache les fichiers
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .catch(error => console.log('Cache failed:', error))
  );
});

// Fetch - sert depuis le cache ou le réseau
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retourne la version en cache ou va chercher sur le réseau
        return response || fetch(event.request);
      })
      .catch(() => {
        // Si tout échoue, retourne la page principale pour les documents
        if (event.request.destination === 'document') {
          return caches.match('./index.html');
        }
      })
  );
});

console.log('Service Worker loaded');