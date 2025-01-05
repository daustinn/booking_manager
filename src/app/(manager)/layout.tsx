import React from 'react'
import RootHeader from './header'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <RootHeader />
      <div className="p-4">{children}</div>
    </div>
  )
}
