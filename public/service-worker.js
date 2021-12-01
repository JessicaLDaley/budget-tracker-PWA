const FILES_TO_CACHE = [
    "/", 
    "./public/index.html", 
    "./public/js/index.js", 
    "./public/css/styles.css", 
    "./public/icons/icon-72x72.png",
    "./public/icons/icon-96x96.png",
    "./public/icons/icon-128x128.png",
    "./public/icons/icon-144x144.png",
    "./public/icons/icon-152x152.png",
    "./public/icons/icon-192x192.png",
    "./public/icons/icon-384x384.png",
    "./public/icons/icon-512x512.png"
  ];
  
  const CACHE_NAME = "static-cache-v2";
  const DATA_CACHE_NAME = "data-cache-v1";
  
  // install
  self.addEventListener("install", function (evt) {
    evt.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
        console.log("Files pre-cached successfully!");
        return cache.addAll(FILES_TO_CACHE);
      })
    );
  
    self.skipWaiting();
  });

  // activate
  self.addEventListener("activate", function (evt) {
    evt.waitUntil(
      caches.keys().then(keyList => {
        return Promise.all(
          keyList.map(key => {
            if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
              console.log("Removing old cache data", key);
              return caches.delete(key);
            }
          })
        );
      })
    );
  
    self.clients.claim();
  });