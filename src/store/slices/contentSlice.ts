import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchNews } from '../../lib/api'
import demo from '../../lib/demoArticles.json'

const HAS_KEY = Boolean(process.env.NEWS_API_KEY)

type LoadArgs = { category?: string; q?: string; page?: number }

export const loadNews = createAsyncThunk('content/loadNews', async (args: LoadArgs = {}) => {
  const res = await fetchNews(args)
  return {
    articles: res.articles || [],
    page: args.page || 1,
    apiKeyPresent: Boolean(res.apiKeyPresent),
    error: res.error || null,
  }
})

type Status = 'idle' | 'loading' | 'succeeded' | 'failed'
interface ContentState {
  articles: any[]
  status: Status
  page: number
  hasMore: boolean
  isDemo: boolean
  error?: string | null
}

const initialArticles = HAS_KEY ? [] : (demo.articles || [])
const initialState: ContentState = { articles: initialArticles as any[], status: HAS_KEY ? 'idle' : 'succeeded', page: 1, hasMore: true, isDemo: !HAS_KEY }

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadNews.pending, state => {
        state.status = 'loading'
      })
      .addCase(loadNews.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // update isDemo flag from API response
        state.isDemo = !action.payload.apiKeyPresent

        const page = action.payload.page || 1
        if (page > 1) {
          state.articles = state.articles.concat(action.payload.articles)
        } else {
          state.articles = action.payload.articles
        }
        // If fewer than page size, assume no more
        state.hasMore = action.payload.articles.length >= 20
        state.page = page
        // optional error message from server
        state.error = action.payload.error || null
      })
      .addCase(loadNews.rejected, state => {
        state.status = 'failed'
      })
  },
})

export default contentSlice.reducer
