// lib/mongodb.ts
import { MongoClient, Db } from "mongodb";

// Declare global variable for caching MongoClient
declare global {
  // eslint-disable-next-line no-var
  var __mongoClient: MongoClient | undefined;
}

// Validate environment variables at module load time
const MONGODB_URI = process.env.MONGODB_URI ?? throwMissingEnv("MONGODB_URI");
const MONGODB_DB = process.env.MONGODB_DB ?? "carfinance";

// Helper function to throw an error for missing environment variables
function throwMissingEnv(varName: string): never {
  throw new Error(`Missing ${varName}. Please set it in your environment variables.`);
}

/**
 * Get the MongoClient instance, reusing the cached connection if available.
 * @returns {Promise<MongoClient>} The MongoClient instance
 */
export async function getMongoClient(): Promise<MongoClient> {
  if (!global.__mongoClient) {
    global.__mongoClient = new MongoClient(MONGODB_URI);
    await global.__mongoClient.connect();
  }
  return global.__mongoClient;
}

/**
 * Get the MongoDB database instance.
 * @returns {Promise<Db>} The MongoDB database instance
 */
export async function getDb(): Promise<Db> {
  const client = await getMongoClient();
  return client.db(MONGODB_DB);
}

/**
 * Connect to the database and return both the client and database instances.
 * @returns {Promise<{ client: MongoClient; db: Db }>} The MongoClient and database instances
 */
export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  const client = await getMongoClient();
  const db = client.db(MONGODB_DB);
  return { client, db };
}