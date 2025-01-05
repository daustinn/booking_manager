import clerkClient from '@/config/clerk'
import React from 'react'
import User from './user'
import { revalidatePath } from 'next/cache'

export default async function UserPage() {
  const response = await clerkClient.users.getUserList()
  const responseOrganiztionMemberShip =
    await clerkClient.organizations.getOrganizationMembershipList({
      organizationId: 'org_2r2aH6awQYOf2tM5sQ45usn5BcM'
    })

  const lock = async (id: string) => {
    'use server'

    console.log('locking user')
    await clerkClient.users.lockUser(id)
    revalidatePath('/users')
  }

  const unlock = async (id: string) => {
    'use server'

    console.log('unlocking user')
    await clerkClient.users.unlockUser(id)
    revalidatePath('/users')
  }

  return (
    <div>
      <header className="max-w-3xl mx-auto py-4">
        <h1 className="font-semibold tracking-tight">
          Gestión de usuarios y clientes
        </h1>
      </header>
      <div className="max-w-3xl bg-white shadow-md rounded-xl p-3 w-full mx-auto">
        <div className="divide-y">
          {response.data.map((user) => (
            <User
              lock={lock}
              unlock={unlock}
              key={user.id}
              user={JSON.parse(
                JSON.stringify({
                  ...user,
                  fullName: user.fullName,
                  primaryEmailAddress: user.primaryEmailAddress,
                  member: responseOrganiztionMemberShip.data.find(
                    (m) => m.publicUserData?.userId === user.id
                  )
                })
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
