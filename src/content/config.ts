import { defineCollection, z } from 'astro:content';

// Collection de pages programmatiques (ex : ville × service)
const pages = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    lang: z.enum(['fr', 'en']).default('fr'),
    ogImage: z.string().optional(),
    noindex: z.boolean().default(false),
    meta: z.record(z.string(), z.unknown()).optional(),
  }),
});

// Collection blog — articles markdown en français
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    author: z.string().default('Équipe PetScore'),
    tags: z.array(z.string()).default([]),
    readingTime: z.number().optional(),
    coverImage: z.string().optional(),
  }),
});

export const collections = { pages, blog };
