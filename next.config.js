/** @type {import('next').NextConfig} */

const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) { // We only want to run the plugin client side
      config.plugins.push(new MonacoWebpackPlugin({
        languages: ['python', 'motoko'], // add other languages if needed
      }));
    }
    return config;
  },
  experimental: {
    appDir: true,
  },
  compiler: {
    styledComponents: true,
  },
  output: 'standalone',
}

module.exports = nextConfig
