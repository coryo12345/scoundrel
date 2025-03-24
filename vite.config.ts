import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: { isCustomElement: (tag: string) => ['pwa-install'].includes(tag) },
      },
    }),
    vueJsx(),
    vueDevTools(),
    tailwindcss(),
    VitePWA({
      includeAssets: [
        'favicon.ico',
        'font/GrechenFuemen-Regular.ttf',
        'font/Teko-VariableFont_wght.ttf',
      ],
      registerType: 'autoUpdate',
      devOptions: { enabled: true },
      manifest: {
        name: 'Scoundrel',
        short_name: 'Scoundrel',
        description: 'A solo dungeon crawl',
        theme_color: '#000000',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',
  },
});
