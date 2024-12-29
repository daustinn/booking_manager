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
import { PlusIcon } from '../rooms/_grid'
import { createRoomType } from '@/app/actions'

export default function FormRoomType() {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    const data = new FormData(form)
    const name = data.get('name') as string
    const price = data.get('price') as string

    await createRoomType(name, Number(price))
  }

  return (
    <>
      <Button
        className="bg-foreground text-background"
        onPress={() => setIsOpen(true)}
        endContent={<PlusIcon />}
        size="sm"
      >
        Add New
      </Button>
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Registrar nuevo tipo de habitación
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit} id="form" className="grid gap-4">
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
