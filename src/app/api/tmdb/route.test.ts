jest.mock('next/server', () => ({ NextResponse: { json: (payload: any) => ({ json: async () => payload }) } }))
const { GET } = require('./route')
import axios from 'axios'

jest.mock('axios')

describe('TMDB route', () => {
  it('returns demo results when key missing or invalid', async () => {
    // ensure we have an API key so the route attempts to call TMDB and triggers our axios mock
    process.env.TMDB_API_KEY = 'invalid-key'
    ;(axios.get as jest.Mock).mockRejectedValue({ response: { status: 401, data: { status_message: 'Invalid API key' } } })

    const req = ({ url: 'http://localhost/api/tmdb' } as unknown) as Request
    const res = await GET(req)
    const json = await res.json()

    expect(json.apiKeyPresent).toBe(false)
    expect(json.results.length).toBeGreaterThan(0)
    expect(json.error).toMatch(/Invalid TMDB API key/i)
  })

  it('calls TMDB discover when no query and returns results', async () => {
    // set a valid-looking key so the route treats the request as live
    process.env.TMDB_API_KEY = 'real-ish'
    ;(axios.get as jest.Mock).mockResolvedValue({ data: { results: [{ id: 1, title: 'Real Movie' }] } })
    const req = ({ url: 'http://localhost/api/tmdb' } as unknown) as Request
    const res = await GET(req)
    const json = await res.json()

    expect(json.apiKeyPresent).toBe(true)
    expect(json.results[0].title).toBe('Real Movie')
  })
})