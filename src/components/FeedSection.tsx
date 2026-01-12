// "use client"
// import React, { useEffect, useRef, useState } from 'react'
// import ContentCard from './ContentCard'
// import { useDispatch, useSelector } from 'react-redux'
// import { RootState, AppDispatch } from '../store'
// import { loadNews } from '../store/slices/contentSlice'
// import DraggableCard from './DraggableCard'
// import { DndProvider } from 'react-dnd'
// import { HTML5Backend } from 'react-dnd-html5-backend'
// import { useCallback } from 'react'
// import { useDispatch as useAppDispatch } from 'react-redux'
// import { moveItem as moveOrderItem, setOrder as setFeedOrder } from '../store/slices/feedOrderSlice'

// export default function FeedSection() {
//   const dispatch = useDispatch<AppDispatch>()
//   const articles = useSelector((s: RootState) => s.content.articles)
//   const status = useSelector((s: RootState) => s.content.status)
//   const hasMore = useSelector((s: RootState) => s.content.hasMore)
//   const searchQuery = useSelector((s: RootState) => s.ui.searchQuery)
//   const categories = useSelector((s: RootState) => s.preferences.categories)

//   const [page, setPage] = useState(1)
//   const loaderRef = useRef<HTMLDivElement | null>(null)

//   // initial / query / category change
//   useEffect(() => {
//     setPage(1)
//     dispatch(loadNews({ category: categories[0], q: searchQuery || undefined, page: 1 }))
//   }, [categories, searchQuery, dispatch])

//   // observer for infinite scroll
//   useEffect(() => {
//     const observer = new IntersectionObserver(entries => {
//       const el = entries[0]
//       if (el.isIntersecting && status !== 'loading' && hasMore) {
//         setPage(p => p + 1)
//       }
//     })

//     if (loaderRef.current) observer.observe(loaderRef.current)
//     return () => observer.disconnect()
//   }, [status, hasMore])

//   useEffect(() => {
//     if (page > 1) {
//       dispatch(loadNews({ category: categories[0], q: searchQuery || undefined, page }))
//     }
//   }, [page, categories, searchQuery, dispatch])

//   // compute ordered articles based on feedOrder
//   const order = useSelector((s: RootState) => s.feedOrder?.items || [])
//   const orderedArticles = React.useMemo(() => {
//     if (!order || order.length === 0) return articles
//     const map = new Map(articles.map(a => [(a.url || a.title), a]))
//     const list = order.map((id: string) => map.get(id)).filter(Boolean)
//     const remaining = articles.filter(a => !order.includes(a.url || a.title))
//     return list.concat(remaining as any)
//   }, [order, articles])

//   // when we first get articles and no order exists, set it
//   useEffect(() => {
//     if (articles.length > 0 && order.length === 0) {
//       const ids = articles.map(a => a.url || a.title)
//       dispatch(setFeedOrder(ids))
//     }
//   }, [articles, order.length, dispatch])

//   // move callback
//   const appDispatch = useAppDispatch()
//   const move = useCallback(
//     (from: number, to: number) => {
//       appDispatch(moveOrderItem({ from, to }))
//     },
//     [appDispatch]
//   )

//   const isDemo = useSelector((s: RootState) => s.content.isDemo)
//   const errorMsg = useSelector((s: RootState) => s.content.error)
//   const POLL_MS = Number(process.env.NEXT_PUBLIC_POLL_INTERVAL_MS || 300000) // default 5min
//   const [lastUpdated, setLastUpdated] = useState<number | null>(null)

//   const refresh = useCallback(() => {
//     setPage(1)
//     dispatch(loadNews({ category: categories[0], q: searchQuery || undefined, page: 1 }))
//     setLastUpdated(Date.now())
//   }, [dispatch, categories, searchQuery])

//   // polling for live updates when not demo
//   useEffect(() => {
//     if (isDemo) return
//     const id = setInterval(() => {
//       if (status !== 'loading') {
//         refresh()
//       }
//     }, POLL_MS)
//     return () => clearInterval(id)
//   }, [isDemo, POLL_MS, status, refresh])

//   return (
//     <section className="space-y-4">
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-semibold">Personalized Feed</h2>
//         <div className="flex items-center gap-3">
//           {lastUpdated && <span className="text-sm text-slate-500">Updated {new Date(lastUpdated).toLocaleTimeString()}</span>}
//           <button className="px-3 py-1 border rounded text-sm" onClick={refresh} aria-label="Refresh feed">Refresh</button>
//         </div>
//       </div>

