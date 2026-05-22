import type { Breed } from '@/types/breed';
import type { Condition } from '@/data/conditions';

const SITE = 'https://petscore.ca';

// ──────────────────────────────────────────────
// BreadcrumbList
// ──────────────────────────────────────────────
export function breadcrumbJsonLd(crumbs: { name: string; url?: string }[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      ...(c.url ? { item: `${SITE}${c.url}` } : {}),
    })),
  });
}

// ──────────────────────────────────────────────
// Breed page — FAQPage + BreadcrumbList
// ──────────────────────────────────────────────
export function breedJsonLd(breed: Breed): string {
  const url = `${SITE}/fr/races/${breed.slug}`;

  const breadcrumb = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE}/fr/` },
      { '@type': 'ListItem', position: 2, name: 'Races',   item: `${SITE}/fr/races/` },
      { '@type': 'ListItem', position: 3, name: breed.name, item: url },
    ],
  };

  const faqItems = [
    {
      '@type': 'Question',
      name: `Quel est le PetScore™ du ${breed.name} ?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Le ${breed.name} obtient un PetScore™ de ${breed.score}/100. Ce score reflète son niveau de risque héréditaire (${breed.riskLevel}) et ses coûts vétérinaires estimés au Québec.`,
      },
    },
    {
      '@type': 'Question',
      name: `Quels sont les problèmes de santé courants du ${breed.name} ?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Les principales conditions héréditaires du ${breed.name} sont : ${breed.mainHealthRisks.join(', ')}.`,
      },
    },
    {
      '@type': 'Question',
      name: `Combien coûtent les soins vétérinaires pour un ${breed.name} au Québec ?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Les frais vétérinaires annuels pour un ${breed.name} sont estimés entre ${breed.annualVetCost.min} $ et ${breed.annualVetCost.max} $ au Québec. Sur 10 ans, prévoyez jusqu'à ${breed.annualVetCost.max * 10} $.`,
      },
    },
    {
      '@type': 'Question',
      name: `Quelle assurance pour un ${breed.name} au Québec ?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `L'assurance santé pour un ${breed.name} coûte entre ${breed.insuranceMonthly.min} $ et ${breed.insuranceMonthly.max} $ par mois au Québec selon le niveau de couverture et l'âge de l'animal.`,
      },
    },
  ];

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumb,
      {
        '@type': 'FAQPage',
        mainEntity: faqItems,
      },
      {
        '@type': 'Article',
        headline: `${breed.name} — PetScore™ ${breed.score}/100`,
        description: `PetScore™ du ${breed.name} : risques héréditaires, coûts vétérinaires et assurances au Québec.`,
        url,
        publisher: { '@type': 'Organization', name: 'PetScore', url: SITE },
      },
    ],
  });
}

// ──────────────────────────────────────────────
// Blog Article
// ──────────────────────────────────────────────
export function articleJsonLd(opts: {
  title: string;
  description: string;
  slug: string;
  publishedAt: Date;
  updatedAt?: Date;
  author?: string;
}): string {
  const url = `${SITE}/fr/blog/${opts.slug}`;
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE}/fr/` },
          { '@type': 'ListItem', position: 2, name: 'Blog',    item: `${SITE}/fr/blog/` },
          { '@type': 'ListItem', position: 3, name: opts.title, item: url },
        ],
      },
      {
        '@type': 'Article',
        headline: opts.title,
        description: opts.description,
        url,
        datePublished: opts.publishedAt.toISOString(),
        dateModified: (opts.updatedAt ?? opts.publishedAt).toISOString(),
        author: { '@type': 'Organization', name: opts.author ?? 'Équipe PetScore', url: SITE },
        publisher: {
          '@type': 'Organization',
          name: 'PetScore',
          url: SITE,
          logo: { '@type': 'ImageObject', url: `${SITE}/favicon.svg` },
        },
        inLanguage: 'fr-CA',
      },
    ],
  });
}

// ──────────────────────────────────────────────
// Condition médicale (MedicalWebPage)
// ──────────────────────────────────────────────
export function conditionJsonLd(condition: Condition): string {
  const url = `${SITE}/fr/conditions/${condition.slug}`;
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil',               item: `${SITE}/fr/` },
          { '@type': 'ListItem', position: 2, name: 'Conditions médicales',   item: `${SITE}/fr/conditions/` },
          { '@type': 'ListItem', position: 3, name: condition.name,           item: url },
        ],
      },
      {
        '@type': 'MedicalWebPage',
        name: `${condition.name} chez le chien`,
        description: condition.description,
        url,
        inLanguage: 'fr-CA',
        specialty: 'Veterinary',
        lastReviewed: new Date().toISOString().split('T')[0],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `Quels sont les symptômes de la ${condition.name} chez le chien ?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: condition.symptoms.slice(0, 3).join('. ') + '.',
            },
          },
          {
            '@type': 'Question',
            name: `Combien coûte le traitement de la ${condition.name} au Québec ?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Le traitement de la ${condition.name} coûte en moyenne ${condition.estimatedCost} au Québec.`,
            },
          },
        ],
      },
    ],
  });
}

// ──────────────────────────────────────────────
// Page comparaison breed vs breed
// ──────────────────────────────────────────────
export function compareJsonLd(breed1: Breed, breed2: Breed): string {
  const url = `${SITE}/fr/comparer/${breed1.slug}-vs-${breed2.slug}`;
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil',  item: `${SITE}/fr/` },
          { '@type': 'ListItem', position: 2, name: 'Comparer', item: `${SITE}/fr/comparer/` },
          { '@type': 'ListItem', position: 3, name: `${breed1.name} vs ${breed2.name}`, item: url },
        ],
      },
      {
        '@type': 'Article',
        headline: `${breed1.name} vs ${breed2.name} — Comparaison PetScore™`,
        description: `Comparaison santé, coûts et caractère entre le ${breed1.name} (${breed1.score}/100) et le ${breed2.name} (${breed2.score}/100) au Québec.`,
        url,
        inLanguage: 'fr-CA',
        publisher: { '@type': 'Organization', name: 'PetScore', url: SITE },
      },
    ],
  });
}
