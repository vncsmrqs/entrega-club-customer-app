import { fileURLToPath, URL } from 'node:url';
import { VitePWA } from 'vite-plugin-pwa';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { CompileTsServiceWorker } from './vite.config.sw-custom-compiler-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,vue,txt,woff2}'],
        importScripts: ['./handle-notifications.sw.js'],
      },
      manifest: {
        theme_color: '#7d3af2',
        background_color: '#7d3af2',
        display: 'standalone',
        scope: '/',
        start_url: '/?utm_source=homescreen&utm_medium=shortcut',
        name: 'Entrega Club',
        short_name: 'Entrega Club',
        description: 'Seu app de entrega de comida e bebida',
        screenshots: [
          {
            src: '/screenshot-1-586x1041.png',
            sizes: '586x1041',
            type: 'image/png',
          },
          {
            src: '/screenshot-1-586x1041.png',
            sizes: '586x1041',
            type: 'image/png',
          },
          {
            src: '/screenshot-1-586x1041.png',
            sizes: '586x1041',
            type: 'image/png',
          },
        ],
        shortcuts: [
          {
            name: 'Buscar',
            url: '/buscar?utm_source=jumplist&utm_medium=shortcut',
            icons: [
              {
                src: 'icon-circle-192x192.png',
                type: 'image/png',
                sizes: '192x192',
              },
            ],
          },
          {
            name: 'Pedidos',
            url: '/pedidos?utm_source=jumplist&utm_medium=shortcut',
            icons: [
              {
                src: 'icon-circle-192x192.png',
                type: 'image/png',
                sizes: '192x192',
              },
            ],
          },
          {
            name: 'Notificações',
            url: '/notificacoes?utm_source=jumplist&utm_medium=shortcut',
            icons: [
              {
                src: 'icon-circle-192x192.png',
                type: 'image/png',
                sizes: '192x192',
              },
            ],
          },
          {
            name: 'Menu',
            url: '/menu?utm_source=jumplist&utm_medium=shortcut',
            icons: [
              {
                src: '/icon-circle-192x192.png',
                type: 'image/png',
                sizes: '192x192',
              },
            ],
          },
        ],
        icons: [
          {
            src: '/icon-circle-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-circle-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            purpose: 'maskable',
            src: '/icon-maskable-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            purpose: 'maskable',
            src: '/icon-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
    CompileTsServiceWorker(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
