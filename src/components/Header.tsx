"use client"
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchQuery } from '../store/slices/uiSlice'
import type { AppDispatch, RootState } from '../store'
import { toggleDarkMode } from '../store/slices/preferencesSlice'

export default function Header() {
  const [q, setQ] = useState('')
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const t = setTimeout(() => {
      dispatch(setSearchQuery(q))
    }, 500)
    return () => clearTimeout(t)
  }, [q, dispatch])

  return (
    <header className="w-full bg-white shadow p-4 flex items-center justify-between">
      <div className="text-lg font-semibold">Personalized Dashboard</div>
      <div className="flex items-center gap-4">
        <input
          className="border rounded p-2 dark:bg-slate-700 dark:text-slate-100"
          placeholder="Search news, movies, posts..."
          value={q}
          onChange={e => setQ(e.target.value)}
        />
        <button
          aria-label="toggle-dark-mode"
          className="px-3 py-2 rounded bg-slate-100 dark:bg-slate-700"
          onClick={() => dispatch(toggleDarkMode())}
        >
          {/** simple emoji icon, replace with icon if desired */}
          🌙
        </button>
        {/* API status indicator */}
        <div aria-label="api-status" className="px-3 py-1 rounded text-sm bg-slate-100 dark:bg-slate-700">
          {useSelector((s: RootState) => s.content.isDemo) ? (
            <span className="text-yellow-700">Demo</span>
          ) : (
            <span className="text-green-700">Live</span>
          )}
        </div>
        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-600" />
      </div>
    </header>
  )
}
