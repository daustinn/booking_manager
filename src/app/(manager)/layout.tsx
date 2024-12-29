'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Items = {
  '/bookings': 'Reservas',
  '/users': 'Usuarios',
  '/rooms': 'Habitaciones',
  '/room-types': 'Tipos de habitaciones',
  '/customers': 'Clientes'
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <div>
      <header className="bg-white flex justify-between items-center shadow-md p-2 px-4">
        <nav className="px-4">
          <img src="/logo.png" width={50} alt="" />
        </nav>
        <nav className="flex [&>a]:px-3 flex-grow text-slate-600">
          {Object.entries(Items).map(([key, value]) => (
            <Link
              data-active={pathname.startsWith(key) ? '' : undefined}
              key={key}
              className="data-[active]:text-rose-600 data-[active]:font-medium"
              href={key}
            >
              {value}
            </Link>
          ))}
        </nav>
        <nav>
          <button className="w-10 aspect-square rounded-full overflow-hidden">
            <img
              src="/avatar-example.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
          </button>
        </nav>
      </header>
      <div className="p-4">{children}</div>
    </div>
  )
}
