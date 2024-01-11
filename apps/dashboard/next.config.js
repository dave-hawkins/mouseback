/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },

  experimental: {
    appDir: true,
  },
}

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
})

module.exports = withMDX({
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  ...nextConfig,
})
