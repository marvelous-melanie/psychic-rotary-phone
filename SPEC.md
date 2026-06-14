# Photography Portfolio Static Site — Technical Specification

## 1. Goal

Build a fast, responsive, static photography portfolio for wedding, engagement, and portrait work. The site should be visually polished, image-forward, easy to update by adding photos to the repository, and deployable to GitHub Pages without a backend.

**Primary goals:**
- Static deployment to GitHub Pages.
- Images stored in the repository under `src/assets`.
- Beautiful responsive galleries with optimized images.
- Smooth but tasteful animations.
- Multiple pages: home, weddings, engagements, gallery detail pages, about, contact, and optional pricing/FAQ.
- Maintainable architecture that does not require a CMS at launch.

**Non-goals for v1:**
- Client galleries / proofing.
- Password-protected downloads.
- E-commerce or print ordering.
- Server-side contact form handling.
- Real-time CMS editing.

---

## 2. Recommended Stack

### Core Framework
Use **Astro** as the static site generator.

**Why:**
- It outputs static HTML/CSS/JS suitable for GitHub Pages.
- It is excellent for content-heavy marketing and portfolio sites.
- It supports file-based routing, Markdown/MDX content, type-safe content collections, and build-time image optimization.
- It avoids shipping a large React bundle unless specific interactive islands need it.

### Language
Use **TypeScript**.

**Why:**
- Gallery metadata, image manifests, and route generation benefit from type safety.
- TypeScript catches broken gallery data before deployment.

### Styling
Use **Tailwind CSS v4** through the official Vite plugin.

**Why:**
- Fast iteration for responsive layouts.
- Easy to build custom, polished portfolio layouts.
- Works well with Astro components.
- Avoids maintaining a large hand-written CSS system.

### Image Rendering
Use Astro's built-in `astro:assets` package:
- `<Image />` for simple optimized images.
- `<Picture />` for AVIF/WebP/fallback responsive images.
- `getImage()` when a component needs a generated URL for a lightbox-size image.

Store optimized exports from Lightroom in `src/assets/galleries/...`, not in `public/`, because `public/` files are copied as-is and bypass build-time optimization.

### Gallery Lightbox
Use **PhotoSwipe**.

**Why:**
- Mature image lightbox.
- Good touch support.
- Supports zooming, keyboard navigation, and progressive enhancement.
- Requires image dimensions, which Astro image metadata provides.

### Animation Strategy
Use mostly CSS and Astro-native features:
- Astro View Transitions for page-to-page polish.
- CSS transitions for hover states and image reveal.
- A tiny IntersectionObserver utility for scroll-reveal effects only if needed.
- Avoid React animation libraries in v1 unless there is a specific interactive requirement.

---

## 3. Package List

Install the core project:
```bash
npm create astro@latest elm-city-photography
cd elm-city-photography
```

Install runtime/build dependencies:
```bash
npm install @astrojs/mdx @astrojs/sitemap photoswipe lucide-astro tailwindcss @tailwindcss/vite
```

Install development quality tools:
```bash
npm install -D typescript @astrojs/check prettier prettier-plugin-astro eslint eslint-plugin-astro
```

Optional later additions:
```bash
npm install -D @playwright/test
```

Recommended `.nvmrc`:
```txt
22.12.0
```

---

## 4. High-Level Architecture

The site is a static Astro app with four layers:
- **Pages** — route-level files in `src/pages`.
- **Layouts** — shared page shells in `src/layouts`.
- **Components** — reusable UI pieces in `src/components`.
- **Content + assets** — gallery metadata in `src/content/galleries` and image files in `src/assets/galleries`.

**Recommended data flow:**
```
src/content/galleries/*.mdx
        │
        │  metadata: title, category, location, date, cover, SEO, etc.
        ▼
src/lib/galleries.ts
        │
        │  merges metadata with images discovered from src/assets/galleries/<slug>/
        ▼
src/pages/galleries/[slug].astro
        │
        │  generates one static page per gallery
        ▼
src/components/LightboxGallery.astro
        │
        │  renders responsive image grid + PhotoSwipe anchors
        ▼
GitHub Pages static output
```

---

## 5. Directory Structure

