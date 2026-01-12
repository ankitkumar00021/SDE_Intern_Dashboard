"use client"
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ContentCard from './ContentCard'
import type { AppDispatch, RootState } from '../store'
import { loadNews } from '../store/slices/contentSlice'

export default function TrendingSection() {
  const dispatch = useDispatch<AppDispatch>()
  const articles = useSelector((s: RootState) => s.content.articles)
  const status = useSelector((s: RootState) => s.content.status)

  useEffect(() => {
    // Use 'general' to show broad trending headlines
    dispatch(loadNews({ category: 'general', page: 1 }))
  }, [dispatch])

  return (
    <section className="space-y-4 p-6">
      <h2 className="text-2xl font-semibold">Trending</h2>
      {status === 'loading' && <div>Loading trending...</div>}
      <div className="grid gap-4">
        {articles.length === 0 && status !== 'loading' && <div>No trending articles yet.</div>}
        {articles.map((a: any, idx: number) => (
          <ContentCard key={a.url || idx} title={a.title} description={a.description} image={a.urlToImage} url={a.url} />
        ))}
      </div>
    </section>
  )
}