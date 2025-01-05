import React from 'react'
import RoomsTypeGrid from './_grid'
import FormRoomType from './_form'
import {
  createRoomType,
  deleteRoomType,
  getRoomsTypes,
  updateRoomType
} from '@/services/room-types'
import { revalidatePath } from 'next/cache'

export default async function RoomsTypePage() {
  const create = async (form: FormData) => {
    'use server'
    await createRoomType(form)
    revalidatePath('/manager/room-types')
  }

  const deleteRoom = async (id: string) => {
    'use server'
    await deleteRoomType(id)
    revalidatePath('/manager/room-types')
  }

  const updateRoom = async (id: string, form: FormData) => {
    'use server'
    await updateRoomType(id, form)
    revalidatePath('/manager/room-types')
  }

  const roomTypes = await getRoomsTypes()

  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="flex justify-between">
        <h1 className="text-xl pb-2">Tipos de Habitaciones</h1>
        <FormRoomType create={create} />
      </div>
      <RoomsTypeGrid
        updateRoom={updateRoom}
        deleteRoom={deleteRoom}
        roomTypes={roomTypes}
      />
    </div>
  )
}
