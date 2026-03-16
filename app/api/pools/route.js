import { NextResponse } from 'next/server'
import { getPoolData } from '@/lib/opengradient-api'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const sortBy = searchParams.get('sortBy') || 'tvl'
    
    const pools = await getPoolData()
    const sortedPools = [...pools].sort((a, b) => {
      if (sortBy === 'tvl') return b.tvl - a.tvl
      if (sortBy === 'apy') return b.apy - a.apy
      if (sortBy === 'volume24h') return b.volume24h - a.volume24h
      return 0
    })
    
    return NextResponse.json({ success: true, data: sortedPools, timestamp: Date.now() })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
