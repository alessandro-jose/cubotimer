// Mudamos para v2 para o navegador saber que mudou tudo
const CACHE_NAME = 'cubo-timer-v2'; 
const COISAS_PARA_CACHEAR = [
  './', 
  './index.html', 
  './manifest.json', 
  './icone.png'
];

// Instala o novo e força ele a chutar o antigo
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(COISAS_PARA_CACHEAR))
  );
  self.skipWaiting(); // Força a ativação imediata
});

// Limpa o cache antigo (v1) para não dar conflito
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim()) // Assume o controle da página na hora
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
