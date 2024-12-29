import { ObjectId } from 'mongodb'

export type Customer = {
  _id: ObjectId
  documentId: string
  names: string
  email: string
  nationality?: string
  phoneNumber?: string
  clerkUserId: string
  createdAt: string
  updatedAt: string
}
