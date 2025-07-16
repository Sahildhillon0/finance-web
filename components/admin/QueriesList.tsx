// QueriesList.tsx
'use client'
import { useEffect, useState } from 'react'

interface Query {
  _id: string
  name: string
  email: string
  query: string
  createdAt: string
}

export default function QueriesList() {
  const [queries, setQueries] = useState<Query[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/queries')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setQueries(data)
        else setError('Failed to fetch queries')
      })
      .catch(() => setError('Failed to fetch queries'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="text-center py-6">Loading queries...</div>
  if (error) return <div className="text-center text-red-600 py-6">{error}</div>
  if (!queries.length) return <div className="text-center text-muted-foreground py-6">No queries yet.</div>

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">User Queries</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Query</th>
              <th className="px-4 py-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {queries.map(q => (
              <tr key={q._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 font-medium">{q.name}</td>
                <td className="px-4 py-2 text-blue-700 underline">{q.email}</td>
                <td className="px-4 py-2 max-w-xs truncate">{q.query}</td>
                <td className="px-4 py-2 text-sm text-gray-500">{new Date(q.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
