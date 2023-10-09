/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn1-production-images-kly.akamaized.net'
      }
    ]
  }
}

module.exports = nextConfig
