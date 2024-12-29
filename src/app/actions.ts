'use server'

import { connectToMongoDB, getCollection } from '@/config/mongodb'

export async function createRoomType(name: string, price: number) {
  await connectToMongoDB()
  const collection = getCollection('roomsTypes')
  await collection.insertOne({ name, price })
}
