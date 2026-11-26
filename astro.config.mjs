// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://cihanduran.com',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  i18n: {
    defaultLocale: 'tr',
    locales: ['tr'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [react(), sitemap()],
  devToolbar: { enabled: false },
  prefetch: false,
});
