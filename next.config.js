module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'https://samplified.s3.us-west-2.amazonaws.com/:path*' // Proxy to Backend
      }
    ]
  }
}
