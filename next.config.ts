import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  env: {
    CLOUDINARY_URL: process.env.CLOUDINARY_URL,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL
  }
}

export default nextConfig
