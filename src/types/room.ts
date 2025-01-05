type clerkUser = {
  _id: string
  names: string
}

export type RoomType = {
  _id: string
  name: string
  price: number
  clerkUser: clerkUser
  createdAt: string
  updatedAt: string
}

export type Room = {
  _id: string
  roomTypeId: string
  type?: RoomType | null
  name: string
  description?: string
  available: boolean
  clerkUser: clerkUser
  image: string
  createdAt: string
  updatedAt: string
}
