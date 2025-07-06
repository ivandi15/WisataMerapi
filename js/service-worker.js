const CACHE_NAME = 'wisata-merapi-vr1';
const urlsToCache = [
    '../index.html',
    '../css/style.css',
    './main.js',
    '../json/manifest.json',
    '../offline.html',
    '../images/LogoMerapi.png',
    '../images/BukitKlangon.jpeg',
    '../images/BungkerKaliadem.jpeg',
    '../images/KaliTalang.jpeg',
    '../images/MerapiGolfYogyakarta.jpeg',
    '../images/StonehengeYogyakarta.jpeg',
    '../images/PlunyonKalikuning.jpeg',
    '../images/TerasMerapi.jpeg',
    '../images/MusiumPetilasanMbahMaridjan.jpg',
    '../images/TlogoMuncar.jpeg',
    '../images/TheLostWorldCastle.jpeg',
    '../images/SuralokaInteractiveZoo.jpeg',
    '../images/WisataLavaMerapidanBatuAlien.jpeg',
    '../images/LavaTourMerapi.jpeg',
    '../images/UllenSentaluMuseum.jpeg',
    '../images/Bg1.jpeg',
    '../images/Bg4.jpeg',
    '../images/Bg5.jpeg',
    '../images/Bg7.jpeg',
    '../images/Bg8.jpeg',
    '../images/Bg9.jpeg',
    '../images/Bg10.jpeg',
    '../images/Bg11.jpeg',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // return cache if found, otherwise fetch from network
      return response || fetch(event.request);
    }).catch(() => {
      // fallback untuk mode offline (opsional, bisa ditambahkan halaman offline khusus)
    })
  );
});
