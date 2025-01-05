'use client'

import { Room } from '@/types/room'
import { ClerkLoaded, SignInButton, useUser } from '@clerk/nextjs'
import React from 'react'
import { useLanding } from './providers'
import { createCheckoutSession, State } from '@/actions/create-chekout'
import { Booking } from '@/types/booking'

export default function FormBooking(props: {
  rooms: Room[]
  userBookings: Booking[]
}) {
  const { user, isSignedIn } = useUser()
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const { state, setState } = useLanding()

  const handleCheckout = async () => {
    if (!isSignedIn) return

    if (!state.checkIn || !state.checkOut || !state.room) {
      setError(
        'Por favor, selecciona las fechas de tu estancia y la habitación.'
      )
      return
    }

    setIsLoading(true)

    try {
      const data: State = {
        orderNumber: crypto.randomUUID(),
        customerName: user.fullName ?? 'Unknown',
        customerEmail: user.primaryEmailAddress?.emailAddress ?? 'Unknown',
        clerkUserId: user.id,
        checkIn: state.checkIn!,
        checkOut: state.checkOut!,
        room: state.room!,
        customerPhotoURL: user.imageUrl ?? ''
      }

      // Create a checkout session
      const checkoutURL = await createCheckoutSession(data)

      // Redirect to the checkout page
      if (checkoutURL) {
        window.location.href = checkoutURL
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full pb-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex gap-5 w-full items-end">
          <label className="block font-semibold w-full">
            <span className="font-medium text-sm pb-1 block">Check-in</span>
            <input
              type="date"
              min={new Date().toISOString().split('T')[0]}
              defaultValue={
                state.checkIn ? state.checkIn.toISOString().split('T')[0] : ''
              }
              onChange={(e) => {
                setState({
                  ...state,
                  checkIn: new Date(e.target.value)
                })
              }}
              className="placeholder:text-neutral-400 w-full border-2 border-black/20 rounded-full focus:border-rose-500 p-3 px-5 outline-none"
            />
          </label>
          <label className="block font-semibold w-full">
            <span className="font-medium text-sm pb-1 block">Check-out</span>
            <input
              defaultValue={
                state.checkOut ? state.checkOut.toISOString().split('T')[0] : ''
              }
              min={state.checkIn?.toISOString().split('T')[0]}
              onChange={(e) => {
                setState({
                  ...state,
                  checkOut: new Date(e.target.value)
                })
              }}
              type="date"
              className="placeholder:text-neutral-400 w-full border-2 border-black/20 rounded-full focus:border-rose-500 p-3 px-5 outline-none"
            />
          </label>

          <ClerkLoaded>
            {!user ? (
              <SignInButton mode="redirect">
                <button className="font-semibold shadow-lg hover:scale-105 transition-transform max-w-md w-full bg-rose-500 p-3.5 rounded-full px-9 tracking-tight text-rose-50">
                  Iniciar sesión
                </button>
              </SignInButton>
            ) : (
              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="font-semibold disabled:opacity-70 shadow-lg hover:scale-105 transition-transform max-w-md w-full bg-rose-500 p-3.5 rounded-full px-9 tracking-tight text-rose-50"
              >
                {isLoading ? 'Cargando...' : 'Reservar'}
              </button>
            )}
          </ClerkLoaded>
        </div>
        <p
          data-error={error ? '' : undefined}
          className="pt-3 text-sm data-[error]:text-rose-500 data-[error]:opacity-100 opacity-60 text-center"
        >
          {error ?? 'Por favor, selecciona las fechas de tu estancia.'}
        </p>
      </div>
      <div className="flex flex-col gap-3 justify-center items-center pt-5">
        {props.userBookings.map((booking) => {
          if (booking.clerkUserId.toString() !== user?.id.toString())
            return null
          return (
            <div
              className="border-2 rounded-full p-2 font-semibold px-3"
              key={booking._id}
            >
              {booking.room?.name} -{' '}
              <span className="text-rose-600 font-semibold">
                {booking.room?.type?.price.toLocaleString('es-PE', {
                  style: 'currency',
                  currency: 'PEN'
                })}
              </span>{' '}
              ({new Date(booking.checkIn).toLocaleDateString()} -{' '}
              {new Date(booking.checkOut).toLocaleDateString()})
            </div>
          )
        })}
      </div>
      <div className="max-w-5xl mx-auto pt-10 w-full">
        <div className="grid grid-cols-4 w-full gap-0">
          {props.rooms.map((room, index) => (
            <button
              key={index}
              data-selected={state.room?._id === room._id ? '' : null}
              onClick={() => {
                setState({
                  ...state,
                  room
                })
              }}
              className="w-full border-2 border-transparent group data-[selected]:border-rose-600 rounded-3xl p-3 text-left h-full"
            >
              <div className="rounded-xl aspect-[10/7] overflow-hidden">
                <img
                  src={room.image}
                  className="w-full group-hover:scale-105 transition-transform h-full object-cover"
                />
              </div>
              <div className="flex items-start gap-4 pt-2 px-2">
                <div className="">
                  <p className="font-semibold line-clamp-1 text-sm">
                    {room.name}
                  </p>
                  <p className="text-xs line-clamp-2">{room.description} </p>
                </div>
                <div>
                  <p className="font-semibold text-base">
                    {room.type?.price.toLocaleString('es-PE', {
                      style: 'currency',
                      currency: 'PEN',
                      minimumFractionDigits: 2
                    })}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
