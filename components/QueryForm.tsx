// QueryForm.tsx
'use client'
import { useState } from 'react'

export default function QueryForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [query, setQuery] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)
    try {
      const res = await fetch('/api/queries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, query })
      })
      if (!res.ok) throw new Error('Failed to submit query')
      setSuccess(true)
      setName('')
      setEmail('')
      setQuery('')
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="flex-1 px-4 py-2 border border-white/10 rounded-lg bg-[#232f3e]/70 text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="flex-1 px-4 py-2 border border-white/10 rounded-lg bg-[#232f3e]/70 text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <textarea
        placeholder="Your Query"
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="px-4 py-2 border border-white/10 rounded-lg bg-[#232f3e]/70 text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
        required
      />
      <button
        type="submit"
        className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:from-blue-800 hover:to-blue-600 transition-all"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit Query'}
      </button>
      {success && <div className="text-green-600 text-center">Query submitted successfully!</div>}
      {error && <div className="text-red-600 text-center">{error}</div>}
    </form>
  )
}
