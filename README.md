# The Lord of the Rings — Web

Frontend Nuxt 3 / TypeScript for the LOTR API, with a dark Tolkien-inspired theme
(parchment, gold, forest green, ancient brown).

## Stack

- Nuxt 3 (SSR)
- TypeScript
- Vue 3 Composition API
- Pinia
- Tailwind CSS
- Vercel (hosting)

## Setup

```bash
npm install
cp .env.example .env
# Edit .env to point to your LOTR API instance

npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deployment

Connected to Vercel — every push to `main` deploys to production,
every PR gets a preview deployment.

Set the `NUXT_PUBLIC_API_BASE` environment variable in Vercel project settings
to point to your LOTR API (e.g. `https://lotr-api.info`).

## Pages

- `/` — Home
- `/characters` + `/characters/[id]`
- `/races` + `/races/[id]`
- `/locations` + `/locations/[id]`
- `/films` + `/films/[id]`
- `/artifacts` + `/artifacts/[id]`

## License

MIT
