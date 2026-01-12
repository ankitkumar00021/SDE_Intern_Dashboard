"use client"
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSection } from '../store/slices/uiSlice'
import type { AppDispatch, RootState } from '../store'

export default function Sidebar() {
  const dispatch = useDispatch<AppDispatch>()
  const section = useSelector((s: RootState) => s.ui.section)
  const btn = (label: string, sec: 'feed' | 'trending' | 'favorites' | 'settings') => (
    <button
      className={`py-2 px-3 rounded ${section === sec ? 'bg-slate-100 font-semibold' : 'hover:bg-slate-100'}`}
      onClick={() => dispatch(setSection(sec))}
    >
      {label}
    </button>
  )

  return (
    <aside className="w-64 bg-white border-r p-4">
      <nav className="flex flex-col gap-2">
        {btn('Feed', 'feed')}
        {btn('Trending', 'trending')}
        {btn('Favorites', 'favorites')}
        {btn('Settings', 'settings')}
      </nav>
    </aside>
  )
}
