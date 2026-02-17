/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Fix vendor-chunks resolution issue with @sanity/client in dev mode
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
      }
    }
    return config
  },
  // Transpile @sanity packages to avoid vendor-chunk issues
  transpilePackages: ['@sanity/client'],
}

export default nextConfig
