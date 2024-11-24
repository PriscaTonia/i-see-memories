const nextConfig = {
  experimental: {
    middlewarePrefetch: "strict",
  },
  images: {
    domains: ["example.com", "res.cloudinary.com"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "x-powered-by",
            value: "Next.js",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
