/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Disabled to prevent duplicate ws connection. See https://reactjs.org/blog/2022/03/29/react-v18.html#new-strict-mode-behaviors

  transpilePackages: [
    'antd',
    '@ant-design/icons',
    '@ant-design/icons-svg',
    'rc-util',
    'rc-pagination',
    'rc-picker',
    'rc-tooltip',
    'rc-select',
    'rc-upload',
    'rc-dialog',
    'rc-drawer',
    'rc-dropdown',
    'rc-steps',
    'rc-tabs',
    'rc-tree',
    'rc-menu',
    'rc-collapse',
    'rc-table',
    'rc-input-number',
    'rc-motion',
    // ESM packages using import.meta
    'prettier',
    'acorn',
    'css-tree',
    '@eslint/eslintrc',
    'synckit',
    // Hot refresh utils inside antd icons dependency tree
    '@next/react-refresh-utils'
  ],

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = nextConfig;
