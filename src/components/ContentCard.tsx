"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store'
import { toggleFavorite } from '../store/slices/favoritesSlice'

type Props = {
  title: string
  description?: string
  image?: string
  url?: string
  onMoveUp?: () => void
  onMoveDown?: () => void
}

export default function ContentCard({ title, description, image, url, onMoveUp, onMoveDown }: Props) {
  const dispatch = useDispatch<AppDispatch>()
  const favorites = useSelector((s: RootState) => s.favorites.items)
  const isFavorited = !!favorites.find((f: any) => (f.url && url && f.url === url) || f.title === title)

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300 }}>
      <div className="bg-white rounded shadow p-4 flex gap-4 dark:bg-slate-800" role="article" tabIndex={0} aria-labelledby={`card-${title.replace(/\s+/g, '-')}`}>
        {image ? <img src={image} alt={title} className="w-24 h-24 object-cover rounded" /> : <div className="w-24 h-24 bg-slate-100 rounded dark:bg-slate-700" />}
        <div>
          <h3 id={`card-${title.replace(/\s+/g, '-')}`} className="font-semibold">{title}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">{description}</p>
          <div className="mt-2 flex gap-2 items-center">
            {url ? (
              <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600" aria-label={`Read more about ${title}`}>
                Read More
              </a>
            ) : (
              <button className="text-sm text-slate-400" aria-hidden>
                Read More
              </button>
            )}
            <button
              className={`text-sm ${isFavorited ? 'text-amber-600' : 'text-slate-500'}`}
              onClick={() => dispatch(toggleFavorite({ title, description, url, urlToImage: image }))}
              aria-pressed={isFavorited}
              aria-label={isFavorited ? `Saved ${title}` : `Save ${title}`}
            >
              {isFavorited ? 'Saved' : 'Save'}
            </button>
            {/* keyboard reorder controls for accessibility */}
            <button className="text-sm px-2" onClick={onMoveUp} aria-label={`Move ${title} up`}>▲</button>
            <button className="text-sm px-2" onClick={onMoveDown} aria-label={`Move ${title} down`}>▼</button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
