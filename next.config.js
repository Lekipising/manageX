const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
    formats: ["image/webp"],
  },
};

module.exports = nextConfig;
