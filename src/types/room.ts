import { type ObjectId } from 'mongodb'

export type Room = {
  _id: ObjectId
  roomTypeId: ObjectId
  description?: string
  available: boolean
  clerkUserId: string
  createdAt: string
  updatedAt: string
}

export type RoomType = {
  _id: ObjectId
  name: string
  price: number
  clerkUserId: string
  createdAt: string
  updatedAt: string
}
