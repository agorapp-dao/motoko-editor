/** @type {import('next').NextConfig} */
const nextConfig = {
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
