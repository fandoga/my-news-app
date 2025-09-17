import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.nytimes.com",
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
