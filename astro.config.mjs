// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import preact from '@astrojs/preact';
import vercel from '@astrojs/vercel';


// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), preact()],

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

  adapter: vercel(),
});