import feedOrderReducer, { setOrder, moveItem, clearOrder } from '../feedOrderSlice'

test('set and move order', () => {
  let state = feedOrderReducer(undefined as any, { type: 'unknown' })
  state = feedOrderReducer(state, setOrder(['a', 'b', 'c']))
  expect(state.items).toEqual(['a', 'b', 'c'])
  state = feedOrderReducer(state, moveItem({ from: 0, to: 2 }))
  expect(state.items).toEqual(['b', 'c', 'a'])
  state = feedOrderReducer(state, clearOrder())
  expect(state.items).toEqual([])
})
