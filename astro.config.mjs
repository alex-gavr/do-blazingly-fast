import preact from '@astrojs/preact';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  integrations: [preact(), tailwind()],
  output: 'hybrid',
  adapter: vercel({
    imageService: true,
  }),
  vite: {
    build: {
      target: 'es2015',
    },
  },
  site: 'https://blazingly-fast-do.top/',
});
