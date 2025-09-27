import { MongoClient, type Db } from "mongodb"

let cachedDb: Db | null = null
let cachedClient: MongoClient | null = null

export async function getDb(): Promise<Db> {
  const uri = process.env.MONGODB_URI
  const dbName = process.env.MONGODB_DB_NAME
  if (!uri || !dbName) {
    throw new Error("Missing MONGODB_URI or MONGODB_DB_NAME environment variables")
  }

  if (cachedDb) return cachedDb

  if (!cachedClient) {
    cachedClient = new MongoClient(uri)
  }
  // Reuse connection across hot reloads / server instances
  await cachedClient.connect()
  cachedDb = cachedClient.db(dbName)
  return cachedDb
}
