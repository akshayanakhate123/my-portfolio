import type { NextConfig } from "next";

const repoName = "my-portfolio";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },

  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",

  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
