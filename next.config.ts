import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep metadata in the initial <head> for crawlers and all other user agents.
  htmlLimitedBots: /.*/,
};

export default nextConfig;
