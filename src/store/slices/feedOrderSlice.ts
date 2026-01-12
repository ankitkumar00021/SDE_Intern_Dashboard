import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const loadOrder = (): string[] => {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem('feedOrder')
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

const initialState = {
  items: loadOrder() as string[],
}

const feedOrderSlice = createSlice({
  name: 'feedOrder',
  initialState,
  reducers: {
    setOrder(state, action: PayloadAction<string[]>) {
      state.items = action.payload
    },
    moveItem(state, action: PayloadAction<{ from: number; to: number }>) {
      const { from, to } = action.payload
      if (from === to) return
      const item = state.items.splice(from, 1)[0]
      state.items.splice(to, 0, item)
    },
    clearOrder(state) {
      state.items = []
    },
  },
})

export const { setOrder, moveItem, clearOrder } = feedOrderSlice.actions
export default feedOrderSlice.reducer
