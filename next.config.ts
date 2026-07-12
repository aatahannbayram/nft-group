import type { NextConfig } from "next";
import path from "node:path";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  experimental: {
    serverActions: {
      // Admin gallery photo uploads go through a Server Action; the 1MB
      // default is too small for camera-quality photos.
      bodySizeLimit: "10mb",
    },
  },
};

export default withNextIntl(nextConfig);
