// 서비스 워커 캐시 강제 삭제 및 업데이트 버전
const CACHE_NAME = 'copy-app-v3-reset';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => caches.delete(cache))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // 캐시를 거치지 않고 항상 네트워크에서 최신 파일 가져오기
  event.respondWith(fetch(event.request));
});
