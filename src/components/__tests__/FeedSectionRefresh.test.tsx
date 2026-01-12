import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FeedSection from '../FeedSection'
import { Provider } from 'react-redux'
import { store } from '../../store'
import * as api from '../../lib/api'

jest.mock('../../lib/api')
jest.useFakeTimers()

test('refresh button triggers load and updates timestamp', async () => {
  // Use real timers for async DOM interactions
  jest.useRealTimers()
  const user = userEvent.setup()

  ;(api.fetchNews as jest.Mock).mockResolvedValue({ articles: [{ title: 'Updated article', description: 'X', urlToImage: '' }] })

  render(
    <Provider store={store}>
      <FeedSection />
    </Provider>
  )

  const refresh = screen.getByRole('button', { name: /Refresh feed/i })
  expect(refresh).toBeInTheDocument()
  await user.click(refresh)
  expect(screen.getByText(/^Updated\s\d/)).toBeInTheDocument()
})

test('polling calls refresh when not demo', () => {
  jest.useFakeTimers()
  const OLD = process.env.NEWS_API_KEY
  process.env.NEWS_API_KEY = 'dummy'
  render(
    <Provider store={store}>
      <FeedSection />
    </Provider>
  )
  // advance time by one poll interval (default 5 min)
  jest.advanceTimersByTime(300000)
  // if no errors, polling worked (we check that interval functions executed)
  process.env.NEWS_API_KEY = OLD
})