/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  compiler: {
    styledComponents: true,
  },
  output: 'standalone',
  transpilePackages: [
    '@agorapp/content-common',
    '@agorapp/editor-common',
    '@agorapp/editor-lang-motoko',
  ],
};

module.exports = nextConfig;
