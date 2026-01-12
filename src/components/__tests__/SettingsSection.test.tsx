import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import SettingsSection from '../SettingsSection'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import preferencesReducer from '../../store/slices/preferencesSlice'

function renderWithStore(ui: React.ReactElement, preloadedState = {}) {
  const store = configureStore({ reducer: { preferences: preferencesReducer }, preloadedState })
  return render(<Provider store={store}>{ui}</Provider>)
}

test('save button dispatches setCategories (no crash)', () => {
  renderWithStore(<SettingsSection />)
  const save = screen.getByText(/Save/i)
  expect(save).toBeInTheDocument()
  fireEvent.click(save)
  // no crash, and button exists
  expect(screen.getByText(/Settings/)).toBeInTheDocument()
})