import type { NextConfig } from "next";
import { defaultLocale } from "@core-initiative/common/config";

const nextConfig: NextConfig = {
  devIndicators: false,
  transpilePackages: ["@core-initiative/common"],
  async redirects() {
    return [{ source: "/", destination: `/${defaultLocale}`, permanent: true }];
  },
};

export default nextConfig;
