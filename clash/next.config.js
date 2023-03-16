/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Disabled to prevent duplicate ws connection. See https://reactjs.org/blog/2022/03/29/react-v18.html#new-strict-mode-behaviors
  swcMinify: true,
};

module.exports = nextConfig;
