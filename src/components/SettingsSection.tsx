"use client"
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store'
import { toggleDarkMode, setCategories } from '../store/slices/preferencesSlice'
import { clearFavorites } from '../store/slices/favoritesSlice'

const ALL_CATEGORIES = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology']

export default function SettingsSection() {
  const dispatch = useDispatch<AppDispatch>()
  const prefs = useSelector((s: RootState) => s.preferences)
  const [selected, setSelected] = useState<string[]>(prefs.categories || [])

  const toggleCat = (cat: string) => {
    setSelected(s => (s.includes(cat) ? s.filter(c => c !== cat) : [...s, cat]))
  }

  const [saved, setSaved] = React.useState(false)
  const save = () => {
    dispatch(setCategories(selected))
    setSaved(true)
    // temporary visual confirmation
    setTimeout(() => setSaved(false), 2000)
    // also log for debug
    // (browser console) so user/dev can see action fired
    // eslint-disable-next-line no-console
    console.info('[settings] saved categories', selected)
  }

  return (
    <section className="p-6 space-y-4">
      <h2 className="text-2xl font-semibold">Settings</h2>

      <div className="space-y-2">
        <h3 className="font-medium">Theme</h3>
        <button
          className="px-3 py-2 border rounded"
          onClick={() => dispatch(toggleDarkMode())}
        >
          Toggle Dark Mode
        </button>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Categories</h3>
        <div className="grid grid-cols-3 gap-2">
          {ALL_CATEGORIES.map(cat => (
            <label key={cat} className="flex items-center gap-2">
              <input type="checkbox" checked={selected.includes(cat)} onChange={() => toggleCat(cat)} />
              <span className="capitalize">{cat}</span>
            </label>
          ))}
        </div>
        <div className="mt-2 flex items-center gap-3">
          <button className="px-3 py-2 border rounded" onClick={save}>Save</button>
          {saved && <span className="text-sm text-green-600">Saved</span>}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Data</h3>
        <div>
          <button className="px-3 py-2 border rounded text-red-600" onClick={() => dispatch(clearFavorites())}>
            Clear all favorites
          </button>
        </div>
      </div>
    </section>
  )
}