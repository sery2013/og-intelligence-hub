/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  transpilePackages: ['@rainbow-me/rainbowkit', 'wagmi', 'viem'],
  images: {
    domains: ['hub.opengradient.ai', 'explorer.opengradient.ai'],
  },
}

module.exports = nextConfig
