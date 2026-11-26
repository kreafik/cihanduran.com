// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { NOINDEX_PATHS } from './src/lib/routing.mjs';

export default defineConfig({
  site: 'https://cihanduran.com',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'always' },
  i18n: {
    defaultLocale: 'tr',
    locales: ['tr'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    react(),
    // noindex sayfalar ve 404 site haritasına girmez.
    sitemap({ filter: (page) => { const p = new URL(page).pathname.replace(/\/$/, '') || '/'; return p !== '/404' && !NOINDEX_PATHS.has(p); } }),
  ],
  devToolbar: { enabled: false },
  prefetch: false,
});
