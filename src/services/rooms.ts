import { Room, RoomType } from '@/types/room'
import { connectToMongoDB, getCollection } from '@/config/mongodb'
import { currentUser } from '@clerk/nextjs/server'
import { uploadImage } from './cloudinary'
import { ObjectId } from 'mongodb'

export async function getRooms(): Promise<{
  rooms: Room[]
  roomTypes: RoomType[]
}> {
  await connectToMongoDB()
  const roomsCollection = getCollection('rooms')
  const roomsTypesCollection = getCollection('rooms-types')

  const rooms = await roomsCollection.find().toArray()
  const roomsTypes = await roomsTypesCollection.find().toArray()
  const roomTypes = roomsTypes.map((roomType) => ({
    _id: roomType._id.toString(),
    name: roomType.name,
    price: roomType.price,
    clerkUser: roomType.clerkUser,
    createdAt: roomType.createdAt.toString(),
    updatedAt: roomType.updatedAt.toString()
  }))

  const type = (id: string) => {
    const t = roomTypes.find((type) => type._id.toString() === id)
    return {
      _id: t!._id.toString(),
      name: t!.name,
      price: t!.price,
      clerkUser: t!.clerkUser,
      createdAt: t!.createdAt?.toString(),
      updatedAt: t!.updatedAt?.toString()
    }
  }

  return {
    rooms: rooms.map((room) => ({
      _id: room._id.toString(),
      name: room.name,
      available: room.available,
      clerkUser: room.clerkUser,
      image: room.image,
      roomTypeId: room.roomTypeId,
      description: room.description,
      type: type(room.roomTypeId.toString()),
      createdAt: room.createdAt.toString(),
      updatedAt: room.updatedAt.toString()
    })),
    roomTypes
  }
}

export async function getAvailableRooms(): Promise<Room[]> {
  await connectToMongoDB()
  const rooms = await getCollection('rooms')
    .aggregate([
      {
        $match: {
          available: true
        }
      },
      {
        $lookup: {
          from: 'rooms-types',
          localField: 'roomTypeId',
          foreignField: '_id',
          as: 'type'
        }
      }
    ])
    .toArray()

  return rooms.map(
    (room) =>
      ({
        _id: room._id.toString(),
        available: room.available,
        clerkUser: room.clerkUser,
        image: room.image,
        roomTypeId: room.roomTypeId.toString(),
        description: room.description,
        name: room.name,
        type: {
          _id: room.type[0]?._id?.toString(),
          name: room.type[0]?.name,
          price: room.type[0]?.price,
          clerkUser: room.type[0]?.clerkUser,
          createdAt: room.type[0]?.createdAt?.toString(),
          updatedAt: room.type[0]?.updatedAt?.toString()
        },
        createdAt: room.createdAt?.toString(),
        updatedAt: room.updatedAt?.toString()
      } as Room)
  )
}

export async function createRoom(form: FormData) {
  await connectToMongoDB()
  const user = await currentUser()

  const collection = getCollection('rooms')

  const { url } = isValidFile(form.get('image'))
    ? await uploadImage(form.get('image') as File)
    : { url: null }

  await collection.insertOne({
    roomTypeId: new ObjectId(form.get('roomTypeId') as string),
    description: form.get('description'),
    name: form.get('name'),
    available: form.get('available') === '',
    clerkUser: {
      _id: user!.id,
      names: user!.fullName
    },
    image: url ?? null,
    createdAt: new Date(),
    updatedAt: new Date()
  })
}

export async function deleteRoom(id: string) {
  await connectToMongoDB()
  const collection = getCollection('rooms')
  await collection.deleteOne({ _id: new ObjectId(id) })
}

export async function updateRoom(id: string, form: FormData) {
  await connectToMongoDB()
  const collection = getCollection('rooms')

  const room = await collection.findOne({ _id: new ObjectId(id) })

  const { url } = isValidFile(form.get('image'))
    ? await uploadImage(form.get('image') as File)
    : {
        url: room!.image as string
      }

  await collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        roomTypeId: form.get('roomTypeId'),
        description: form.get('description'),
        available: form.get('available') === '',
        name: form.get('name'),
        image: url ?? null,
        updatedAt: new Date()
      }
    }
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isValidFile = (file: any) => {
  const type = file.type.split('/')[0]
  return type === 'image'
}
