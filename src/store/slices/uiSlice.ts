import { createSlice } from '@reduxjs/toolkit'

type State = {
  searchQuery: string
  section: 'feed' | 'trending' | 'favorites' | 'settings'
}

const initialState: State = {
  searchQuery: '',
  section: 'feed',
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload
    },
    setSection(state, action) {
      state.section = action.payload
    },
  },
})

export const { setSearchQuery, setSection } = uiSlice.actions
export default uiSlice.reducer
