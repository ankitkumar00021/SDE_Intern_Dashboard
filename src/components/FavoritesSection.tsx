"use client"
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ContentCard from './ContentCard'
import type { RootState, AppDispatch } from '../store'
import { removeFavorite } from '../store/slices/favoritesSlice'

export default function FavoritesSection() {
  const dispatch = useDispatch<AppDispatch>()
  const items = useSelector((s: RootState) => s.favorites.items)

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Favorites</h2>
      {items.length === 0 && <div>No favorites yet. Click "Save" on an article to add it here.</div>}
      <div className="grid gap-4">
        {items.map((a: any, idx: number) => (
          <div key={a.url || idx} className="relative">
            <ContentCard title={a.title} description={a.description} image={a.urlToImage} url={a.url} />
            <button
              className="absolute top-2 right-2 text-sm text-red-500"
              onClick={() => dispatch(removeFavorite(a.url || a.title))}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
