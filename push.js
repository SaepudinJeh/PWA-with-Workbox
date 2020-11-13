const webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BDgaQ0RPKaNbgUAck8a9Uv1fPloMt6ILpC_FckrjW8MDZW3UyrJ2qBCHFDRz6VYRFYTOHe-J9wD69IOaOPFDlcQ",
    "privateKey": "xteGiQpZeeD-b6B1f30562RAXc4CYK-TbrCyuTxfrOg"
};


webPush.setVapidDetails(
    'mailto: example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

var pushSubcription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/dLclCeJWYwA:APA91bEDqREubmc5GaXn3gM8R7U8ZvtC2Eshz6bvQ5z-GibiMpYd9wgVyqIZwS7jjzPfSLbKyC7tiHPsRP9NnVNKC8CmwM9qCmJpXDkKdAJ76iJw2174wlJZzQdwbhik543eFqFZiA-t",
    "keys": {
        "p256dh": "BG9ySmk9Apigfehu9GnNGj4ke4YI6OkA6O3u35vyG6mn6V5YdZAyIaP+ac01WHzHTaL+J2uEhcprpfNw1Ts9GUo=",
        "auth": "jX/y/7lWh26QR6/ZVjl9fw=="
    }
};

const payload = "Ini adalah notifikasi sederhana dari Subscribe ke layanan FCM!"

const options = {
    gcmAPIKey: "511344127256",
    TTL: 60
}

webPush.sendNotification(
    pushSubcription,
    payload,
    options
);