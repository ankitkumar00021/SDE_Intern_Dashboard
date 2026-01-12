import { configureStore } from '@reduxjs/toolkit'
import preferencesReducer from './slices/preferencesSlice'
import contentReducer from './slices/contentSlice'
import uiReducer from './slices/uiSlice'
import favoritesReducer from './slices/favoritesSlice'
import feedOrderReducer from './slices/feedOrderSlice'

export const store = configureStore({
  reducer: {
    preferences: preferencesReducer,
    content: contentReducer,
    ui: uiReducer,
    favorites: favoritesReducer,
    feedOrder: feedOrderReducer,
  },
})

// Persist favorites and preferences to localStorage on client
if (typeof window !== 'undefined') {
  let prevFavorites = JSON.stringify(store.getState().favorites.items)
  let prevPrefs = JSON.stringify(store.getState().preferences)
  store.subscribe(() => {
    const state = store.getState()
    const currentFavs = state.favorites.items
    const serializedFavs = JSON.stringify(currentFavs)
    if (serializedFavs !== prevFavorites) {
      prevFavorites = serializedFavs
      try {
        localStorage.setItem('favorites', serializedFavs)
      } catch {}
    }

    const serializedPrefs = JSON.stringify(state.preferences)
    if (serializedPrefs !== prevPrefs) {
      prevPrefs = serializedPrefs
      try {
        localStorage.setItem('preferences', serializedPrefs)
      } catch {}
    }
  })
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
