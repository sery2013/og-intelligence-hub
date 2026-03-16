import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { baseSepolia } from 'wagmi/chains'

export const config = getDefaultConfig({
  appName: 'OG Intelligence Hub',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_ID || 'YOUR_PROJECT_ID',
  chains: [baseSepolia],
  ssr: true,
})
