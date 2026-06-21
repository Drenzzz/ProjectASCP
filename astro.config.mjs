// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

const siteUrl = import.meta.env.PUBLIC_SITE_URL ?? 'http://localhost:4321';

export default defineConfig({
  site: siteUrl,
  integrations: [react(), sitemap()],
  image: {
    remotePatterns: [
      { protocol: 'https', hostname: 'raw.githubusercontent.com' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'i0.wp.com' },
      { protocol: 'https', hostname: 'i01.appmifile.com' },
    ],
  },
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: vercel(),
});
