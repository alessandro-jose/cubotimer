const CACHE_NAME = 'cubo-timer-v1';
const COISAS_PARA_CACHEAR = ['./', './index.html', './manifest.json', './icone.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(COISAS_PARA_CACHEAR)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((response) => response || fetch(e.request)));
});
