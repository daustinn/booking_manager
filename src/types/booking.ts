import { type ObjectId } from 'mongodb'

export type Booking = {
  _id: ObjectId
  customerId: ObjectId
  roomId: ObjectId
  stripeId: string
  checkIn: Date
  checkOut: Date
  clerkUserId: string
  createdAt: string
  updatedAt: string
}
