import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Article = {
  title: string
  description?: string
  url?: string
  urlToImage?: string
}

const loadFromLocal = (): Article[] => {
  if (typeof window === 'undefined') return []
  try {
    const data = localStorage.getItem('favorites')
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

const initialState = {
  items: loadFromLocal() as Article[],
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<Article>) {
      const exists = state.items.find(i => i.url === action.payload.url && i.title === action.payload.title)
      if (!exists) state.items.push(action.payload)
    },
    removeFavorite(state, action: PayloadAction<string>) {
      state.items = state.items.filter(i => i.url !== action.payload)
    },
    toggleFavorite(state, action: PayloadAction<Article>) {
      const exists = state.items.find(i => i.url === action.payload.url && i.title === action.payload.title)
      if (exists) state.items = state.items.filter(i => i.url !== action.payload.url)
      else state.items.push(action.payload)
    },
    clearFavorites(state) {
      state.items = []
    },
  },
})

export const { addFavorite, removeFavorite, toggleFavorite, clearFavorites } = favoritesSlice.actions
export default favoritesSlice.reducer
