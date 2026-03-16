/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ['hub.opengradient.ai', 'explorer.opengradient.ai'],
  },
}

module.exports = nextConfig
