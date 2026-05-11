import type { NextConfig } from "next";

const repoName = "my-portfolio";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },

  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`,
};

export default nextConfig;
