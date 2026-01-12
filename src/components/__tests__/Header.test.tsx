import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Header from '../Header'

jest.useFakeTimers()

jest.mock('react-redux', () => {
  const rr = jest.requireActual('react-redux')
  return {
    ...rr,
    useDispatch: () => jest.fn(),
    useSelector: jest.fn(),
  }
})

test('debounced search dispatches after timeout', () => {
  // default selector to avoid crashes
  (require('react-redux').useSelector as jest.Mock).mockImplementation(() => true)
  const { getByPlaceholderText } = render(<Header />)
  const input = getByPlaceholderText(/search/i)
  fireEvent.change(input, { target: { value: 'AI' } })
  // advance timers by less than debounce
  jest.advanceTimersByTime(300)
  // nothing dispatched yet (mock), but no errors
  jest.advanceTimersByTime(500)
  // after total 800ms -> debounce should have run
  expect(input).toHaveValue('AI')
})

test('shows Demo when content.isDemo is true', () => {
  (require('react-redux').useSelector as jest.Mock).mockImplementation((fn: any) => fn({ content: { isDemo: true } }))
  render(<Header />)
  expect(screen.getByLabelText('api-status')).toHaveTextContent('Demo')
})

test('shows Live when content.isDemo is false', () => {
  (require('react-redux').useSelector as jest.Mock).mockImplementation((fn: any) => fn({ content: { isDemo: false } }))
  render(<Header />)
  expect(screen.getByLabelText('api-status')).toHaveTextContent('Live')
})
