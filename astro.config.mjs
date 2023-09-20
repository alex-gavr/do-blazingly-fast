import preact from '@astrojs/preact';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/static';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  integrations: [preact(), tailwind()],
  output: 'static',
  adapter: vercel({
    imageService: true,
  }),
  build: {
    format: 'directory',
    assets: 'assets',
  },
  vite: {
    build: {
      target: 'es2015',
      cssCodeSplit: false,
    },
  },
  site: 'https://blazingly-fast-do.top/',
});
