/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['images.lumacdn.com', 'images.unsplash.com'],
  },
  async rewrites() {
    return [
      {
        source: '/skill.md',
        destination: '/api/skill-md'
      }
    ];
  }
};

module.exports = nextConfig;