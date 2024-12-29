/* eslint-disable react/react-in-jsx-scope */

import Link from 'next/link'

// import { connectToMongoDB, getCollection } from '@/config/mongodb'

export default async function Home() {
  // await connectToMongoDB()

  // const collection = getCollection('users')
  // const users = await collection.find().toArray()
  return (
    <div>
      <Link href="/dashboard">Dashboard</Link>
    </div>
  )
}
