import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import bcrypt from "bcryptjs"
import { setAdminCookie, signAdminToken } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json().catch(() => ({}))
    if (!email || !password) {
      return NextResponse.json({ ok: false, error: "Email and password are required." }, { status: 400 })
    }

    const { db } = await connectToDatabase()
    const admin = await db
      .collection("admins")
      .findOne<{ _id: any; email: string; passwordHash?: string; password?: string }>({ email })

    if (!admin) {
      return NextResponse.json({ ok: false, error: "Invalid credentials." }, { status: 401 })
    }

    const hash = (admin as any).passwordHash || (admin as any).password // support older seed data
    const valid = hash ? await bcrypt.compare(password, hash) : false
    if (!valid) {
      return NextResponse.json({ ok: false, error: "Invalid credentials." }, { status: 401 })
    }

    const token = await signAdminToken({ adminId: String(admin._id), email })
    await setAdminCookie(token)

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "Login failed" }, { status: 500 })
  }
}
