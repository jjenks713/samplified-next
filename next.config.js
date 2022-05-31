module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: '/:path',
        destination: 'https://samplified.s3.us-west-2.amazonaws.com/:path*' // Proxy to Backend
      }
    ]
  }
}
