import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import FeedSection from '../FeedSection'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import contentReducer from '../../store/slices/contentSlice'
import * as api from '../../lib/api'

jest.mock('../../lib/api')

function renderWithStore(ui: React.ReactElement, preloadedState = {}) {
  // provide a minimal stub reducer for UI to avoid undefined initial state
  const uiStub = (s = { searchQuery: '' } as any, a: any) => s
  const prefStub = (s = { categories: ['technology'] } as any, a: any) => s
  const feedOrderStub = (s = { items: [] } as any, a: any) => s
  const favoritesStub = (s = { items: [] } as any, a: any) => s
  const store = configureStore({ reducer: { content: contentReducer, ui: uiStub as any, preferences: prefStub as any, feedOrder: feedOrderStub as any, favorites: favoritesStub as any }, preloadedState })
  return render(<Provider store={store}>{ui}</Provider>)
}

test('loads and displays articles from fetchNews', async () => {
  ;(api.fetchNews as jest.Mock).mockResolvedValue({
    articles: [{ title: 'News 1', description: 'Test', urlToImage: '' }],
  })

  renderWithStore(<FeedSection />, { content: { articles: [], status: 'idle', page: 1, hasMore: true, isDemo: true }, ui: { searchQuery: '' } })
  await waitFor(() => expect(screen.getByText('News 1')).toBeInTheDocument())
})

test('shows no content state when articles empty', async () => {
  (api.fetchNews as jest.Mock).mockResolvedValue({ articles: [] })
  renderWithStore(<FeedSection />, { content: { articles: [], status: 'succeeded', page: 1, hasMore: false, isDemo: true }, ui: { searchQuery: '' } })
  await waitFor(() => expect(screen.getByText(/No content yet/)).toBeInTheDocument())
})

test('shows error message when API error present in payload', async () => {
  (api.fetchNews as jest.Mock).mockResolvedValue({ articles: [], error: 'API rate limit' })
  renderWithStore(<FeedSection />, { content: { articles: [], status: 'succeeded', page: 1, hasMore: false, isDemo: false, error: 'API rate limit' }, ui: { searchQuery: '' } })
  await waitFor(() => expect(screen.getByText(/API error/)).toBeInTheDocument())
})
