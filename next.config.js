const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com", "random.imagecdn.app"],
    formats: ["image/webp"],
  },
};

module.exports = nextConfig;
