/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const removeImports = require('next-remove-imports')(nextConfig)

module.exports = removeImports({experimental:{esmExternals:true}});
