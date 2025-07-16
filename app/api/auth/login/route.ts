import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { signToken } from "@/lib/jwt"

// In a real app, you'd store admin credentials in the database
const ADMIN_EMAIL = "admin@carfinance.com"
const ADMIN_PASSWORD_HASH = "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi" // password

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const isValidPassword = await bcrypt.compare(password, ADMIN_PASSWORD_HASH)
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const token = signToken({ userId: "1", email: ADMIN_EMAIL })

    return NextResponse.json({ token, user: { email: ADMIN_EMAIL } })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
