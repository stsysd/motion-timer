self.addEventListener('install', () => {
  console.info('installed');
});

self.addEventListener('activate', () => {
  console.info('service worker activated');
});

self.addEventListener('fetch', () => {
  console.info('fetch event occurred');
});
