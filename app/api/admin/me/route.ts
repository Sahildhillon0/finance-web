import { NextResponse } from "next/server"
import { getAdminSession } from "@/lib/auth"

export async function GET() {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ ok: false }, { status: 401 })
  return NextResponse.json({ ok: true, user: session })
}
