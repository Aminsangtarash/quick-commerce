import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  env: {
    QC_BASE_URL: "https://q-commerce-api.basalam.com"
  }
};

export default nextConfig;
