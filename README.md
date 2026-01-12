# SDE Intern - Personalized Content Dashboard

This project is a Next.js + TypeScript app for the SDE Frontend assignment (Personalized Content Dashboard).

## Quick start

1. Copy `.env.local.example` to `.env.local` and set your NewsAPI and MovieDB API key:

   ```env
   NEWS_API_KEY=your_newsapi_key_here
   OMDB_API_KEY=your_omdb_api_key_here
   ```

   Place your API key there — the app reads it as `process.env.NEWS_API_KEY` in server-side code. Do NOT commit `.env.local`.

2. Install dependencies:

   npm install

3. Run dev server:

   npm run dev

## NewsAPI

I added a `src/lib/api.ts` with a `fetchNews` helper. Replace the key in `.env.local` and the helper will read `process.env.NEWS_API_KEY`.

### Demo mode (no API key)

If you do not provide a `NEWS_API_KEY` and `OMDB_API_KEY` are missing, the app will automatically display a small set of demo articles from `src/lib/demoArticles.json` so you can preview the UI without an external key.

### Server proxy for secure API use

The app exposes a server-side proxy endpoint at `GET /api/news` and  `GET /api/movies` that forwards requests to NewsAPI and movies APIs using the server-only `NEWS_API_KEY` and `OMDB_API_KEY`. This keeps your API key secret and avoids CORS issues. To use live data, set `NEWS_API_KEY` and `OMDB_API_KEY` in `.env.local`, then rebuild and restart the server. Example request (from the app):

- Client calls: `/api/news?category=technology&q=ai&page=1`
- Server (safe) calls NewsAPI with your secret key and returns the JSON to the client.

You can test the endpoint directly (after starting the server):

```bash
curl "http://localhost:3000/api/news?page=1"
```

---

## Features implemented

- Personalized feed (NewsAPI) with debounced search
- Infinite scroll and pagination for content
- Favorites (persisted to `localStorage`)
- Drag-and-drop reordering with React DnD (persisted order)
- Dark mode toggle (persisted) and dark-aware styles
- Redux Toolkit store (preferences, content, UI, favorites, feed order)
- Framer Motion animations for cards and drag transitions
- Unit tests for slices and main components (Jest + React Testing Library)

---

## Local development

1. Copy `.env.local.example` to `.env.local` and add your NewsAPI key:

   ```env
   NEWS_API_KEY=your_newsapi_key_here
   ```

2. Install dependencies and run the dev server:

   ```bash
   npm install
   npm run dev
   ```

3. Open the app at http://localhost:3000

## Testing

- Unit tests: `npm test` (Jest)
- Lint: `npm run lint` (Next.js ESLint)
- Format: `npm run format` (Prettier)

> Note: You will need to run `npm install` locally to fetch dev dependencies before running tests.

## E2E (optional)

This project includes Cypress in devDependencies and a basic smoke test covering the main user flows (feed, save favorite, reorder, toggle theme).

To run Cypress locally:

```bash
# build & start the app in a terminal
npm run build
npm start

# in a separate terminal window run Cypress
npm install
npm run cypress:open
# or headless
npm run cypress:run
```

Note: The Cypress tests expect the app to be reachable at `http://localhost:3000` and the demo fallback will be used when `NEWS_API_KEY` is not set.

## Production build & deploy

To build and run a production build locally:

```bash
npm run build
npm start
```

For hosting, deploy to Vercel (recommended for Next.js). Steps:

1. Create a Vercel account and connect your GitHub repository.
2. In Vercel project settings, add the `NEWS_API_KEY` environment variable.
3. Set framework to "Next.js" and deploy — Vercel will run the build automatically.

## Continuous integration

A simple GitHub Actions workflow is included (`.github/workflows/ci.yml`) to run lint and tests on push/PR.

## Notes / Troubleshooting

- If `npm install` fails in your environment, ensure you have a compatible Node.js version (recommended v18+), and try clearing your npm cache: `npm cache clean --force`.
- If a specific package version fails to resolve, try removing `package-lock.json`, then re-run `npm install`.

---

## What remains / Future improvements

- Integrate a second recommendations API (TMDB / Spotify)
- Add authentication (NextAuth) as a bonus
- Add accessibility improvements and keyboard reordering
- Add E2E tests and a Cypress test suite

If you want, I can prepare a short demo video and a hosted link after you run the install and confirm everything works locally.

---

### Where to put the NewsAPI key (server-side)

- Copy `.env.local.example` to `.env.local` and set `NEWS_API_KEY` and `OMDB_API_KEY`.
- The helper `src/lib/api.ts` reads `process.env.NEWS_API_KEY` and `process.env.OMDB_API_KEY`
- Do not commit `.env.local` or your API key to the repository.
