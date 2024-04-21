/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://www.omdbapi.com/:path*",
      },
    ];
  },
};

export default nextConfig;
