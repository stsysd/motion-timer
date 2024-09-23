if ('serviceWorker' in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker.register('/motion-timer/sw.js');
  });
}
