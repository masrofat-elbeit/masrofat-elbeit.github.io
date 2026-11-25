// Offline support. The app opens straight from the phone's copy, with or without internet,
// and quietly fetches the newest version in the background for the next time it opens.
const CACHE='masrofat-v38';
const FONTS='masrofat-fonts'; // Google Fonts, kept across versions so the app looks the same offline
const FILES=['./','./index.html','./manifest.webmanifest','./icon2-192.png','./icon2-512.png','./icon3-180.png','./qr.png','./icon3-maskable-512.png','./logo.png','./privacy.html'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>Promise.all(FILES.map(f=>fetch(f,{cache:'reload'}).then(r=>r.ok&&c.put(f,r)).catch(()=>{})))));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE&&k!==FONTS).map(k=>caches.delete(k)))));self.clients.claim()});
const timeout=(p,ms)=>Promise.race([p,new Promise((_,no)=>setTimeout(()=>no(new Error('slow')),ms))]);
self.addEventListener('fetch',e=>{
  const req=e.request;if(req.method!=='GET')return;
  const u=new URL(req.url);
  if(u.hostname==='fonts.googleapis.com'||u.hostname==='fonts.gstatic.com'){ // fonts: phone's copy first
    e.respondWith(caches.open(FONTS).then(c=>c.match(req).then(hit=>hit||fetch(req).then(r=>{if(r.ok||r.type==='opaque')c.put(req,r.clone());return r}))));return}
  if(u.origin!==location.origin)return; // Google Drive, Google sign-in and the dollar rate go straight to the network
  const nav=req.mode==='navigate';
  const key=nav?'./index.html':req; // the page is the same with or without ?install=1
  e.respondWith(caches.open(CACHE).then(async c=>{
    const hit=await c.match(key,{ignoreSearch:nav});
    const fresh=fetch(req,{cache:'no-cache'}).then(r=>{if(r.ok&&!u.search)c.put(nav?'./index.html':req,r.clone());else if(r.ok&&nav)c.put('./index.html',r.clone());return r});
    if(hit){e.waitUntil(fresh.catch(()=>{}));return hit} // open instantly from the phone; update in the background
    try{return await timeout(fresh,8000)}catch(err){return (await c.match('./index.html'))||Response.error()}
  }));
});
