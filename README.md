# Lab8-CSE110

## Lab Partners
- Evan Marriott

## Deployed GitHub Pages URL
https://evanmarriott.github.io/Lab8-CSE110/

## Graceful Degradation and Service Workers

Graceful degradation and service workers are closely related because service workers are essentially a tool that enables graceful degradation in web applications. Graceful degradation means designing your app to work at full capacity when all resources are available, but still function (even if with reduced features) when something breaks or is unavailable. Service workers let us do exactly this with network connectivity — when the user has a working internet connection, the app fetches fresh data and caches it. But when the user goes offline or has a slow connection, the service worker intercepts those network requests and serves cached responses instead, so the app doesn't just break. Without service workers, losing internet means losing the whole app. With them, the app degrades gracefully by falling back to cached content rather than showing an error page.
