importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');
importScripts('./appVersion.js');

workbox.setConfig({debug: false});
const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, StaleWhileRevalidate, NetworkOnly } = workbox.strategies;
const { CacheableResponse, CacheableResponsePlugin } = workbox.cacheableResponse;
const { ExpirationPlugin } = workbox.expiration;
const { BackgroundSyncPlugin } = workbox.backgroundSync
const googleAnalytics = workbox.googleAnalytics;

googleAnalytics.initialize();
registerRoute(/\.(?:js|css)$/, new NetworkFirst({cacheName: 'static-cache'}));
registerRoute(/\.(?:png|jpg|jpeg|svg|gif|ico)$/,
    new CacheFirst({
        cacheName: 'images-cache',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 30,
                maxAgeSeconds: 7 * 24 * 60 * 60,
            })
        ]
    })
);

registerRoute(
    new RegExp('https://us-central1-nih-nci-dceg-episphere-dev.cloudfunctions.net/.+'),
    new NetworkFirst({
        cacheName: 'api-cache',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [200],
            })
        ]
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
            })
        ]
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
            })
        ]
    }),
    'GET'
);

const bgSyncPlugin = new BackgroundSyncPlugin('ConnectAppBgSync', {
    maxRetentionTime: 7 * 24 * 60 // Retry for max of 24 Hours (specified in minutes)
});

registerRoute(
    new RegExp('https://us-central1-nih-nci-dceg-episphere-dev.cloudfunctions.net/.+'),
    new NetworkOnly({
      plugins: [bgSyncPlugin]
    }),
    'POST'
);

registerRoute(
    new RegExp('https://api-myconnect-stage.cancer.gov/.+'),
    new NetworkOnly({
      plugins: [bgSyncPlugin]
    }),
    'POST'
);

registerRoute(
    new RegExp('https://api-myconnect.cancer.gov/.+'),
    new NetworkOnly({
      plugins: [bgSyncPlugin]
    }),
    'POST'
);

workbox.precaching.precacheAndRoute([{url: 'index.html', revision: '1.0.5'}]);

const cacheVersionName = `app-version-cache`;
const precacheVersionAssets = ['/appVersion.js'];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheVersionName)
            .then((cache) => {
                return cache.keys()
                    .then((keys) => {
                        const deletionPromises = keys
                            .filter(key => key.url.includes('app-version-cache'))
                            .map(key => cache.delete(key));
                            return Promise.all(deletionPromises);
            })
            .then(() => cache.addAll(precacheVersionAssets));
            })
            .then(() => {
                self.skipWaiting(); // Forces the waiting service worker to become the active service worker
                console.log('Service Worker installed');
            })
            .catch(error => {
                console.error('Cache update failed:', error);
            })
    );
});