const C='bettys-v7';
const CORE=['./','./index.html','./manifest.webmanifest','./images/logo.webp','./images/sand-pie.webp','./images/icon-192.png','./images/qr-facebook.webp'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||r.headers.get('range')||/\.(mp4|mp3)$/.test(new URL(r.url).pathname))return;
  if(r.mode==='navigate'){e.respondWith(fetch(r).then(res=>{caches.open(C).then(c=>c.put('./index.html',res.clone()));return res;}).catch(()=>caches.match('./index.html')));return;}
  if(new URL(r.url).origin!==location.origin)return;
  e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{if(res.ok){const cl=res.clone();caches.open(C).then(c=>c.put(r,cl));}return res;})));});
