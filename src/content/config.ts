import { defineCollection, z } from 'astro:content';

// Collection de pages programmatiques (ex : ville × service)
const pages = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    lang: z.enum(['fr', 'en']).default('fr'),
    // Champs SEO additionnels
    ogImage: z.string().optional(),
    noindex: z.boolean().default(false),
    // Données métier à personnaliser selon le projet
    meta: z.record(z.string(), z.unknown()).optional(),
  }),
});

export const collections = { pages };
