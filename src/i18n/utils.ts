import { ui, defaultLang, type Language, type UIKey } from './ui';

export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Language;
  return defaultLang;
}

export function useTranslations(lang: Language) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

export function localePath(lang: Language, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `/${lang}${clean}`;
}
