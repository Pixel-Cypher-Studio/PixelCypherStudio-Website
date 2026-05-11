import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.pixelcypherstudio.in",
      },
    ],
  },
};

export default nextConfig;
