import React from 'react'
import { render, screen } from '@testing-library/react'
import DraggableCard from '../DraggableCard'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

test('renders children and applies default opacity', () => {
  render(
    <DndProvider backend={HTML5Backend}>
      <DraggableCard id="test" index={0} move={() => {}}>
        <div>Child Content</div>
      </DraggableCard>
    </DndProvider>
  )

  const child = screen.getByText('Child Content')
  expect(child).toBeInTheDocument()
  // parent should be the motion.div wrapper set with style opacity (0 or 1 depending on drag state)
  const opacity = child.parentElement?.style.opacity
  expect(['0', '1']).toContain(opacity)
})
