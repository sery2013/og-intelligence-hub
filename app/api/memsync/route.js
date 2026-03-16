import { NextResponse } from 'next/server'
import { getMemSyncData } from '../../../lib/opengradient-api'

export async function GET() {
  try {
    const  = await getMemSyncData()
    return NextResponse.json({ success: true, data, timestamp: Date.now() })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
