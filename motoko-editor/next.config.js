/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  output: 'export',
  transpilePackages: [
    '@agorapp-dao/content-common',
    '@agorapp-dao/editor-common',
    '@agorapp-dao/editor-lang-motoko',
  ],
};

module.exports = nextConfig;
