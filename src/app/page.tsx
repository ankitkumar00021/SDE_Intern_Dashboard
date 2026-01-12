import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import MainView from '../components/MainView'
import demo from '../lib/demoArticles.json'

export default function Home() {
  const isDemo = !Boolean(process.env.NEWS_API_KEY)

  return (
    <div className="flex-1 flex flex-col">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          {isDemo && (
            <div className="mb-4 p-3 rounded bg-yellow-50 text-yellow-800">
              Demo mode (server-rendered): showing sample articles so the UI is visible without an API key.
              <ul className="mt-2 list-disc list-inside text-sm text-slate-700">
                {demo.articles.slice(0, 3).map((a: any) => (
                  <li key={a.url} className="truncate max-w-xl">
                    {a.title}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <MainView />
        </main>
      </div>
    </div>
  )
}
