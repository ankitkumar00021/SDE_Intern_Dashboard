import axios from 'axios'

const NEWS_BASE = 'https://newsapi.org/v2'
const PAGE_SIZE = 20

export async function fetchNews(params: { category?: string; q?: string; page?: number } = {}) {
  const { category, q, page } = params

  // If running client-side, call our server-side API proxy to avoid exposing the NEWS_API_KEY
  if (typeof window !== 'undefined') {
    const url = new URL('/api/news', window.location.origin)
    if (category) url.searchParams.set('category', category)
    if (q) url.searchParams.set('q', q)
    if (page) url.searchParams.set('page', String(page))

    const res = await axios.get(url.toString())
    return res.data
  }

  // Server-side only path:
  const NEWS_API_KEY = process.env.NEWS_API_KEY || ''

  // If a NEWS_API_KEY is not provided, return demo data so the UI works without external API access.
  if (!NEWS_API_KEY) {
    const demo = await import('./demoArticles.json')
    return { articles: demo.articles || demo.default?.articles || [], apiKeyPresent: false }
  }

  // Server-side direct call (during SSR or server-only contexts)
  const res = await axios.get(`${NEWS_BASE}/top-headlines`, {
    params: {
      apiKey: NEWS_API_KEY,
      category: category || undefined,
      q: q || undefined,
      pageSize: PAGE_SIZE,
      page: page || 1,
      country: 'us',
    },
  })

  // When called server-side directly, include apiKeyPresent flag
  return { ...res.data, apiKeyPresent: true }
}
