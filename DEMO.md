# Demo Checklist — Personalized Content Dashboard

Use this checklist and script when recording a short demo video (2–4 minutes) or walking through the app.

1. Setup (10–20s)
   - Show repository and mention `README.md` instructions.
   - Copy `.env.local.example` -> `.env.local` and set `NEWS_API_KEY`.
   - Run `npm install` and `npm run dev`.

2. Landing & Layout (15–20s)
   - Open http://localhost:3000
   - Point out the Header (search/dark mode), Sidebar (Feed, Trending, Favorites), and main feed area.

3. Search & Personalization (25–40s)
   - Type in the search input (e.g., `AI`) and show debounced search results.
   - Explain that preferences/categories are stored via Redux and persisted to localStorage.

4. Infinite Scroll (15–25s)
   - Scroll down to show more content loading automatically via infinite scroll.

5. Favorites (20–30s)
   - Click "Save" on a card to add it to Favorites.
   - Navigate to `Favorites` via the Sidebar and show items persisted on reload.

6. Drag-and-Drop Reordering (20–30s)
   - Reorder cards by dragging them; explain the order is persisted across sessions.

7. Dark Mode & Animations (10–15s)
   - Toggle Dark Mode via the Header button, highlight smooth Framer Motion card hover animations.

8. Tests & CI (10–20s)
   - Mention unit tests with Jest/RTL and CI workflow (`.github/workflows/ci.yml`) that runs lint and tests on PRs.

9. Deployment (10–15s)
   - Explain how to deploy to Vercel and where to add the `NEWS_API_KEY` in Vercel environment settings.

Notes:
- If `npm install` fails due to package registry/version mismatches, try clearing the npm cache (`npm cache clean --force`) and remove `package-lock.json` before re-running `npm install`.
- The Cypress E2E suite is optional and can be enabled locally with `npm run cypress:open`.

Suggested script: "Hi — this is a short demo of the Personalized Content Dashboard. I will show the main features: searching, saving favorites, drag-and-drop ordering, dark mode, and tests/CI setup. I'll run the app locally and demonstrate each feature briefly."