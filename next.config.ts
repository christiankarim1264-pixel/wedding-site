import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets phones on the home network use the dev server (open http://192.168.4.28:3000).
  // Only affects `next dev`; the live site ignores it.
  allowedDevOrigins: ["192.168.4.28"],
};

export default nextConfig;
