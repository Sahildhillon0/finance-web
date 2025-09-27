import { NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"

export async function GET() {
  try {
    const uriPresent = Boolean(process.env.MONGODB_URI)
    const namePresent = Boolean(process.env.MONGODB_DB_NAME)

    if (!uriPresent || !namePresent) {
      return NextResponse.json(
        {
          ok: false,
          reason: "Missing environment variables",
          env: {
            MONGODB_URI: uriPresent ? "present" : "missing",
            MONGODB_DB_NAME: namePresent ? "present" : "missing",
          },
        },
        { status: 500 },
      )
    }

    const db = await getDb()
    // Try a ping and list collections to confirm connectivity
    const ping = await db.command({ ping: 1 }).catch(() => ({ ok: 0 }))
    const collectionsInfo = await db.listCollections().toArray()
    const collections = collectionsInfo.map((c) => c.name)

    return NextResponse.json({
      ok: true,
      dbNameUsed: db.databaseName,
      ping,
      collections,
      env: {
        MONGODB_URI: "present",
        MONGODB_DB_NAME: "present",
      },
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        ok: false,
        reason: "DB connection failed",
        error: error?.message || "unknown_error",
      },
      { status: 500 },
    )
  }
}
