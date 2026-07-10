import type { NextConfig } from "next";
import path from "node:path";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    remotePatterns: [
      {
        // Cloudflare R2 public bucket URL — update hostname once the bucket is created
        protocol: "https",
        hostname: "pub-*.r2.dev",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
