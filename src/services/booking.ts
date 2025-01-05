import { connectToMongoDB, getCollection } from '@/config/mongodb'
import { Booking } from '@/types/booking'
// import { currentUser } from '@clerk/nextjs/server'

export async function getBookings(): Promise<Booking[]> {
  await connectToMongoDB()
  const bookingsCollection = getCollection('bookings')

  const bookings = await bookingsCollection
    .aggregate([
      {
        $lookup: {
          from: 'rooms',
          localField: 'roomId',
          foreignField: '_id',
          as: 'room'
        }
      },
      {
        $lookup: {
          from: 'rooms-types',
          localField: 'room.roomTypeId',
          foreignField: '_id',
          as: 'type'
        }
      }
    ])
    .toArray()

  return bookings.map((booking) => ({
    _id: booking._id.toString(),
    roomId: booking.roomId.toString(),
    bookingNumber: booking.bookingNumber,
    customerName: booking.customerName,
    customerEmail: booking.customerEmail,
    customerPhotoURL: booking.customerPhotoURL,
    stripeCheckoutSessionId: booking.stripeCheckoutSessionId,
    stripePaymentIntentId: booking.stripePaymentIntentId,
    checkIn: booking.checkIn.toString(),
    checkOut: booking.checkOut.toString(),
    clerkUserId: booking.clerkUserId,
    createdAt: booking.createdAt?.toString(),
    updatedAt: booking.updatedAt?.toString(),
    room: {
      ...booking.room[0],
      type: booking.type[0]
    }
  })) as unknown as Booking[]
}

export async function getBookingsByCurrentUser(): Promise<Booking[]> {
  await connectToMongoDB()
  const bookingsCollection = getCollection('bookings')
  //   const user = await currentUser()
  const bookings = await bookingsCollection
    .aggregate([
      {
        $lookup: {
          from: 'rooms',
          localField: 'roomId',
          foreignField: '_id',
          as: 'room'
        }
      },
      {
        $lookup: {
          from: 'rooms-types',
          localField: 'room.roomTypeId',
          foreignField: '_id',
          as: 'type'
        }
      }
      //   {
      //     $match: {
      //       clerkUserId: user?.id
      //     }
      //   }
    ])
    .toArray()

  return bookings.map((booking) => ({
    _id: booking._id.toString(),
    roomId: booking.roomId.toString(),
    bookingNumber: booking.bookingNumber,
    customerName: booking.customerName,
    customerEmail: booking.customerEmail,
    customerPhotoURL: booking.customerPhotoURL,
    stripeCheckoutSessionId: booking.stripeCheckoutSessionId,
    stripePaymentIntentId: booking.stripePaymentIntentId,
    checkIn: booking.checkIn.toString(),
    checkOut: booking.checkOut.toString(),
    clerkUserId: booking.clerkUserId,
    createdAt: booking.createdAt?.toString(),
    updatedAt: booking.updatedAt?.toString(),
    room: {
      _id: booking.room[0]._id.toString(),
      available: booking.room[0].available,
      image: booking.room[0].image,
      name: booking.room[0].name,
      type: {
        _id: booking.type[0]?._id.toString(),
        name: booking.type[0]?.name,
        price: booking.type[0]?.price,
        clerkUser: booking.type[0]?.clerkUser,
        createdAt: booking.type[0]?.createdAt.toString(),
        updatedAt: booking.type[0]?.updatedAt.toString()
      }
    }
  })) as unknown as Booking[]
}
