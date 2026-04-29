const CACHE_NAME = "neon-hunter-spin-v3";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./script.js",
  "./manifest.json",
  "./assets/share/telegram-preview.png",
  "./assets/symbols/icon/wild.png",
  "./assets/symbols/icon/scatter.png",
  "./assets/symbols/icon/bonus.png",
  "./assets/symbols/icon/crown.png",
  "./assets/symbols/icon/diamond.png",
  "./assets/symbols/icon/seven.png",
  "./assets/symbols/icon/bar.png",
  "./assets/symbols/icon/A.png",
  "./assets/symbols/icon/K.png",
  "./assets/symbols/icon/Q.png",
  "./assets/symbols/icon/J.png",
  "./assets/symbols/icon/ten.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
      .catch(() => undefined)
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put("./index.html", copy));
          return response;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      return (
        cached ||
        fetch(request).then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
      );
    })
  );
});
