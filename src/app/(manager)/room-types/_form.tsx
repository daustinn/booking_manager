'use client'

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
import { HiPlus } from 'react-icons/hi'

export default function FormRoomType({
  create
}: {
  create: (form: FormData) => Promise<void>
}) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      <Button
        color="primary"
        onPress={() => setIsOpen(true)}
        endContent={<HiPlus />}
        size="sm"
      >
        Crear tipo de habitación
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
                    create(form).then(() => onClose())
                  }}
                  id="form"
                  className="grid gap-4"
                >
                  <Input name="name" label="Nombre" required />
                  <Input name="price" label="Precio" required type="number" />
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button form="form" type="submit" color="primary">
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
