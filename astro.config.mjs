import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://elmcityphotography.com',
  output: 'static',
  trailingSlash: 'always',
  redirects: {
    '/pricing/': '/engagement-pricing/',
  },
  integrations: [mdx(), sitemap({ filter: (page) => !page.includes('/galleries/') })],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    responsiveStyles: false,
  },
});
