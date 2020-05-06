importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, StaleWhileRevalidate, NetworkOnly } = workbox.strategies;
const { CacheableResponse, CacheableResponsePlugin } = workbox.cacheableResponse;
const { ExpirationPlugin } = workbox.expiration;
const { BackgroundSyncPlugin } = workbox.backgroundSync
const googleAnalytics = workbox.googleAnalytics;

const bgSyncPlugin = new BackgroundSyncPlugin('ConnectAppBgSync', {
    maxRetentionTime: 24 * 60 // Retry for max of 24 Hours (specified in minutes)
});

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
    new StaleWhileRevalidate({
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
    new RegExp('https://us-central1-nih-nci-dceg-episphere-dev.cloudfunctions.net/.+'),
    new NetworkOnly({
      plugins: [bgSyncPlugin]
    }),
    'POST'
);

workbox.precaching.precacheAndRoute([{url: 'index.html', revision: `${new Date().getTime()}`}]);

// importScripts('https://www.gstatic.com/firebasejs/7.14.2/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/7.14.2/firebase-messaging.js');

// firebase.initializeApp({
//     apiKey: "AIzaSyDe3Ewzl4x7hEX30EiQJ0tvXBtzd2Hghiw",
//     authDomain: "nih-nci-dceg-episphere-dev.firebaseapp.com",
//     projectId: "nih-nci-dceg-episphere-dev",
//     storageBucket: "nih-nci-dceg-episphere-dev.appspot.com",
//     messagingSenderId: "1061219778575",
//     appId: "1:1061219778575:web:c9f40bbc7ec2cdccc5637a"
// });
// const messaging = firebase.messaging();
// messaging.setBackgroundMessageHandler(function(payload) {
//     console.log(payload);
//     const notificationTitle = 'Background Message Title';
//     const notificationOptions = {
//       body: 'Background Message body.',
//       icon: '/firebase-logo.png'
//     };
  
//     return self.registration.showNotification(notificationTitle, notificationOptions);
// });