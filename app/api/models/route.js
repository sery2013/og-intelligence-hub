import { NextResponse } from 'next/server'
// Меняем '@/lib/...' на относительный путь:
import { getModelData } from '../../../lib/opengradient-api'

export async function GET() {
  try {
    const models = await getModelData()
    return NextResponse.json({ success: true, data: models, timestamp: Date.now() })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
