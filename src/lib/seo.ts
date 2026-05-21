export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
  lang?: string;
  type?: 'website' | 'article';
}

export function buildTitle(pageTitle: string, siteName = 'Mon Site SEO'): string {
  return `${pageTitle} | ${siteName}`;
}

export function buildCanonical(pathname: string, siteUrl: string): string {
  return new URL(pathname, siteUrl).toString();
}

// Génère les métadonnées structurées JSON-LD pour une page
export function buildWebPageSchema(opts: {
  title: string;
  description: string;
  url: string;
  lang: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: opts.title,
    description: opts.description,
    url: opts.url,
    inLanguage: opts.lang,
  };
}
