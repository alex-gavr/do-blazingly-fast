import preact from '@astrojs/preact';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  integrations: [preact(), tailwind()],
  output: 'server',
  adapter: vercel({
    imageService: true,
    functionPerRoute: true,
  }),
  site: 'https://blazingly-fast-do.top/',
});
