importScripts(
	'https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js'
);

const appVersion = 'v24.12.0';
workbox.setConfig({ debug: false });
const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, StaleWhileRevalidate, NetworkOnly } =
	workbox.strategies;
const { CacheableResponse, CacheableResponsePlugin } =
	workbox.cacheableResponse;
const { ExpirationPlugin } = workbox.expiration;
const { BackgroundSyncPlugin } = workbox.backgroundSync;
const googleAnalytics = workbox.googleAnalytics;
const cacheNameMapper = {
	'static-cache': `static-cache-${appVersion}`,
	'images-cache': `images-cache-${appVersion}`,
};
const currCacheNameArray = Object.values(cacheNameMapper);

googleAnalytics.initialize();
registerRoute(
	/\.(?:js|css|html|pdf)$/,
	new NetworkFirst({ cacheName: cacheNameMapper['static-cache'] })
);
registerRoute(
	/\.(?:png|jpg|jpeg|svg|gif|ico)$/,
	new CacheFirst({
		cacheName: cacheNameMapper['images-cache'],
		plugins: [
			new ExpirationPlugin({
				maxEntries: 30,
				maxAgeSeconds: 7 * 24 * 60 * 60,
			}),
		],
	})
);

registerRoute(
	new RegExp(
		'https://us-central1-nih-nci-dceg-episphere-dev.cloudfunctions.net/.+'
	),
	new NetworkFirst({
		cacheName: 'api-cache',
		plugins: [
			new CacheableResponsePlugin({
				statuses: [200],
			}),
		],
	}),
	'GET'
);

registerRoute(
	new RegExp('https://api-myconnect-stage.cancer.gov/.+'),
	new NetworkFirst({
		cacheName: 'api-cache',
		plugins: [
			new CacheableResponsePlugin({
				statuses: [200],
			}),
		],
	}),
	'GET'
);

registerRoute(
	new RegExp('https://api-myconnect.cancer.gov/.+'),
	new NetworkFirst({
		cacheName: 'api-cache',
		plugins: [
			new CacheableResponsePlugin({
				statuses: [200],
			}),
		],
	}),
	'GET'
);

const bgSyncPlugin = new BackgroundSyncPlugin('ConnectAppBgSync', {
	maxRetentionTime: 7 * 24 * 60, // Retry for max of 24 Hours (specified in minutes)
});

registerRoute(
	new RegExp(
		'https://us-central1-nih-nci-dceg-episphere-dev.cloudfunctions.net/.+'
	),
	new NetworkOnly({
		plugins: [bgSyncPlugin],
	}),
	'POST'
);

registerRoute(
	new RegExp('https://api-myconnect-stage.cancer.gov/.+'),
	new NetworkOnly({
		plugins: [bgSyncPlugin],
	}),
	'POST'
);

registerRoute(
	new RegExp('https://api-myconnect.cancer.gov/.+'),
	new NetworkOnly({
		plugins: [bgSyncPlugin],
	}),
	'POST'
);

self.addEventListener('install', () => {
	self.skipWaiting();
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (!currCacheNameArray.includes(cacheName)) {
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});

self.addEventListener('message', (event) => {
	if (event.data.action === 'getAppVersion') {
		event.source.postMessage({ action: 'sendAppVersion', payload: appVersion });
	}
});
