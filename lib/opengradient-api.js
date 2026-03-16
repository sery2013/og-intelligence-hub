const EXPLORER_BASE_URL = 'https://explorer.opengradient.ai/api'

// Получить баланс токенов кошелька
export async function getTokenBalances(address) {
  try {
    const response = await fetch(`${EXPLORER_BASE_URL}/addresses/${address}/token-balances`)
    if (!response.ok) throw new Error('Failed to fetch')
    const data = await response.json()
    return (data.items || []).map(token => ({
      name: token.token_name || 'Unknown',
      symbol: token.token_symbol || 'UNK',
      balance: parseFloat(token.value) / Math.pow(10, token.decimals || 18),
      contract: token.token_hash
    }))
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}

// Получить транзакции
export async function getTransactions(address, limit = 20) {
  try {
    const response = await fetch(`${EXPLORER_BASE_URL}/addresses/${address}/transactions?limit=${limit}`)
    if (!response.ok) throw new Error('Failed to fetch')
    const data = await response.json()
    return (data.items || []).map(tx => ({
      hash: tx.hash,
      from: tx.from_address,
      to: tx.to_address,
      value: tx.value,
      timestamp: tx.timestamp,
      status: tx.status
    }))
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}

// Данные пулов (API + фолбэк)
export async function getPoolData() {
  try {
    const response = await fetch(`${EXPLORER_BASE_URL}/pools`)
    if (response.ok) {
      const data = await response.json()
      return data.items || []
    }
  } catch (error) {
    console.log('Using fallback pool data')
  }
  
  // Фолбэк данные
  return [
    { id: 1, name: 'ETH/USDC', tvl: 12500000, apy: 24.5, risk: 'medium', volume24h: 3200000 },
    { id: 2, name: 'OPG/ETH', tvl: 4200000, apy: 42.3, risk: 'high', volume24h: 890000 },
    { id: 3, name: 'USDC/USDT', tvl: 28000000, apy: 8.2, risk: 'low', volume24h: 5100000 },
    { id: 4, name: 'WBTC/ETH', tvl: 18500000, apy: 18.7, risk: 'low', volume24h: 4200000 },
    { id: 5, name: 'OPG/USDC', tvl: 2100000, apy: 56.8, risk: 'high', volume24h: 420000 },
  ]
}

// Данные моделей (API + фолбэк)
export async function getModelData() {
  try {
    const response = await fetch('https://hub.opengradient.ai/api/models')
    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    console.log('Using fallback model data')
  }
  
  // Фолбэк данные
  return [
    { id: 1, name: 'Sentiment Analyzer v2', deployments: 12, inferences: 1847, lastActive: '2 hours ago', status: 'active' },
    { id: 2, name: 'Image Classifier Pro', deployments: 8, inferences: 3421, lastActive: '5 hours ago', status: 'active' },
    { id: 3, name: 'Trading Signal Bot', deployments: 5, inferences: 892, lastActive: '1 day ago', status: 'inactive' },
    { id: 4, name: 'NFT Valuation AI', deployments: 15, inferences: 5234, lastActive: '30 min ago', status: 'active' },
  ]
}

// История APY
export async function getAPYHistory() {
  return [
    { date: '01/01', ETH_USDC: 22.1, OPG_ETH: 38.5, USDC_USDT: 7.8 },
    { date: '01/02', ETH_USDC: 23.4, OPG_ETH: 40.2, USDC_USDT: 8.1 },
    { date: '01/03', ETH_USDC: 24.5, OPG_ETH: 42.3, USDC_USDT: 8.2 },
    { date: '01/04', ETH_USDC: 23.8, OPG_ETH: 41.1, USDC_USDT: 7.9 },
    { date: '01/05', ETH_USDC: 25.2, OPG_ETH: 44.6, USDC_USDT: 8.4 },
    { date: '01/06', ETH_USDC: 24.9, OPG_ETH: 43.8, USDC_USDT: 8.3 },
    { date: '01/07', ETH_USDC: 24.5, OPG_ETH: 42.3, USDC_USDT: 8.2 },
  ]
}
