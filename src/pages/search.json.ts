import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import breedsRaw from '@/data/breeds.json';
import { conditions } from '@/data/conditions';
import type { Breed } from '@/types/breed';

export const GET: APIRoute = async () => {
  const breeds = breedsRaw as Breed[];
  const posts  = await getCollection('blog');

  const items = [
    // Races
    ...breeds.map((b) => ({
      type:     'breed',
      title:    b.name,
      subtitle: `${b.size} · ${b.origin} · PetScore ${b.score}/100`,
      tags:     [b.size, b.origin, b.riskLevel, ...b.mainHealthRisks],
      url:      `/fr/races/${b.slug}`,
    })),

    // Articles blog
    ...posts.map((p) => ({
      type:     'blog',
      title:    p.data.title,
      subtitle: p.data.description.slice(0, 80),
      tags:     p.data.tags,
      url:      `/fr/blog/${p.slug}`,
    })),

    // Conditions médicales
    ...conditions.map((c) => ({
      type:     'condition',
      title:    c.name,
      subtitle: c.description.slice(0, 80),
      tags:     [c.severity, ...c.affectedBreeds.slice(0, 3)],
      url:      `/fr/conditions/${c.slug}`,
    })),

    // Pages outils
    { type: 'page', title: 'Quiz — Quelle race pour moi ?',  subtitle: '6 questions · résultat instantané', tags: ['quiz', 'race'], url: '/fr/quiz/' },
    { type: 'page', title: 'Comparateur de races',           subtitle: 'Comparer deux races côte à côte',   tags: ['comparer'],     url: '/fr/comparer/' },
    { type: 'page', title: 'PetCalendar™ — Calendrier santé', subtitle: 'Soins préventifs mois par mois',  tags: ['calendrier', 'vaccins'], url: '/fr/calendrier/' },
    { type: 'page', title: 'Urgence vétérinaire',            subtitle: 'Évaluer les symptômes de votre chien', tags: ['urgence'],   url: '/fr/urgence/' },
    { type: 'page', title: 'Assurances animaux Québec',      subtitle: 'Comparer les meilleures assurances', tags: ['assurance'],   url: '/fr/assurance/' },
    { type: 'page', title: 'Glossaire médical canin',        subtitle: 'Définitions des termes vétérinaires', tags: ['glossaire'],  url: '/fr/glossaire/' },
    { type: 'page', title: 'Méthodologie PetScore™',         subtitle: 'Comment est calculé le score ?',   tags: ['methodologie'], url: '/fr/methodologie/' },
    { type: 'page', title: 'Glossaire médical canin',        subtitle: '30 termes vétérinaires expliqués',  tags: ['glossaire', 'médical', 'santé'], url: '/fr/glossaire/' },
    { type: 'page', title: 'Races les moins chères',         subtitle: 'Top 15 — budget vétérinaire bas',   tags: ['budget', 'économique'],         url: '/fr/races/races-moins-cheres' },
    { type: 'page', title: 'Races à longue espérance de vie', subtitle: 'Top 15 — longévité maximale',     tags: ['longévité', 'espérance de vie'], url: '/fr/races/races-longue-vie' },
    { type: 'page', title: 'Races pour personnes âgées',    subtitle: 'Top 12 — calmes et adaptées',       tags: ['retraite', 'senior', 'mobilité'], url: '/fr/races/races-personnes-agees' },
    { type: 'page', title: 'Prix d\'achat races de chiens',  subtitle: 'Tableau complet — coût total 10 ans', tags: ['prix', 'achat', 'budget'],      url: '/fr/races/prix-races-chiens' },
    { type: 'page', title: 'Races interdites Québec (BSL)',  subtitle: 'Loi pit-bull, règlements municipaux', tags: ['interdit', 'bsl', 'légal', 'pit-bull'], url: '/fr/races/races-interdites-quebec' },
    { type: 'page', title: 'Guide premier chien Québec',     subtitle: '8 étapes essentielles + budget',   tags: ['guide', 'débutant', 'adoption'], url: '/fr/guide-premier-chien/' },
    { type: 'page', title: 'Checklist adoption chien',       subtitle: '30 étapes — sauvegarde auto',       tags: ['checklist', 'adoption', 'débutant'], url: '/fr/checklist-adoption/' },
  ];

  return new Response(JSON.stringify(items), {
    headers: { 'Content-Type': 'application/json' },
  });
};
