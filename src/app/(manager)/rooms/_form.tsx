'use client'

import { RoomType } from '@/types/room'
import {
  Button,
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
import { HiPlus } from 'react-icons/hi'

export default function FormRoom({
  create,
  roomTypes
}: {
  create: (form: FormData) => Promise<void>
  roomTypes: RoomType[]
}) {
  const [isOpen, setIsOpen] = React.useState(false)
  const { pending } = useFormStatus()
  return (
    <>
      <Button
        color="primary"
        onPress={() => setIsOpen(true)}
        endContent={<HiPlus />}
        size="sm"
      >
        Registrar habitacion
      </Button>
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Registrar nueva habitación
              </ModalHeader>
              <ModalBody>
                <form
                  action={(form) => {
                    create(form).then(() => onClose())
                  }}
                  id="form"
                  className="grid gap-4"
                >
                  <Select
                    name="roomTypeId"
                    required
                    placeholder="Tipo de Habitacion"
                  >
                    {roomTypes.map((roomType) => (
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
                  <Input name="name" required label="Nombre corto" />
                  <Textarea label="Descripción" name="description" required />
                  <Input name="image" type="file" label="Imagen" required />
                  <Switch name="available" defaultSelected>
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
                  Registrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
