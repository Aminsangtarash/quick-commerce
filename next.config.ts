import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */  
  images: {
    remotePatterns: [new URL('https://statics.basalam.com/**')],
  },
  output: 'standalone',
  env: {
    QC_BASE_URL: "https://q-commerce-api.basalam.com"
  }
};

export default nextConfig;
