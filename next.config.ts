// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",                 // ← ต้องมี * ตรงนี้
        destination: "http://localhost:3001/api/:path*",
      },
    ];
  },
};

export default nextConfig;                      // ดูข้อ 2
