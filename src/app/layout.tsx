import './globals.css'
import React from 'react'
import Providers from './providers'

export const metadata = {
  title: 'Personalized Content Dashboard',
  description: 'SDE intern assignment',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="min-h-screen flex bg-gray-50">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
