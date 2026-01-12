import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ContentCard from '../ContentCard'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import favoritesReducer from '../../store/slices/favoritesSlice'

function renderWithStore(ui: React.ReactElement, preloadedState = {}) {
  const store = configureStore({ reducer: { favorites: favoritesReducer }, preloadedState })
  return render(<Provider store={store}>{ui}</Provider>)
}

test('renders title, description, and action buttons', () => {
  renderWithStore(<ContentCard title="Hello World" description="Desc" />)
  expect(screen.getByText('Hello World')).toBeInTheDocument()
  expect(screen.getByText('Desc')).toBeInTheDocument()
  expect(screen.getByText('Read More')).toBeInTheDocument()
})

test('save toggles favorite', () => {
  renderWithStore(<ContentCard title="SaveMe" />)
  const saveBtn = screen.getByLabelText('Save SaveMe')
  expect(saveBtn).toBeInTheDocument()
  fireEvent.click(saveBtn)
  expect(screen.getByText(/Saved/)).toBeInTheDocument()
})
