'use client'

import { NextUIProvider as NextUIProviderPrimitive } from '@nextui-org/react'

import React from 'react'

export default function NextUIProvider({
  children
}: {
  children: React.ReactNode
}) {
  return <NextUIProviderPrimitive>{children}</NextUIProviderPrimitive>
}
