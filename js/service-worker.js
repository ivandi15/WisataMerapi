const CACHE_NAME = 'wisata-merapi-v1';
const urlsToCache = [
  '/',
  '../index.html',
  '../css/style.css',
  '../json/manifest.json',
  './main.js',
  '../images/LogoMerapi.png',
  // Background hero images
  '../images/Bg1.jpeg',
  '../images/Bg4.jpeg',
  '../images/Bg5.jpeg',
  '../images/Bg7.jpeg',
  '../images/Bg8.jpeg',
  '../images/Bg9.jpeg',
  '../images/Bg10.jpeg',
  '../images/Bg11.jpeg',
  // Wisata images
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
  // Bootstrap CDN fallback (optional)
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js'
];

// Install service worker & cache static assets
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('Menyimpan aset cache...');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate service worker & hapus cache lama jika ada
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('Menghapus cache lama:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch: ambil dari cache dulu, jika tidak ada ambil dari jaringan
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response; // file ditemukan di cache
        }
        return fetch(event.request); // jika tidak, ambil dari internet
      })
  );
});
