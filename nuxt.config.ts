export default defineNuxtConfig({
  // Modules Nuxt
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
  ],

  css: ['~/assets/css/main.css'],

  // SSR activé pour le SEO — Nuxt pré-rend les pages côté serveur
  ssr: true,

  // Variables d'environnement exposées au client
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8080',
    }
  },

  // App metadata
  app: {
    head: {
      title: 'The Lord of the Rings API',
      titleTemplate: '%s — LOTR API',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Explore the world of Middle-earth — characters, races, locations, films and artifacts from J.R.R. Tolkien\'s universe.'
        },
        { name: 'theme-color', content: '#1a1208' },
        // Open Graph
        { property: 'og:title', content: 'The Lord of the Rings API' },
        { property: 'og:description', content: 'Open Source REST API for Middle-earth data' },
        { property: 'og:type', content: 'website' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        // Police Tolkien-esque depuis Google Fonts
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap'
        }
      ]
    }
  },

  // TypeScript strict
  typescript: {
    strict: true,
    typeCheck: true,
  },

  // Tailwind — personnalisation du thème dans tailwind.config.ts
  tailwindcss: {
    configPath: 'tailwind.config.ts',
  },

  devtools: { enabled: true },
})
