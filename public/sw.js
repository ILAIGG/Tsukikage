// The production build replaces this marker with every generated application asset.
const BUILD_FILES = /* PRECACHE */ [];
const BASE_PATH = new URL('.', self.location.href).pathname;
const ROOT = new URL(BASE_PATH, self.location.origin).href;
const PREFIX = `tsukikage-${BASE_PATH}-`;
const CACHE = PREFIX + 'BUILD_ID';
const SHELL_FILES = ['manifest.webmanifest','tsukikage-mark.svg','icon-192.png','icon-512.png','LICENSE','THIRD_PARTY_NOTICES.md','THIRD_PARTY_LICENSES.md','PRIVACY.md','theme-example.json'];
const shellUrl = path => new URL(path, ROOT).href;
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll([ROOT,...SHELL_FILES.map(shellUrl),...BUILD_FILES.map(shellUrl)]))));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith(PREFIX) && key !== CACHE).map(key => caches.delete(key))))));
self.addEventListener('fetch', event => {
 const request = event.request;
 if(request.method !== 'GET' || new URL(request.url).origin !== self.location.origin || !new URL(request.url).pathname.startsWith(BASE_PATH))return;
 // Serve each installed shell with its matching hashed chunks until the next worker activates.
 event.respondWith(caches.open(CACHE).then(async cache => {
  const cached=await cache.match(request.mode==='navigate'?ROOT:request);
  if(cached)return cached;
  return fetch(request);
 }));
});
