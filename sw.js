/* Prváčik doma: práca bez internetu.
   Stránky, karty a skripty: najprv sieť (aby nové karty prišli hneď), bez siete posledná uložená verzia.
   Písma, obrázky a PDF: najprv uložená verzia, čerstvá sa stiahne na pozadí. Nič sa nikam neposiela. */
const CACHE = "prvacik-v1";
const ZAKLAD = ["./", "index.html", "karty.js", "kocky.js", "kocky.css", "pismo.css", "kocky.html", "pismenka.html",
  "slovnik.html", "slovnik.js", "slovnik.css", "anj-slova.js", "hlavicka.css", "manifest.webmanifest", "ikony/ikona.svg",
  "pismo/ah-400.woff2", "pismo/ah-400-ext.woff2", "pismo/ah-700.woff2", "pismo/ah-700-ext.woff2", "pismo/lexend.woff2", "pismo/lexend-ext.woff2"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.allSettled(ZAKLAD.map(u => c.add(u)))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== "GET" || u.origin !== location.origin) return;
  const uloz = (odp) => { if (odp && odp.ok) { const kopia = odp.clone(); caches.open(CACHE).then(c => c.put(r, kopia)); } return odp; };
  const nemenne = /\.(woff2|ttf|png|pdf|svg|webp)$/.test(u.pathname);
  /* uložená verzia hneď, na pozadí sa stiahne čerstvá (opravený list sa ukáže pri ďalšom otvorení) */
  if (nemenne) e.respondWith(caches.match(r).then(m => { const siet = fetch(r).then(uloz).catch(() => m); return m || siet; }));
  else e.respondWith(fetch(r).then(uloz).catch(() => caches.match(r, {ignoreSearch: true}).then(m => m || caches.match("index.html"))));
});
