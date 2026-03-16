import './globals.css'
import { Inter } from 'next/font/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { config } from '@/lib/wagmi-config'

const inter = Inter({ subsets: ['latin'] })
const queryClient = new QueryClient()

export const metadata = {
  title: 'OG Intelligence Hub',
  description: 'OpenGradient Ecosystem — BitQuant + Model Hub + MemSync',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} animated-gradient`}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
              <div className="bg-grid" />
              {children}
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  )
}
