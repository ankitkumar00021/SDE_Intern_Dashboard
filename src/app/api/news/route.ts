import { NextResponse } from 'next/server'
import axios from 'axios'

const NEWS_BASE = 'https://newsapi.org/v2'
const PAGE_SIZE = 20

export async function GET(request: Request) {
  const apiKey = process.env.NEWS_API_KEY || ''
  try {
    const url = new URL(request.url)
    const category = url.searchParams.get('category') || undefined
    const q = url.searchParams.get('q') || undefined
    const page = Number(url.searchParams.get('page') || '1')

    // Log whether key is present (useful to confirm it's loaded in the server)
    console.info(`[api/news] NEWS_API_KEY ${apiKey ? 'found' : 'missing'}`)

    // If no key server-side, return demo articles and flag
    if (!apiKey) {
      const demo = await import('../../../lib/demoArticles.json')
      return NextResponse.json({ articles: demo.articles || demo.default?.articles || [], apiKeyPresent: false })
    }

    // If a free-text query is present, use the 'everything' endpoint (better for arbitrary searches)
    const endpoint = q ? `${NEWS_BASE}/everything` : `${NEWS_BASE}/top-headlines`
    const params: any = q
      ? { apiKey, q, pageSize: PAGE_SIZE, page: page || 1, sortBy: 'publishedAt' }
      : { apiKey, category, pageSize: PAGE_SIZE, page: page || 1, country: 'us' }

    const res = await axios.get(endpoint, { params })

    // Include a flag indicating the server had an API key
    return NextResponse.json({ ...res.data, apiKeyPresent: true })
  } catch (err: any) {
    console.error('[api/news] error', err?.response?.data || err?.message || err)
    // On error, fall back to demo articles so the UI remains functional and include diagnostic flags
    const demo = await import('../../../lib/demoArticles.json')
    return NextResponse.json({ articles: demo.articles || demo.default?.articles || [], apiKeyPresent: Boolean(apiKey), error: err?.response?.data || err?.message || String(err) })
  }
}
