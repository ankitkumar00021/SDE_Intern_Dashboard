"use client"
import React from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../store'
import FeedSection from './FeedSection'
import FavoritesSection from './FavoritesSection'
import SettingsSection from './SettingsSection'
import TrendingSection from './TrendingSection'

export default function MainView() {
  const section = useSelector((s: RootState) => s.ui.section)

  if (section === 'favorites') return <FavoritesSection />
  if (section === 'trending') return <TrendingSection />
  if (section === 'settings') return <SettingsSection />

  return <FeedSection />
}
