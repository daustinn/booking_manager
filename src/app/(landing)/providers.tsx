'use client'

import { Room } from '@/types/room'
import React from 'react'

type State = {
  state: {
    checkIn: Date | null
    checkOut: Date | null
    room: Room | null
  }
  setState: React.Dispatch<React.SetStateAction<State['state']>>
}

const context = React.createContext<State>({} as State)

export const useLanding = () => React.useContext(context)

export default function LandingProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [state, setState] = React.useState<State['state']>({
    checkIn: null,
    checkOut: null,
    room: null
  })
  return (
    <context.Provider
      value={{
        state,
        setState
      }}
    >
      {children}
    </context.Provider>
  )
}
