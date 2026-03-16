import { NextResponse } from 'next/server'
import { getAPYHistory } from '@/lib/opengradient-api'

export async function GET() {
  try {
    const history = await getAPYHistory()
    return NextResponse.json({ success: true, data: history, timestamp: Date.now() })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
