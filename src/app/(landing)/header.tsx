'use client'

import { useAuth, useUser } from '@clerk/nextjs'
import React from 'react'
import { HiLocationMarker } from 'react-icons/hi'

export default function LandingHeader() {
  const { user } = useUser()
  const { signOut } = useAuth()
  //   const isAdmin = orgRole === 'org:admin'
  return (
    <>
      <div className="border-b">
        <header className="px-4 w-full py-3 flex flex-col items-center mx-auto">
          <nav className="">
            <img src="/logo.png" width={100} alt="" />
          </nav>
          <p className="flex items-center gap-1 text-sm pt-1 font-medium">
            <HiLocationMarker className="text-rose-600" />
            Calle M MZ. K, Ayacucho, Ayacucho, 05003
          </p>
        </header>
      </div>
      <header className="text-center space-y-2 py-3">
        {user && (
          <h1 className="text-6xl max-w-3xl pt-10 pb-2 mx-auto font-semibold tracking-tight">
            Hola, <span className="font-bold">{user.fullName}</span> empieza a
            reservar tu habitación.
          </h1>
        )}
        {user && (
          <button
            onClick={() => signOut()}
            className="py-2 px-3 font-semibold text-rose-600 text-sm"
          >
            Cerrar sesión de <span className="underline">{user.fullName}</span>
          </button>
        )}
      </header>
    </>
  )
}
