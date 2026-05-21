import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'static',

  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],

  // i18n — MVP : /fr/ uniquement. Ajouter 'en' ici pour activer l'anglais.
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
});
