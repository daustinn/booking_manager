'use client'

import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

export default function SuccessCheckoutPage() {
  const { user } = useUser()
  return (
    <div className="flex justify-center py-10">
      <div className="p-4 rounded-xl text-center max-w-md bg-rose-500 text-white">
        <h1 className="text-lg font-semibold">
          {user?.fullName}, gracias por tu preferencia.
        </h1>
        <p className="text-sm pt-5 opacity-80">
          Hemos recibido tu solicitud de reserva, en breve recibirás un correo
          con los detalles de tu reserva.
        </p>
        <Link
          href={'/'}
          className="hover:underline px-3 p-1.5 font-semibold rounded-lg bg-white text-red-500"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
