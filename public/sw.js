const CACHE = 'tsukikage-shell-v5';
const BASE_PATH = new URL('.', self.location.href).pathname;
const ROOT = new URL(BASE_PATH, self.location.origin).href;
const SHELL_FILES = ['manifest.webmanifest','tsukikage-mark.svg','icon-192.png','icon-512.png','LICENSE','THIRD_PARTY_NOTICES.md','THIRD_PARTY_LICENSES.md','PRIVACY.md','theme-example.json'];
const shellUrl = path => new URL(path, ROOT).href;
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll([ROOT,...SHELL_FILES.map(shellUrl)]))));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))));
self.addEventListener('fetch', event => { const request = event.request; if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return; event.respondWith(fetch(request).then(response => { if (response.ok && request.destination !== 'document') { const copy = response.clone(); void caches.open(CACHE).then(cache => cache.put(request, copy)); } return response; }).catch(async () => (await caches.match(request)) || (request.mode === 'navigate' ? caches.match(ROOT) : Response.error()))); });
