'use client'

import { ClerkLoaded, SignInButton, useUser, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Items = {
  '/bookings': 'Reservas',
  '/users': 'Usuarios',
  '/rooms': 'Habitaciones',
  '/room-types': 'Tipos de habitaciones'
  // '/customers': 'Clientes'
}

export default function RootHeader() {
  const pathname = usePathname()
  const { user } = useUser()

  return (
    <header className="bg-white flex justify-between items-center shadow-md p-3 px-4">
      <nav className="px-4">
        <img src="/logo.png" width={50} alt="" />
      </nav>
      <nav className="flex [&>a]:px-3 flex-grow text-slate-600">
        {Object.entries(Items).map(([key, value]) => (
          <Link
            data-active={pathname.startsWith(key) ? '' : undefined}
            key={key}
            className="data-[active]:text-rose-600 text-sm data-[active]:font-medium"
            href={key}
          >
            {value}
          </Link>
        ))}
      </nav>
      <nav>
        <ClerkLoaded>
          {!user ? (
            <SignInButton mode="redirect">
              <button className="font-semibold shadow-lg hover:scale-105 transition-transform max-w-md w-full bg-rose-500 p-3.5 rounded-full px-9 tracking-tight text-rose-50">
                Iniciar sesión
              </button>
            </SignInButton>
          ) : (
            <UserButton showName />
          )}
        </ClerkLoaded>
      </nav>
    </header>
  )
}
