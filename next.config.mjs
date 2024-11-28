const nextConfig = {
  experimental: {
    middlewarePrefetch: "strict",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
    // domains: ["example.com", "res.cloudinary.com"], using remotePatterns now
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
