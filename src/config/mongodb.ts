import { MongoClient, type Db, type Collection } from 'mongodb'

const url = process.env.MONGODB_URL

const client = new MongoClient(url!)

let db: Db

export function getDb(): Db {
  if (!db) {
    throw new Error(
      'La conexión a MongoDB no ha sido establecida. Asegúrate de llamar a connectToMongoDB antes de acceder a la base de datos.'
    )
  }
  return db
}

export function getCollection(collectionName: string): Collection {
  return getDb().collection(collectionName)
}

export async function connectToMongoDB() {
  await client.connect()
  db = client.db(process.env.MONGO_DATABASE)
}
