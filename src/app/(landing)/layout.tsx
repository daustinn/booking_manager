import React from 'react'
import LandingProvider from './providers'
import LandingHeader from './header'

export default function LandingLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <LandingProvider>
      <div>
        <LandingHeader />
        {children}
        <footer className="border-t">
          <div className="max-w-3xl mx-auto py-5">
            <p className="text-center text-sm opacity-60">
              © 2022 Hotel Hametza. Todos los derechos reservados.
            </p>
          </div>
        </footer>
      </div>
    </LandingProvider>
  )
}
