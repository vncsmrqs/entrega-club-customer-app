console.log('Custom service worker!');

self.addEventListener(
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
      self.clients
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

          if (self.clients.openWindow)
            return self.clients.openWindow('/pedidos');
        }),
    );
  },
  false,
);
