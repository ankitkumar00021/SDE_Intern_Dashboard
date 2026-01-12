import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContentCard from '../ContentCard'
import { Provider } from 'react-redux'
import { store } from '../../store'

test('renders move buttons and calls callbacks', async () => {
  const user = userEvent.setup()
  const up = jest.fn()
  const down = jest.fn()
  render(
    <Provider store={store}>
      <ContentCard title="Test" description="desc" onMoveUp={up} onMoveDown={down} />
    </Provider>
  )

  const upBtn = screen.getByLabelText(/Move Test up/)
  const downBtn = screen.getByLabelText(/Move Test down/)
  expect(upBtn).toBeInTheDocument()
  expect(downBtn).toBeInTheDocument()

  await user.click(upBtn)
  expect(up).toHaveBeenCalledTimes(1)
  await user.click(downBtn)
  expect(down).toHaveBeenCalledTimes(1)
})