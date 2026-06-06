import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: ["47df8b63a584-tunnel-5zqerkas.devinapps.com"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.selamchildrenvillage.org",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "admin.kitchen251.tech",
      },
      {
        protocol: "https",
        hostname: "dashboard.kitchen251.tech",
      },
    ],
  },
};

export default nextConfig;
