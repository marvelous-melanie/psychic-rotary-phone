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
