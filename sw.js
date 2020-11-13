importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
    console.log('Workbox berhasil dimuat!')
} else {
    console.log('Workbox gagal dimuat!')
}

workbox.precaching.precacheAndRoute([
    { url: '/', revision: 1},
    { url: '/index.html', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/favicon.ico', revision: 1},
    { url: '/sw.js', revision: 1},
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/css/style.css', revision: '1' },
    { url: '/img/icon-192x192.png', revision: '1' },
    { url: '/img/icon-512x512.png', revision: '1' },
    { url: '/img/maskable-icon.png', revision: '1' },
    { url: '/img/notification.png', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/bookmark.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },
    { url: '/js/detail.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/index.js', revision: '1' },
    { url: '/js/standings.js', revision: '1' },
    { url: '/js/teams.js', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/pages/bookmark.html', revision: '1' },
    { url: '/pages/detail.html', revision: '1' },
    { url: '/pages/standings.html', revision: '1' },
], {
    ignoreUrlParametersMatching: [/.*/]
});


workbox.routing.registerRoute(
    ({url}) => url.origin === 'https://fonts.googleapis.com',
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'fonts'
    })
)
workbox.routing.registerRoute(
    ({url}) => url.origin === 'https://fonts.gstatic.com',
    workbox.strategies.cacheFirst({
        cacheName: 'fonts'
    })
)

workbox.routing.registerRoute(
    ({url}) => url.origin === 'https://crests.football-data.org',
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 10
            })
        ]
    })
)

// Reg Data
workbox.routing.registerRoute(
    ({url}) => url.origin === 'https://api.football-data.org',
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'football-data',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 10
            })
        ]
    })
)



self.addEventListener('push', event => {
    let body;

    if(event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }

    const options = {
        body: body,
        icon: 'img/notification.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
})