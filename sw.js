// sw.js

self.addEventListener('notificationclick', (event) => {
  const action = event.action;
  
  // Close the notification
  event.notification.close();

  // If the user clicked an action button ('busy' or 'later')
  if (action) {
     // Find the app's window client to send a message to
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
        // If there's an open tab, send it the action message
        if (clientList.length > 0) {
          clientList[0].postMessage({
            type: 'notification-action',
            action: action,
          });
          // Focus the app tab to bring it to the user's attention
          return clientList[0].focus();
        }
      })
    );
  } else {
     // If the user clicked the notification body (not an action button)
     event.waitUntil(
        clients.openWindow('/')
     );
  }
});
