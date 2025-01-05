/* eslint-disable react/react-in-jsx-scope */
import { getAvailableRooms } from '@/services/rooms'
import FormBooking from './form'
import { getBookingsByCurrentUser } from '@/services/booking'
// import { auth } from '@clerk/nextjs/server'

export const dynamic = 'force-static'
export const revalidate = 60

export default async function Home() {
  const rooms = await getAvailableRooms()
  const userBookings = await getBookingsByCurrentUser()
  return <FormBooking rooms={rooms} userBookings={userBookings} />
}
