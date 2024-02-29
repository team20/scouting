// Increment when you update the repo
const cacheName = "Team20-Scouting-v27";

const resources = [
	"/scouting/",
	"/scouting/dark_logo.svg",
	"/scouting/favicon.svg",
	"/scouting/logo-no-text.svg",
	"/scouting/assets/elements.js",
	"/scouting/assets/index.js",
	"/scouting/assets/vaadin-confirm-dialog.js",
	"/scouting/assets/vaadin-iconset.js",
	"/scouting/assets/vaadin-text-area.js",
	"/scouting/blue_br.png",
	"/scouting/blue_rb.png",
	"/scouting/red_br.png",
	"/scouting/red_rb.png"
];
for (let i = 1; i < 6; i++) {
	resources.push(`/scouting/red_outline_${i}.svg`);
	resources.push(`/scouting/blue_outline_${i}.svg`);
}

self.addEventListener("install", (e) => {
	console.log("[Service Worker] Install");
	e.waitUntil(
		(async () => {
			// Retrieve our cache object
			const cache = await caches.open(cacheName);
			console.log("[ServiceWorker] Caching assets");
			await cache.addAll(resources);
		})()
	);
});
self.addEventListener("fetch", (e) => {
	e.respondWith(
		(async () => {
			// Check if the requested resource is in the cache
			const r = await caches.match(e.request);
			console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
			// If the resource is in the cache, respond back with the resource
			if (r) {
				return r;
			}
			console.log(e.requests);
			// Otherwise, download the resource
			const response = await fetch(e.request);
			// Retrieve our cache object
			const cache = await caches.open(cacheName);
			console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
			// Add the resource to the cache
			cache.put(e.request, response.clone());
			// Respond to the request with the resource
			return response;
		})()
	);
});
self.addEventListener("activate", (e) => {
	e.waitUntil(
		// Iterate through the names of all the cache objects
		caches.keys().then((keyList) => {
			return Promise.all(
				keyList.map((key) => {
					// If the one of the cache objects shares the same name with our current cache name, return
					if (key === cacheName) {
						return;
					}
					// Otherwise, delete it, as it is no longer needed
					return caches.delete(key);
				})
			);
		})
	);
});
