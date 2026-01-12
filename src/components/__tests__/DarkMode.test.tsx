import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Header from '../Header'

const mockDispatch = jest.fn()
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: () => false,
}))

test('dark mode toggle dispatches action', () => {
  const { getByLabelText } = render(<Header />)
  const btn = getByLabelText('toggle-dark-mode')
  fireEvent.click(btn)
  expect(mockDispatch).toHaveBeenCalled()
})
