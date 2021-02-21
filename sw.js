/* global importScripts, workbox */

'use strict';

importScripts('https://cdn.jsdelivr.net/npm/workbox-cdn/workbox/workbox-sw.js');

const { NetworkFirst, StaleWhileRevalidate, CacheFirst } = workbox.strategies;
const { registerRoute } = workbox.routing;
const { ExpirationPlugin } = workbox.expiration;



registerRoute('/', new NetworkFirst({"cacheName":"index","plugins":[]}), 'GET');
registerRoute('regexp:^https:\/\/cdn\.jsdelivr\.net/', new StaleWhileRevalidate({"cacheName":"jsdelivr","plugins":[]}), 'GET');
registerRoute('regexp:^https:\/\/images\.weserv\.nl/', new CacheFirst({"cacheName":"imagesweserv","plugins":[new ExpirationPlugin({"maxEntries":60,"maxAgeSeconds":2592000})]}), 'GET');

workbox.googleAnalytics.initialize();


