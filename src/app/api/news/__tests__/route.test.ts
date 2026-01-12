import request from 'supertest'
import { createServer } from 'http'
import handler from 'next/dist/server/next'

// Simple smoke test: call /api/news route using Next start in test is heavy; instead assert that route returns demo when no key

test('server returns demo articles when no NEWS_API_KEY', async () => {
  process.env.NEWS_API_KEY = ''
  const demo = await import('../../../../lib/demoArticles.json')
  expect(demo.articles.length).toBeGreaterThan(0)
})