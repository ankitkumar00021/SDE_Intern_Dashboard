import favoritesReducer, { addFavorite, removeFavorite, toggleFavorite, clearFavorites } from '../favoritesSlice'

const sample = { title: 'A', description: 'B', url: 'https://example.com', urlToImage: '' }

test('adds and removes favorites', () => {
  let state = favoritesReducer(undefined as any, { type: 'unknown' })
  state = favoritesReducer(state, addFavorite(sample))
  expect(state.items.length).toBe(1)
  state = favoritesReducer(state, addFavorite(sample))
  expect(state.items.length).toBe(1)
  state = favoritesReducer(state, toggleFavorite(sample))
  expect(state.items.length).toBe(0)
  state = favoritesReducer(state, toggleFavorite(sample))
  expect(state.items.length).toBe(1)
  state = favoritesReducer(state, removeFavorite('https://example.com'))
  expect(state.items.length).toBe(0)
  state = favoritesReducer(state, addFavorite(sample))
  state = favoritesReducer(state, clearFavorites())
  expect(state.items.length).toBe(0)
})
