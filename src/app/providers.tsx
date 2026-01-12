"use client"
import React, { useEffect } from 'react'
import { Provider, useSelector } from 'react-redux'
import { store } from '../store'
import type { RootState } from '../store'

function ThemeObserver() {
  const dark = useSelector((s: RootState) => s.preferences.darkMode)
  useEffect(() => {
    const root = document.documentElement
    if (dark) root.classList.add('dark')
    else root.classList.remove('dark')
  }, [dark])
  return null
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeObserver />
      {children}
    </Provider>
  )
}
