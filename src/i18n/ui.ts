export const languages = {
  fr: 'Français',
  en: 'English',
} as const;

export type Language = keyof typeof languages;

export const defaultLang: Language = 'fr';

export const ui = {
  fr: {
    'site.name': 'Mon Site SEO',
    'site.description': 'Description du site pour le référencement naturel.',
    'nav.home': 'Accueil',
    'nav.about': 'À propos',
    'footer.rights': 'Tous droits réservés.',
  },
  en: {
    'site.name': 'My SEO Site',
    'site.description': 'Site description for search engine optimization.',
    'nav.home': 'Home',
    'nav.about': 'About',
    'footer.rights': 'All rights reserved.',
  },
} as const;

export type UIKey = keyof (typeof ui)[typeof defaultLang];
