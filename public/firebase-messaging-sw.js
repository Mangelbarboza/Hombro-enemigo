/* global firebase */
importScripts('https://www.gstatic.com/firebasejs/12.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyDKaItvyuxJ7cQ89KqhWmmWU7nnnV30fwA',
  authDomain: 'hombro-enemigo.firebaseapp.com',
  projectId: 'hombro-enemigo',
  storageBucket: 'hombro-enemigo.firebasestorage.app',
  messagingSenderId: '863400756204',
  appId: '1:863400756204:web:7d58dedd483d28a648b6c9'
});

firebase.messaging().onBackgroundMessage(payload => {
  const data = payload.data || {};
  self.registration.showNotification(data.title || 'Hombro Enemigo', {
    body: data.body || 'Tienes una notificación nueva.',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: data.notificationId || 'hombro-enemigo',
    data: { url: data.url || '/' }
  });
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const url = event.notification.data?.url || '/';
  event.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windows => {
    const existing = windows.find(client => new URL(client.url).origin === self.location.origin);
    return existing ? existing.focus().then(() => existing.navigate(url)) : clients.openWindow(url);
  }));
});
