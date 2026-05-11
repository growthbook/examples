/** @type {import('next').NextConfig} */
const nextConfig = {
  // Linked `file:` packages from the monorepo need to be compiled with the app
  // (avoids broken re-exports / stale subpath bundles for @growthbook/growthbook).
  transpilePackages: ["@growthbook/growthbook", "@growthbook/growthbook-react"],
};

export default nextConfig;
