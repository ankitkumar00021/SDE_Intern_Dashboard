// "use client"
// import React, { useRef } from 'react'
// import { useDrag, useDrop } from 'react-dnd'
// import { motion } from 'framer-motion'

// const ITEM_TYPE = 'CARD'

// export default function DraggableCard({ id, index, move, children }: { id: string; index: number; move: (from: number, to: number) => void; children: React.ReactNode }) {
//   const ref = useRef<HTMLDivElement | null>(null)

//   const [, drop] = useDrop({
//     accept: ITEM_TYPE,
//     hover(item: any, monitor) {
//       if (!ref.current) return
//       const dragIndex = item.index
//       const hoverIndex = index
//       if (dragIndex === hoverIndex) return
//       // determine rectangle on screen
//       const hoverBoundingRect = ref.current.getBoundingClientRect()
//       const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
//       const clientOffset = monitor.getClientOffset()
//       if (!clientOffset) return
//       const hoverClientY = clientOffset.y - hoverBoundingRect.top
//       // only perform the move when the mouse has crossed half of the item's height
//       if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
//       if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return
//       move(dragIndex, hoverIndex)
//       item.index = hoverIndex
//     },
//   })

//   const [{ isDragging }, drag] = useDrag({
//     type: ITEM_TYPE,
//     item: { id, index },
//     collect: monitor => ({
//       isDragging: monitor.isDragging(),
//     }),
//   })

//   drag(drop(ref))

//   return (
//     <motion.div ref={ref} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ opacity: isDragging ? 0.5 : 1 }}>
//       {children}
//     </motion.div>
//   )
// }



"use client"
import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { motion } from 'framer-motion'

const ITEM_TYPE = 'CARD'

export default function DraggableCard({ id, index, move, children }: {
  id: string
  index: number
  move: (activeId: string, overId: string) => void

  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)

  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover(item: any, monitor) {
      if (!ref.current) return

      // const dragIndex = item.index
      // const hoverIndex = index
      // if (dragIndex === hoverIndex) return

      // const hoverRect = ref.current.getBoundingClientRect()
      // const hoverMiddleY = (hoverRect.bottom - hoverRect.top) / 2
      // const clientOffset = monitor.getClientOffset()
      // if (!clientOffset) return

      // const hoverClientY = clientOffset.y - hoverRect.top

      // if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
      // if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

      // move(dragIndex, hoverIndex)
      // item.index = hoverIndex

      if (item.id === id) return
move(item.id, id)
item.id = id

    },
  })

  const [{ isDragging }, drag] = useDrag(() => ({
  type: ITEM_TYPE,
  item: () => ({ id }),

  collect: monitor => ({
    isDragging: monitor.isDragging(),
  }),
}), [id, index])


  drag(drop(ref))

  return (
   <motion.div
  ref={ref}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  layout="position"
  transition={{ type: "spring", stiffness: 500, damping: 40 }}
  style={{ opacity: isDragging ? 0.5 : 1 }}
>

      {children}
    </motion.div>
  )
}
