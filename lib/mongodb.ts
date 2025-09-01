// lib/mongodb.ts
import { MongoClient } from "mongodb"

declare global {
  // eslint-disable-next-line no-var
  var __mongoClient: MongoClient | undefined
}

const URI = process.env.MONGODB_URI
if (!URI) {
  throw new Error("Missing MONGODB_URI. Add it in Project Settings.")
}

export async function getMongoClient() {
  if (!global.__mongoClient) {
    global.__mongoClient = new MongoClient(URI)
    await global.__mongoClient.connect()
  }
  return global.__mongoClient
}

export async function getDb() {
  const client = await getMongoClient()
  return client.db(process.env.MONGODB_DB || "carfinance")
}

export async function connectToDatabase() {
  const client = await getMongoClient()
  const db = client.db(process.env.MONGODB_DB || "carfinance")
  return { client, db }
}
