/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'onnetion.com',
      },
    ],
  },
};

export default nextConfig;
