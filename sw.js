// Offline support: serve the app from cache, refresh it from the network when online.
const CACHE='masrofat-v34';
const FILES=['./','./index.html','./manifest.webmanifest','./icon2-192.png','./icon2-512.png','./icon3-180.png','./qr.png','./icon3-maskable-512.png','./logo.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const same=new URL(e.request.url).origin===location.origin;
  if(!same)return; // Google Drive, Firebase and the dollar rate go straight to the network
  e.respondWith(fetch(e.request,same?{cache:'no-cache'}:undefined).then(r=>{const c=r.clone();if(r.ok&&new URL(e.request.url).origin===location.origin)caches.open(CACHE).then(x=>x.put(e.request,c));return r})
    .catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));
});
