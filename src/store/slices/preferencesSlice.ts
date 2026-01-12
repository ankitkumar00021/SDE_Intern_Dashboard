import { createSlice } from '@reduxjs/toolkit'

type State = {
  categories: string[]
  darkMode: boolean
}

const loadPrefs = (): Partial<State> => {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem('preferences')
    if (!raw) return {}
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

const prefsFromStorage = loadPrefs()

const initialState: State = {
  categories: prefsFromStorage.categories || ['technology', 'business'],
  darkMode: typeof prefsFromStorage.darkMode === 'boolean' ? prefsFromStorage.darkMode : false,
}

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload
    },
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode
    },
  },
})

export const { setCategories, toggleDarkMode } = preferencesSlice.actions
export default preferencesSlice.reducer
