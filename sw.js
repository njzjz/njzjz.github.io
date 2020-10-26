/* global importScripts, workbox */

'use strict';

importScripts('https://cdn.jsdelivr.net/npm/workbox-sw@5/build/workbox-sw.min.js');

const { NetworkFirst, StaleWhileRevalidate, CacheFirst } = workbox.strategies;
const { registerRoute } = workbox.routing;
const { ExpirationPlugin } = workbox.expiration;
const { CacheableResponsePlugin } = workbox.cacheableResponse;



registerRoute('/', new NetworkFirst({"cacheName":"index","plugins":[]}), 'GET');
registerRoute(/\.(?:js|css)$/, new StaleWhileRevalidate({"cacheName":"js-css","plugins":[]}), 'GET');
registerRoute(/\.(?:png|gif|jpg|jpeg|svg)$/, new CacheFirst({"cacheName":"images","plugins":[new ExpirationPlugin({"maxEntries":60,"maxAgeSeconds":2592000})]}), 'GET');
registerRoute(/^https:\/\/fonts\.googleapis\.com/, new StaleWhileRevalidate({"cacheName":"google-fonts-stylesheets","plugins":[]}), 'GET');
registerRoute(/^https:\/\/fonts\.gstatic\.com/, new CacheFirst({"cacheName":"google-fonts-webfonts","plugins":[new CacheableResponsePlugin({"statuses":[0,200]}),new ExpirationPlugin({"maxAgeSeconds":31536000})]}), 'GET');
registerRoute(/^https:\/\/cdn\.jsdelivr\.net/, new StaleWhileRevalidate({"cacheName":"jsdelivr","plugins":[]}), 'GET');
registerRoute(/^https:\/\/images\.weserv\.nl/, new CacheFirst({"cacheName":"imagesweserv","plugins":[new ExpirationPlugin({"maxEntries":60,"maxAgeSeconds":2592000})]}), 'GET');
registerRoute(/^https:\/\/img\.njzjz\.win/, new CacheFirst({"cacheName":"imagesredirect","plugins":[new ExpirationPlugin({"maxEntries":60,"maxAgeSeconds":2592000})]}), 'GET');