```
src/
  assets/
    galleries/
      gabby-ruben-engagement/
        0001-cover.jpg
        0002-walking.jpg
        0003-laughing.jpg
      sample-wedding-at-venue/
        0001-cover.jpg
        0002-ceremony.jpg
        0003-couple-portrait.jpg

  components/
    GalleryCard.astro
    GalleryGrid.astro
    LightboxGallery.astro
    PhotoCard.astro
    Seo.astro
    SiteFooter.astro
    SiteHeader.astro
    SkipLink.astro

  content/
    galleries/
      gabby-ruben-engagement.mdx
      sample-wedding-at-venue.mdx

  layouts/
    BaseLayout.astro
    GalleryLayout.astro
    MarketingPageLayout.astro

  lib/
    galleries.ts
    paths.ts
    seo.ts

  pages/
    index.astro
    weddings.astro
    engagements.astro
    about.astro
    contact.astro
    galleries/
      [slug].astro

  styles/
    global.css

public/
  favicon.svg
  robots.txt
  CNAME          # only if using a custom domain
```

**Rule of thumb:**
- Put optimized photography files in `src/assets/galleries`.
- Put favicons, robots, static PDFs, and custom-domain files in `public`.
- Do not put portfolio images in `public` unless you intentionally want no optimization.

---

## 6. Gallery Content Model

Each gallery gets one MDX file in `src/content/galleries`.

**Example:** `src/content/galleries/gabby-ruben-engagement.mdx`
```mdx
---
title: "Gabby & Ruben Engagement"
type: "engagement"
date: "2026-06-01"
location: "New Haven, CT"
cover: "0001-cover.jpg"
featured: true
order: 10
tags:
  - engagement
  - golden hour
  - new haven
description: "A golden-hour engagement session in New Haven."
seoDescription: "Engagement photography session in New Haven, Connecticut by Elm City Photography."
---

Optional story text can go here if you want gallery pages to include a short narrative.
```

**Recommended schema:** `src/content.config.ts`
```ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const galleries = defineCollection({
  loader: glob({
    base: './src/content/galleries',
    pattern: '**/*.{md,mdx}',
  }),
  schema: z.object({
    title: z.string(),
    type: z.enum(['wedding', 'engagement', 'portrait', 'event', 'personal']),
    date: z.coerce.date(),
    location: z.string(),
    cover: z.string(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    tags: z.array(z.string()).default([]),
    description: z.string(),
    seoDescription: z.string().max(180).optional(),
  }),
});

export const collections = { galleries };
```

---

## 7. Image Organization and Naming

Use one folder per gallery:
```
src/assets/galleries/<gallery-slug>/
```

Use sortable filenames:
```
0001-cover.jpg
0002-ceremony-wide.jpg
0003-ring-closeup.jpg
0004-couple-portrait.jpg
```

**Export recommendations before committing:**
- Color space: sRGB.
- Format: JPEG for photos.
- Long edge: usually 2400–3000 px.
- Quality: 80–85.
- Strip unnecessary metadata unless you intentionally want it public.
- Do not commit RAW files, TIFFs, or full-resolution archival exports.

---

## 8. Gallery Image Loader

Create `src/lib/galleries.ts` to collect gallery images automatically.

```ts
import type { ImageMetadata } from 'astro';

export type GalleryImage = {
  path: string;
  filename: string;
  image: ImageMetadata;
  alt: string;
};

const imageModules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/galleries/**/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

function filenameFromPath(path: string) {
  return path.split('/').at(-1) ?? path;
}

function altFromFilename(filename: string) {
  return filename
    .replace(/^\d+-?/, '')
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .trim();
}

export function getGalleryImages(slug: string): GalleryImage[] {
  return Object.entries(imageModules)
    .filter(([path]) => path.includes(`/src/assets/galleries/${slug}/`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, mod]) => {
      const filename = filenameFromPath(path);

      return {
        path,
        filename,
        image: mod.default,
        alt: altFromFilename(filename),
      };
    });
}

export function getGalleryCover(slug: string, coverFilename: string) {
  const images = getGalleryImages(slug);
  return images.find((image) => image.filename === coverFilename) ?? images[0];
}
```

---

## 9. Routes and Pages

### Homepage: `src/pages/index.astro`
- Hero image.
- Short positioning statement.
- Featured galleries.
- Category links: weddings, engagements, portraits.
- Contact CTA.

### Category pages
Files:
```
src/pages/weddings.astro
src/pages/engagements.astro
```

Purpose:
- Filter galleries by `type`.
- Show category-specific copy.
- Use a gallery card grid.

### Gallery detail pages
File: `src/pages/galleries/[slug].astro`

Responsibilities:
- Generate static pages from the `galleries` content collection.
- Load images from `src/assets/galleries/<slug>`.
- Render title, location, date, story text, gallery grid, and contact CTA.

