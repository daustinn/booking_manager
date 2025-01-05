import { Room } from './room'

export type Booking = {
  _id: string
  roomId: string
  bookingNumber: string
  customerName: string
  customerEmail: string
  customerPhotoURL: string
  room?: Room
  stripeCheckoutSessionId: string
  stripePaymentIntentId: string
  checkIn: Date
  checkOut: Date
  clerkUserId: string
  createdAt: string
  updatedAt: string
}
