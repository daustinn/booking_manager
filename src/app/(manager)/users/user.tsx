'use client'

import { OrganizationMembership, User as UserT } from '@clerk/backend'
import { useUser } from '@clerk/nextjs'
import { Chip, Switch } from '@nextui-org/react'
import React from 'react'

export default function User({
  user,
  lock,
  unlock
}: {
  user: UserT & {
    member: OrganizationMembership
  }
  lock: (id: string) => Promise<void>
  unlock: (id: string) => Promise<void>
}) {
  const displayRole = {
    'org:customer': 'Cliente',
    'org:admin': 'Administrador'
  }[user.member.role]

  const { user: aUser } = useUser()

  return (
    <div className="py-2">
      <div className="flex gap-3 items-center">
        <div className="flex flex-grow gap-3">
          <div className="w-9 aspect-square rounded-full overflow-hidden">
            <img
              src={user.imageUrl}
              alt={user.firstName ?? ''}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-semibold text-sm">{user.fullName}</p>
            <p className="text-xs text-red-400">
              {user.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </div>
        <div>
          <Chip
            variant="dot"
            size="sm"
            color={
              user.member.role === 'org:customer' ? 'secondary' : 'success'
            }
          >
            {displayRole}
          </Chip>
        </div>
        <div>
          <Switch
            isDisabled={aUser?.id == user.id}
            onValueChange={() => {
              if (user.locked) {
                unlock(user.id)
              } else {
                lock(user.id)
              }
            }}
            defaultSelected={!user.locked}
          >
            <p className="font-medium text-sm">
              {user.locked ? 'Bloqueado' : 'Activo'}
            </p>
          </Switch>
        </div>
      </div>
    </div>
  )
}
