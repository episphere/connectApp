importScripts('https://www.gstatic.com/firebasejs/7.14.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.2/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyDe3Ewzl4x7hEX30EiQJ0tvXBtzd2Hghiw",
    authDomain: "nih-nci-dceg-episphere-dev.firebaseapp.com",
    projectId: "nih-nci-dceg-episphere-dev",
    storageBucket: "nih-nci-dceg-episphere-dev.appspot.com",
    messagingSenderId: "1061219778575",
    appId: "1:1061219778575:web:c9f40bbc7ec2cdccc5637a"
});

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(payload => {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon,
        vibrate: [100, 50, 100]
    };
    return self.registration.showNotification(notificationTitle, notificationOptions);
})