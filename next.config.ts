import withPWAInit from "@ducanh2912/next-pwa";
import type { NextConfig } from "next";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  workboxOptions: {
    disableDevLogs: true,
    babelPresetEnvTargets: [
      "chrome >= 100",
      "firefox >= 100",
      "safari >= 15",
      "edge >= 100",
    ],
  },
});

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: process.env.NEXT_PUBLIC_BACKEND_URL?.startsWith("https")
          ? "https"
          : "http",
        hostname: new URL(
          process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000/"
        ).hostname,
      },
    ],
  },
};

export default withPWA(nextConfig);
