/// <reference lib="esnext" />
/// <reference lib="webworker" />

console.log('Custom service worker!');

const sw = self as unknown as ServiceWorkerGlobalScope & typeof globalThis;

sw.addEventListener(
  'notificationclick',
  (event) => {
    console.log('notificationclick');

    event.notification.close();

    if (event.action === 'archive') {
      // User selected the Archive action.
      // archiveEmail();
    } else {
      // User selected (e.g., clicked in) the main body of notification.
      // clients.openWindow('/inbox');
    }

    event.waitUntil(
      sw.clients
        .matchAll({
          type: 'window',
        })
        .then(async (clientList) => {
          console.log(clientList);
          for (const client of clientList) {
            // if (client.url === '/' && 'focus' in client)
            await client.focus();
            return client.navigate('/pedidos');
          }

          if (sw.clients.openWindow) return sw.clients.openWindow('/pedidos');
        }),
    );
  },
  false,
);
