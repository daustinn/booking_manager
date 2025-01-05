'use client'

import { RoomType } from '@/types/room'
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/react'
import React from 'react'
import { HiPencil, HiTrash } from 'react-icons/hi'
import { MdOutlineBedroomChild } from 'react-icons/md'
export default function RoomsTypeGrid({
  roomTypes,
  deleteRoom,
  updateRoom
}: {
  roomTypes: RoomType[]
  deleteRoom: (id: string) => Promise<void>
  updateRoom: (id: string, form: FormData) => Promise<void>
}) {
  return (
    <div className="py-4">
      <table className="w-full">
        <thead>
          <tr className="[&>th]:font-medium text-sm  border-b [&>th]:p-2 text-left">
            <th>Nombre</th>
            <th>Precio</th>
            <th>Creado por</th>
            <th>Creado el</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {roomTypes.map((roomType) => (
            <RoomTypeRow
              updateRoom={updateRoom}
              key={roomType._id}
              roomType={roomType}
              deleteRoom={deleteRoom}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

const RoomTypeRow = ({
  roomType,
  deleteRoom,
  updateRoom
}: {
  roomType: RoomType
  deleteRoom: (id: string) => Promise<void>
  updateRoom: (id: string, form: FormData) => Promise<void>
}) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <tr className="text-sm [&>td]:p-3 even:bg-stone-50">
      <td className="p-2">
        <div className="flex items-center gap-2 font-semiboldF">
          <MdOutlineBedroomChild size={25} />
          <p>{roomType.name}</p>
        </div>
      </td>
      <td className="p-2">
        {roomType.price.toLocaleString('es-PE', {
          style: 'currency',
          currency: 'PEN'
        })}
      </td>
      <td className="p-2">
        <p className="font-semibold">
          {roomType.clerkUser.names ?? 'Desconocido'}
        </p>
      </td>
      <td className="p-2">{new Date(roomType.createdAt).toDateString()}</td>
      <td className="p-2">
        <div className="flex items-center gap-2">
          <Button
            color="secondary"
            onPress={() => setIsOpen(true)}
            endContent={<HiPencil />}
            size="sm"
          >
            Editar
          </Button>
          <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Registrar nuevo tipo de habitación
                  </ModalHeader>
                  <ModalBody>
                    <form
                      action={(form) => {
                        updateRoom(roomType._id, form).then(() => onClose())
                      }}
                      id="form"
                      className="grid gap-4"
                    >
                      <Input
                        defaultValue={roomType.name}
                        name="name"
                        label="Nombre"
                        required
                      />
                      <Input
                        defaultValue={roomType.price.toString()}
                        name="price"
                        label="Precio"
                        required
                        type="number"
                      />
                    </form>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cancelar
                    </Button>
                    <Button form="form" type="submit" color="primary">
                      Actualizar
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
          <Button
            color="danger"
            onPress={() => {
              if (
                confirm('¿Estás seguro de eliminar este tipo de habitación?')
              ) {
                deleteRoom(roomType._id)
              }
            }}
            endContent={<HiTrash />}
            size="sm"
          >
            Eliminar
          </Button>
        </div>
      </td>
    </tr>
  )
}
