import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["192.168.4.166"],
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.angaraprosteamers.com" }],
        destination: "https://angaraprosteamers.com/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
        pathname: "/**", // Allows all paths from this hostname
      },
      {
        protocol: "https", // Since your error shows http://cms.angaracleaning.com
        hostname: "cms.angaracleaning.com",
        port: "",
        pathname: "/uploads/**",
        // pathname: "/**"
      },
    ],
  },
};

export default nextConfig;
