'use client'

import { Room, RoomType } from '@/types/room'
import {
  Button,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Switch,
  Textarea
} from '@nextui-org/react'
import React from 'react'
import { useFormStatus } from 'react-dom'
import { HiPencil, HiTrash } from 'react-icons/hi'

export default function RoomsGrid({
  rooms,
  deleteRoom,
  updateRoom,
  roomsTypes
}: {
  rooms: Room[]
  roomsTypes: RoomType[]
  deleteRoom: (id: string) => Promise<void>
  updateRoom: (id: string, form: FormData) => Promise<void>
}) {
  return (
    <div className="py-4">
      <table className="w-full">
        <thead>
          <tr className="[&>th]:font-medium text-sm  border-b [&>th]:p-2 text-left">
            <th>Descripción</th>
            <th>Tipo</th>
            <th>Precio</th>
            <th>Disponibilidad</th>
            <th>Registrado por</th>
            <th>Registrado el</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {rooms?.map((room) => (
            <RoomRow
              updateRoom={updateRoom}
              key={room._id}
              room={room}
              roomsTypes={roomsTypes}
              deleteRoom={deleteRoom}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

const RoomRow = ({
  room,
  deleteRoom,
  updateRoom,
  roomsTypes
}: {
  room: Room
  roomsTypes: RoomType[]
  deleteRoom: (id: string) => Promise<void>
  updateRoom: (id: string, form: FormData) => Promise<void>
}) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const { pending } = useFormStatus()
  return (
    <tr className="text-sm [&>td]:p-3 even:bg-stone-50">
      <td className="p-2">
        <div className="flex items-center gap-2 font-semibold">
          <div className="w-[100px] min-w-[100px] rounded-xl overflow-hidden bg-slate-100 aspect-[10/8]">
            {room.image && (
              <img
                src={room.image}
                className="w-full h-full object-cover"
                alt={room.description}
              />
            )}
          </div>
          <div>
            <p>{room.name ?? '-'}</p>
            <p className="text-xs">{room.description}</p>
          </div>
        </div>
      </td>
      <td>
        <p className="text-red-600 font-medium">
          {room.type?.name ?? 'Desconocido'}{' '}
        </p>
      </td>
      <td className="p-2">
        {room.type?.price.toLocaleString('es-PE', {
          style: 'currency',
          currency: 'PEN'
        })}
      </td>
      <td>
        <div>
          <Chip variant="dot" color={room.available ? 'success' : 'danger'}>
            {room.available ? 'Disponible' : 'No disponible'}
          </Chip>
        </div>
      </td>
      <td className="p-2">
        <p className="font-semibold">{room.clerkUser.names ?? 'Desconocido'}</p>
      </td>
      <td className="p-2">{new Date(room.createdAt).toDateString()}</td>
      <td className="p-2">
        <div className="flex items-center gap-2">
          <Button
            color="secondary"
            onPress={() => setIsOpen(true)}
            endContent={<HiPencil />}
            size="sm"
          ></Button>
          <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Actualizar habitación
                  </ModalHeader>
                  <ModalBody>
                    <form
                      action={(form) => {
                        updateRoom(room._id, form).then(() => onClose())
                      }}
                      id="form"
                      className="grid gap-4"
                    >
                      <Select
                        name="roomTypeId"
                        required
                        defaultSelectedKeys={[room.roomTypeId]}
                        placeholder="Tipo de Habitacion"
                      >
                        {roomsTypes.map((roomType) => (
                          <SelectItem
                            endContent={
                              <p className="text-xs font-medium ">
                                {roomType.price.toLocaleString('es-PE', {
                                  style: 'currency',
                                  currency: 'PEN'
                                })}
                              </p>
                            }
                            key={roomType._id}
                            value={roomType._id}
                          >
                            {roomType.name}
                          </SelectItem>
                        ))}
                      </Select>
                      <Input
                        defaultValue={room.name}
                        name="name"
                        required
                        label="Nombre corto"
                      />
                      <Textarea
                        label="Descripción"
                        name="description"
                        defaultValue={room.description}
                        required
                      />
                      <Input
                        name="image"
                        type="file"
                        label="Imagen"
                        description="Si la imagen no es seleccionada, se mantendrá la actual."
                      />
                      <Switch name="available" defaultSelected={room.available}>
                        Disponible
                      </Switch>
                    </form>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cancelar
                    </Button>
                    <Button
                      isLoading={pending}
                      form="form"
                      type="submit"
                      color="primary"
                    >
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
              if (confirm('¿Estás seguro de eliminar esta habitación?')) {
                deleteRoom(room._id)
              }
            }}
            endContent={<HiTrash />}
            size="sm"
          ></Button>
        </div>
      </td>
    </tr>
  )
}