**Example route shell:**
```astro
---
import { getCollection, render } from 'astro:content';
import GalleryLayout from '../../layouts/GalleryLayout.astro';
import LightboxGallery from '../../components/LightboxGallery.astro';
import { getGalleryImages } from '../../lib/galleries';

export async function getStaticPaths() {
  const galleries = await getCollection('galleries');

  return galleries.map((gallery) => ({
    params: { slug: gallery.id },
    props: { gallery },
  }));
}

const { gallery } = Astro.props;
const { Content } = await render(gallery);
const images = getGalleryImages(gallery.id);
---

<GalleryLayout title={gallery.data.title} description={gallery.data.seoDescription ?? gallery.data.description}>
  <header class="mx-auto max-w-5xl px-4 py-16">
    <p class="text-sm uppercase tracking-[0.25em] text-neutral-500">{gallery.data.type}</p>
    <h1 class="mt-3 text-4xl font-medium tracking-tight md:text-6xl">{gallery.data.title}</h1>
    <p class="mt-4 max-w-2xl text-neutral-600">{gallery.data.description}</p>
  </header>

  <section class="mx-auto max-w-5xl px-4 pb-10 prose prose-neutral">
    <Content />
  </section>

  <LightboxGallery images={images} galleryId={gallery.id} />
</GalleryLayout>
```

---

## 10. Gallery Component Requirements

`LightboxGallery.astro` should:
- Render a responsive masonry-like grid.
- Use Astro `<Picture />` for AVIF/WebP/fallback output.
- Lazy-load below-the-fold images.
- Use real `width` and `height` values to avoid layout shift.
- Wrap each image in a link for progressive enhancement.
- Add PhotoSwipe `data-pswp-width` and `data-pswp-height` attributes.
- Initialize PhotoSwipe only on pages with galleries.

**Example component pattern:**
```astro
---
import { Picture, getImage } from 'astro:assets';
import type { GalleryImage } from '../lib/galleries';

interface Props {
  images: GalleryImage[];
  galleryId: string;
}

const { images, galleryId } = Astro.props;

const prepared = await Promise.all(
  images.map(async (item) => {
    const lightbox = await getImage({
      src: item.image,
      width: Math.min(item.image.width, 2400),
      format: 'webp',
      quality: 85,
    });

    return { ...item, lightbox };
  }),
);
---

<div id={`gallery-${galleryId}`} class="mx-auto max-w-7xl columns-1 gap-4 px-4 pb-20 sm:columns-2 lg:columns-3">
  {prepared.map((item, index) => (
    <a
      href={item.lightbox.src}
      data-pswp-width={item.lightbox.attributes.width}
      data-pswp-height={item.lightbox.attributes.height}
      class="mb-4 block break-inside-avoid overflow-hidden rounded-xl bg-neutral-100"
      aria-label={`Open image: ${item.alt}`}
    >
      <Picture
        src={item.image}
        formats={['avif', 'webp']}
        widths={[480, 768, 1024, 1440]}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        alt={item.alt}
        loading={index < 6 ? 'eager' : 'lazy'}
        decoding="async"
        class="h-auto w-full transition duration-500 hover:scale-[1.02]"
      />
    </a>
  ))}
</div>

<script>
  import PhotoSwipeLightbox from 'photoswipe/lightbox';
  import 'photoswipe/style.css';

  function initLightboxes() {
    document.querySelectorAll('[id^="gallery-"]').forEach((gallery) => {
      if (gallery instanceof HTMLElement && gallery.dataset.pswpInitialized !== 'true') {
        const lightbox = new PhotoSwipeLightbox({
          gallery,
          children: 'a',
          pswpModule: () => import('photoswipe'),
        });

        lightbox.init();
        gallery.dataset.pswpInitialized = 'true';
      }
    });
  }

  initLightboxes();
  document.addEventListener('astro:page-load', initLightboxes);
</script>
```

---

## 11. Styling System

Use Tailwind for layout and utility styling, but define brand-level tokens in `src/styles/global.css`.

**Example:**
```css
@import "tailwindcss";

@theme {
  --font-sans: Inter, ui-sans-serif, system-ui, sans-serif;
  --color-cream: #f8f4ef;
  --color-ink: #161412;
  --color-muted: #756f68;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--color-cream);
  color: var(--color-ink);
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Design direction:**
- Neutral warm background.
- Generous whitespace.
- Large editorial typography.
- Minimal borders and buttons.
- Let the photos provide color.
- Avoid heavy overlays that distort photo color.

---

## 12. Animation Requirements

### Tier 1: Always on
- Button hover transitions.
- Image hover scale, very subtle.
- Header link underline transitions.

### Tier 2: Page transitions
Enable Astro View Transitions in the base layout or head component.
```astro
---
import { ClientRouter } from 'astro:transitions';
---

