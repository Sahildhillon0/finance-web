import { cookies } from "next/headers"
import { SignJWT, jwtVerify } from "jose"

const COOKIE_NAME = "admin_token"
const DAY = 24 * 60 * 60

function getSecret() {
  const secret = process.env.ADMIN_JWT_SECRET
  if (!secret) throw new Error("Missing ADMIN_JWT_SECRET")
  return new TextEncoder().encode(secret)
}

export type AdminToken = { adminId: string; email: string }

export async function signAdminToken(payload: AdminToken, maxAgeDays = 7) {
  const exp = Math.floor(Date.now() / 1000) + maxAgeDays * DAY
  return await new SignJWT({ ...payload, exp })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(exp)
    .sign(getSecret())
}

export async function verifyAdminToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecret())
    return payload as unknown as AdminToken
  } catch {
    return null
  }
}

export async function setAdminCookie(token: string) {
  const jar = await cookies()
  // 7 days
  jar.set(COOKIE_NAME, token, { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 7 * DAY })
}

export async function clearAdminCookie() {
  const jar = await cookies()
  jar.set(COOKIE_NAME, "", { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 0 })
}

export async function getAdminSession(): Promise<AdminToken | null> {
  const jar = await cookies()
  const token = jar.get(COOKIE_NAME)?.value
  if (!token) return null
  return await verifyAdminToken(token)
}
