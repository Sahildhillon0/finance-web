"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
  const r = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.error || "Sign in failed")
      r.replace("/admin")
      r.refresh()
    } catch (err: any) {
      setError(err?.message || "Sign in failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-[calc(100vh-64px)] py-16">
      {/* top heading like the screenshot */}
      <div className="mx-auto max-w-3xl text-center mb-8 px-4">
        <div className="text-sm font-medium text-blue-400 tracking-wide">
          {/* brand line */}
          Foji <span className="text-white/90">Vehicle</span> <span className="text-yellow-300">Loan</span>
        </div>
        <h1 className="mt-2 text-3xl md:text-4xl font-semibold text-white text-balance">Welcome Back</h1>
        <p className="mt-2 text-sm md:text-base text-gray-300">Sign in to your account</p>
      </div>

      {/* glass card */}
      <div className="mx-auto max-w-md rounded-2xl bg-white/[0.04] ring-1 ring-white/10 p-6 md:p-8 shadow-2xl backdrop-blur">
        <h2 className="text-lg md:text-xl font-semibold text-white">Sign In</h2>
        <p className="text-sm text-gray-300 mt-1">Enter your credentials to access your account.</p>

        <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
          <label className="flex flex-col gap-1">
            <span className="text-sm text-gray-300">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md bg-white/5 text-white px-3 py-2 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              autoComplete="username"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm text-gray-300">Password</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-md bg-white/5 text-white px-3 py-2 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </label>

          {error && (
            <div role="alert" className="text-sm text-red-400">
              {error}
            </div>
          )}

          <button
            disabled={loading}
            className="mt-2 inline-flex items-center justify-center rounded-md bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white px-4 py-2 font-medium transition"
            type="submit"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        {/* Intentionally no signup link/button as requested */}
      </div>
    </main>
  )
}
