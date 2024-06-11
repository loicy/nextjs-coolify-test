/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**.netgen-esports.be',
          port: '',
        },
      ],
    },
  };

export default nextConfig;
