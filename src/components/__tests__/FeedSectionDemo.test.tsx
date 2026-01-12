import React from 'react'
import { render, screen } from '@testing-library/react'

jest.mock('react-redux', () => {
  const rr = jest.requireActual('react-redux')
  return {
    ...rr,
    useDispatch: () => jest.fn(),
    useSelector: (fn: any) =>
      fn({
        content: {
          articles: [{ title: 'News 1', description: 'Test', urlToImage: '' }],
          status: 'succeeded',
          hasMore: false,
          isDemo: true,
        },
        ui: { searchQuery: '' },
        preferences: { categories: [] },
        favorites: { items: [] },
        feedOrder: { order: [] },
      }),
  }
})

import FeedSection from '../FeedSection'

describe('FeedSection demo mode', () => {
  test('shows demo banner and demo article immediately', () => {
    render(<FeedSection />)
    expect(screen.getByText(/Demo mode/i)).toBeInTheDocument()
    expect(screen.getByText(/News 1/)).toBeInTheDocument()
  })
})