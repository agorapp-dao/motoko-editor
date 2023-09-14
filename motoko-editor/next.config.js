/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  output: 'standalone',
  transpilePackages: [
    '@agorapp-dao/content-common',
    '@agorapp-dao/editor-common',
    '@agorapp-dao/editor-plugin-motoko',
    '@agorapp-dao/react-common',
  ],
  env: {
    REACT_APP_GA_TRACKING_CODE: process.env.REACT_APP_GA_TRACKING_CODE,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    // Use the client static directory in the server bundle and prod mode
    // Fixes `Error occurred prerendering page "/"`
    config.output.webassemblyModuleFilename =
      isServer && !dev ? '../static/wasm/[modulehash].wasm' : 'static/wasm/[modulehash].wasm';

    // Since Webpack 5 doesn't enable WebAssembly by default, we should do it manually
    config.experiments = { ...config.experiments, asyncWebAssembly: true };

    return config;
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/course/motoko/motoko-tutorial/introduction',
        permanent: false,
      },
      {
        source: '/course/motoko-tutorial/introduction',
        destination: '/course/motoko/motoko-tutorial/introduction',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