<ClientRouter />
```

Use sparingly:
```astro
<img transition:name="hero-image" />
```

### Tier 3: Scroll reveal
Only add scroll reveal if the site still feels static after the main layout is built. Use a tiny custom IntersectionObserver utility rather than a heavy animation framework.

Do not animate every image in a large gallery.

---

## 13. Astro Configuration

**Example `astro.config.mjs` for a GitHub project page:**
```js
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://YOUR_GITHUB_USERNAME.github.io',
  base: '/YOUR_REPO_NAME',
  output: 'static',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    responsiveStyles: false,
  },
});
```

**For a custom domain such as `elmcityphotography.com`:**
```js
export default defineConfig({
  site: 'https://elmcityphotography.com',
  output: 'static',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    responsiveStyles: false,
  },
});
```

---

## 14. GitHub Pages Path Helper

`src/lib/paths.ts`:
```ts
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function withBase(path: string) {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}
```

---

## 15. Deployment

Use GitHub Actions rather than committing the built `dist` folder.

`.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v6

      - name: Install, build, and upload site
        uses: withastro/action@v6
        with:
          node-version: 24

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v5
```

**GitHub repository setting:** Settings → Pages → Source → GitHub Actions.

---

## 16. Recommended `package.json` Scripts

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview",
    "check": "astro check",
    "format": "prettier . --write",
    "format:check": "prettier . --check",
    "lint": "eslint ."
  }
}
```

---

## 17. SEO and Social Sharing

Create `src/components/Seo.astro` and use it in `BaseLayout.astro`.

Every page should define:
- `<title>`
- Meta description.
- Canonical URL.
- Open Graph title, description, and image.
- Twitter card metadata.

For gallery pages, use the gallery cover as the social sharing image.

---

## 18. Accessibility Requirements

**Minimum requirements:**
- Every image must have meaningful alt text or empty alt text if purely decorative.
- Lightbox must be keyboard usable.
- Visible focus states.
- Do not rely on hover-only navigation.
- Respect `prefers-reduced-motion`.
- Maintain text contrast over images.
- Use real links and buttons, not clickable divs.
- Include a skip link.

**Photography-specific alt guidance:**
- Portfolio grid alt text can be concise.
- Do not over-describe every image in a repetitive way.
- Use captions only where they add useful context.

---

## 19. Performance Requirements

**Target budgets:**
- Homepage JavaScript: under 100 KB gzipped if possible.
- Gallery pages: PhotoSwipe should load only on gallery pages.
- Largest Contentful Paint image: eager load with proper dimensions.
- Below-fold gallery images: lazy load.

**Implementation rules:**
- Use `<Picture />` for portfolio images.
- Use `widths` and `sizes` intentionally.
- Limit lightbox image width to about 2400 px.
- Do not animate hundreds of images on scroll.
- Use CSS columns or CSS grid instead of a JavaScript masonry layout for v1.

---

## 20. Content Update Workflow

To add a new gallery:
1. Export web-ready images from Lightroom.
2. Create a folder: `src/assets/galleries/<new-gallery-slug>/`
3. Add sorted image files: `0001-cover.jpg`, `0002-detail.jpg`, etc.
4. Create metadata file: `src/content/galleries/<new-gallery-slug>.mdx`
5. Run locally: `npm run dev`
6. Validate: `npm run build`
7. Commit and push — GitHub Actions deploys the static site.

---

## 21. Future Upgrade Path

**Good v2 additions:**
- A real contact form via a static form provider.
- Pagefind for static search if the site grows.
- Blog/journal posts for SEO.
- Client proofing hosted separately.
- Cloud image hosting if the repo becomes too large.
- A lightweight CMS such as Decap CMS or Pages CMS.
- Playwright screenshot tests for homepage, category page, and gallery page at mobile/tablet/desktop widths.

Do not add these in v1 unless they solve an immediate problem.

---

## 22. Architecture Decision Summary

**Use:**
- Astro for the static site.
- TypeScript for safety.
- Tailwind CSS v4 for styling.
- Astro content collections for gallery metadata.
- `src/assets` for repo-local optimized images.
- Astro `<Picture />`, `<Image />`, and `getImage()` for image output.
- PhotoSwipe for the lightbox.
- Astro View Transitions and CSS for animations.
- GitHub Actions with `withastro/action` for GitHub Pages deployment.

**Avoid in v1:**
- Next.js.
- A CMS.
- Heavy React animation libraries.
- JavaScript masonry packages.
- Storing full-resolution originals in the repository.
- Putting portfolio images in `public/`.
