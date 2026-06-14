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
    type: z.enum(['wedding', 'engagement', 'portrait', 'event', 'personal', 'graduation']),
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
