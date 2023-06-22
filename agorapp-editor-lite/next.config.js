/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  compiler: {
    styledComponents: true,
  },
  output: 'standalone',
  transpilePackages: ['@agorapp/content-common', '@agorapp/content-motoko-tutorial'],
};

module.exports = nextConfig;
