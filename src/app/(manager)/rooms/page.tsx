import React from 'react'
import FormRoom from './_form'
import { createRoom, deleteRoom, getRooms, updateRoom } from '@/services/rooms'
import { revalidatePath } from 'next/cache'
import RoomsGrid from './_grid'

export default async function RoomsPage() {
  const create = async (form: FormData) => {
    'use server'
    await createRoom(form)
    revalidatePath('/manager/rooms')
    revalidatePath('/')
  }

  const deleteR = async (id: string) => {
    'use server'
    await deleteRoom(id)
    revalidatePath('/manager/rooms')
    revalidatePath('/')
  }

  const updateR = async (id: string, form: FormData) => {
    'use server'
    await updateRoom(id, form)
    revalidatePath('/manager/rooms')
    revalidatePath('/')
  }

  const { roomTypes, rooms } = await getRooms()
  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="flex justify-between">
        <h1 className="text-xl pb-2">Habitaciones</h1>
        <FormRoom roomTypes={roomTypes} create={create} />
      </div>
      <RoomsGrid
        updateRoom={updateR}
        deleteRoom={deleteR}
        rooms={rooms}
        roomsTypes={roomTypes}
      />
    </div>
  )
}
