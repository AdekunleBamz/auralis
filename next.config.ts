import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  transpilePackages: ["@auralis/sdk"],
  experimental: {
    externalDir: true,
  },
};

export default nextConfig;
