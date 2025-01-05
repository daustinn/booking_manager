import { getBookings } from '@/services/booking'
import React from 'react'

export default async function BookingPage() {
  const bookings = await getBookings()
  return (
    <div>
      <div className="max-w-3xl mx-auto w-full">
        <table className="w-full text-left">
          <thead>
            <tr className="[&>th]:font-medium text-sm  border-b [&>th]:p-2 text-left">
              <th>Cliente</th>
              <th>Habitacion</th>
              <th>Check-in</th>
              <th>Check-out</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking._id}
                className="text-sm [&>td]:p-3 even:bg-stone-50"
              >
                <td>
                  <div className="flex items-center gap-3">
                    <div className="w-7 rounded-full aspect-square overflow-hidden">
                      <img
                        src={booking.customerPhotoURL}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p>{booking.customerName}</p>
                      {booking.customerEmail && (
                        <p className="text-xs opacity-80">
                          {booking.customerEmail}
                        </p>
                      )}
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <p>{booking.room?.name ?? '-'}</p>
                    <p className="font-semibold text-sm">
                      {booking.room?.type?.price.toLocaleString('es-PE', {
                        style: 'currency',
                        currency: 'PEN',
                        minimumFractionDigits: 2
                      }) ?? '-'}
                    </p>
                  </div>
                </td>
                <td>{new Date(booking.checkIn).toLocaleDateString()}</td>
                <td>{new Date(booking.checkOut).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
