/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb' // Adjust this value as needed
    }
  },
}

module.exports = nextConfig
