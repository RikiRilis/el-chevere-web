// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';


import preact from '@astrojs/preact';


// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), preact()],
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false
    },
  },
  output: 'server',
  build: {
        inlineStylesheets: 'always',
    },
    compressHTML: true,
    prefetch: true,
    devToolbar: {
        enabled: false,
    },
});