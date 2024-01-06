/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**',
            },
            // the openai image url
            {
                protocol: 'https',
                hostname: 'oaidalleapiprodscus.blob.core.windows.net',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'replicate.delivery',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: '*.replicate.delivery',
                port: '',
                pathname: '/**',
            }
        ]
    }
}

module.exports = nextConfig
