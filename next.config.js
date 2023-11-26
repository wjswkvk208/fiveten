/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["xn--bb0b8xg9cqz5d.com", "img.xn--bb0b8xg9cqz5d.com"],
  },
};

module.exports = nextConfig;