//       {isDemo && (
//         <div className="p-3 rounded bg-yellow-50 text-yellow-800">Demo mode — no <code>NEWS_API_KEY</code> set. To view live articles, add the key to <code>.env.local</code> and restart.</div>
//       )}

//       {errorMsg && (
//         <div className="p-3 rounded bg-red-50 text-red-800">API error: {typeof errorMsg === 'string' ? errorMsg : 'Unknown error'}</div>
//       )}

//       {status === 'loading' && <div>Loading...</div>}
//       <DndProvider backend={HTML5Backend}>
//         <div className="grid gap-4">
//           {orderedArticles.length === 0 && status !== 'loading' && <div>No content yet.</div>}
//           {orderedArticles.map((a: any, idx: number) => (
//             <DraggableCard key={a.url || idx} id={a.url || a.title} index={idx} move={move}>
//               <ContentCard
//                 title={a.title}
//                 description={a.description}
//                 image={a.urlToImage}
//                 url={a.url}
//                 onMoveUp={() => move(idx, Math.max(0, idx - 1))}
//                 onMoveDown={() => move(idx, Math.min(orderedArticles.length - 1, idx + 1))}
//               />
//             </DraggableCard>
//           ))}
//         </div>
//       </DndProvider>
//       <div ref={loaderRef} className="h-8" />
//     </section>
//   )
// }









"use client"
import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import ContentCard from './ContentCard'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../store'
import { loadNews } from '../store/slices/contentSlice'
import DraggableCard from './DraggableCard'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { moveItem as moveOrderItem, setOrder as setFeedOrder } from '../store/slices/feedOrderSlice'

export default function FeedSection() {
  const dispatch = useDispatch<AppDispatch>()
  const articles = useSelector((s: RootState) => s.content.articles)
  const status = useSelector((s: RootState) => s.content.status)
  const hasMore = useSelector((s: RootState) => s.content.hasMore)
  const searchQuery = useSelector((s: RootState) => s.ui.searchQuery)
  const categories = useSelector((s: RootState) => s.preferences.categories)
  const order = useSelector((s: RootState) => s.feedOrder.items)

  const [page, setPage] = useState(1)
  const loaderRef = useRef<HTMLDivElement | null>(null)

  /* ---------------- Load News ---------------- */

  useEffect(() => {
    setPage(1)
    dispatch(loadNews({ category: categories[0], q: searchQuery || undefined, page: 1 }))
  }, [categories, searchQuery, dispatch])

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && status !== 'loading' && hasMore) {
        setPage(p => p + 1)
      }
    })
    if (loaderRef.current) observer.observe(loaderRef.current)
    return () => observer.disconnect()
  }, [status, hasMore])

  useEffect(() => {
    if (page > 1) {
      dispatch(loadNews({ category: categories[0], q: searchQuery || undefined, page }))
    }
  }, [page, categories, searchQuery, dispatch])

  /* ---------------- Sync Redux order ---------------- */

  useEffect(() => {
  if (!articles.length) return

  const ids = articles.map(a => a.url || a.title)

  // First load
  if (order.length === 0) {
    dispatch(setFeedOrder(ids))
    return
  }

  // Append newly arrived articles
  const missing = ids.filter(id => !order.includes(id))
  if (missing.length > 0) {
    dispatch(setFeedOrder([...order, ...missing]))
  }
}, [articles, order, dispatch])


  /* ---------------- Stable ordered list ---------------- */

  const orderedArticles = useMemo(() => {
  if (!articles.length) return []

  const byId = new Map(articles.map(a => [(a.url || a.title), a]))

  // 1️⃣ Items that exist in both Redux order & API
  const ordered = order
    .map(id => byId.get(id))
    .filter(Boolean)

  // 2️⃣ New articles that were not in Redux order
  const newOnes = articles.filter(a => !order.includes(a.url || a.title))

  // 3️⃣ Merge
  return [...ordered, ...newOnes]
}, [order, articles])


  /* ---------------- Move handler ---------------- */

  const move = useCallback(
  (activeId: string, overId: string) => {
    dispatch(moveOrderItem({ activeId, overId }))
  },
  [dispatch]
)


  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Personalized Feed</h2>

      <DndProvider backend={HTML5Backend}>
        <div className="grid gap-4">
          {orderedArticles.map((a: any, idx: number) => (
            <DraggableCard
              key={a.url || a.title}
              id={a.url || a.title}
              index={idx}
              move={move}
            >
              <ContentCard
                title={a.title}
                description={a.description}
                image={a.urlToImage}
                url={a.url}
              />
            </DraggableCard>
          ))}
        </div>
      </DndProvider>

      <div ref={loaderRef} className="h-10" />
    </section>
  )
}
