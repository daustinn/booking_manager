import React from 'react'
import RoomsTypeGrid from './_grid'
import FormRoomType from './_form'

export default function RoomsTypePage() {
  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="flex justify-between">
        <h1 className="text-xl pb-2">Tipos de Habitaciones</h1>
        <FormRoomType />
      </div>
      <RoomsTypeGrid />
    </div>
  )
}
