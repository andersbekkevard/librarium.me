import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The oracle keeps the pre-modernization code in .legacy/; it is not part of the app.
  outputFileTracingExcludes: { "*": [".legacy/**"] },
};

export default nextConfig;
