import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog');
  const sorted = posts.sort(
    (a: CollectionEntry<'blog'>, b: CollectionEntry<'blog'>) =>
      new Date(b.data.publishedAt).getTime() -
      new Date(a.data.publishedAt).getTime()
  );

  return rss({
    title: 'PetScore™ — Blog chiens au Québec',
    description:
      'Conseils santé, races, législation et coûts vétérinaires pour propriétaires de chiens au Québec.',
    site: context.site ?? 'https://petscore.ca',
    xmlns: {
      atom: 'http://www.w3.org/2005/Atom',
    },
    customData: `
      <language>fr-CA</language>
      <atom:link href="https://petscore.ca/rss.xml" rel="self" type="application/rss+xml" />
      <copyright>© ${new Date().getFullYear()} PetScore™</copyright>
      <managingEditor>contact@petscore.ca (Équipe PetScore)</managingEditor>
      <webMaster>contact@petscore.ca (Équipe PetScore)</webMaster>
    `.trim(),
    items: sorted.map((post: CollectionEntry<'blog'>) => ({
      title: post.data.title,
      pubDate: new Date(post.data.publishedAt),
      description: post.data.description,
      link: `/fr/blog/${post.slug}/`,
      categories: post.data.tags,
      author: post.data.author ?? 'Équipe PetScore',
    })),
  });
}
