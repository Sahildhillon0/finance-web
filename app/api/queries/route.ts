import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const { name, email, query } = await req.json()
    if (!name || !email || !query) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }
    const client = await clientPromise
    const db = client.db('carfinance')
    const result = await db.collection('queries').insertOne({
      name,
      email,
      query,
      createdAt: new Date()
    })
    return NextResponse.json({ message: 'Query submitted', id: result.insertedId })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to submit query' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('carfinance')
    const queries = await db.collection('queries').find({}).sort({ createdAt: -1 }).toArray()
    return NextResponse.json(queries)
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch queries' }, { status: 500 })
  }
}
