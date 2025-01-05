import { ObjectId } from 'mongodb'
import { currentUser } from '@clerk/nextjs/server'
import { RoomType } from '@/types/room'
import { connectToMongoDB, getCollection } from '@/config/mongodb'

export async function getRoomsTypes(): Promise<RoomType[]> {
  await connectToMongoDB()

  const collection = getCollection('rooms-types')
  const roomTypes = await collection.find().toArray()
  return roomTypes.map((roomType) => ({
    _id: roomType._id.toString(),
    name: roomType.name,
    price: roomType.price,
    clerkUser: roomType.clerkUser,
    createdAt: roomType.createdAt.toString(),
    updatedAt: roomType.updatedAt.toString()
  }))
}

export async function createRoomType(form: FormData) {
  await connectToMongoDB()
  const user = await currentUser()
  const collection = getCollection('rooms-types')

  await collection.insertOne({
    name: form.get('name'),
    price: Number(form.get('price') ?? '0'),
    clerkUser: {
      _id: user!.id,
      names: user!.fullName
    },
    createdAt: new Date(),
    updatedAt: new Date()
  })
}

export async function deleteRoomType(id: string) {
  await connectToMongoDB()
  const collection = getCollection('rooms-types')
  await collection.deleteOne({ _id: new ObjectId(id) })
}

export async function updateRoomType(id: string, form: FormData) {
  await connectToMongoDB()
  const collection = getCollection('rooms-types')
  await collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        name: form.get('name'),
        price: Number(form.get('price') ?? '0'),
        updatedAt: new Date()
      }
    }
  )
}
