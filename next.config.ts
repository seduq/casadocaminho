import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    prod: process.env.NODE_ENV == "production" ? "true" : undefined,
    dev: process.env.NODE_ENV == "development" ? "true" : undefined,
    test: process.env.NODE_ENV == "test" ? "true" : undefined
  }
};

export default nextConfig;
