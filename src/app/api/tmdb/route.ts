import { NextResponse } from 'next/server'
import axios from 'axios'

const TMDB_BASE = 'https://api.themoviedb.org/3'

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const q = url.searchParams.get('q') || undefined
    const page = Number(url.searchParams.get('page') || '1')

    const apiKey = process.env.TMDB_API_KEY || ''
    console.info(`[api/tmdb] TMDB_API_KEY ${apiKey ? 'found' : 'missing'}`)

    // If no key, return demo recommendations so UI still works
    if (!apiKey) {
      const demo = await import('../../../../src/lib/demoMovies.json')
      return NextResponse.json({ results: demo.results || demo.default?.results || [], apiKeyPresent: false })
    }

    // Use search when a query is provided, otherwise use discover for popular movies
    const endpoint = q ? `${TMDB_BASE}/search/movie` : `${TMDB_BASE}/discover/movie`
    const params: any = q
      ? { api_key: apiKey, query: q, page }
      : { api_key: apiKey, sort_by: 'popularity.desc', page }

    const res = await axios.get(endpoint, { params })
    return NextResponse.json({ results: res.data.results || [], apiKeyPresent: true })
  } catch (err: any) {
    console.error('[api/tmdb] error', err?.response?.data || err?.message || err)
    const demo = await import('../../../../src/lib/demoMovies.json')
    // Detect invalid/unauthorized API key responses and return clear fallback
    const isInvalidKey = err?.response?.status === 401 || (err?.response?.data?.status_message && /invalid api key/i.test(String(err.response.data.status_message)))
    const errorMsg = isInvalidKey ? 'Invalid TMDB API key. Please set a valid TMDB_API_KEY in .env.local.' : (err?.response?.data?.status_message || err?.message || String(err))
    return NextResponse.json({ results: demo.results || demo.default?.results || [], apiKeyPresent: !isInvalidKey && Boolean(process.env.TMDB_API_KEY), error: errorMsg })
  }
}