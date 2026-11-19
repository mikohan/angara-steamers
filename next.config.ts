import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["192.168.4.166"],
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.angarasteamers.com" }],
        destination: "https://angarasteamers.com/:path*",
        permanent: true,
      },
      // Old /service/... links (singular) -> /services/...
      { source: "/service/:path*", destination: "/services/:path*", permanent: true },
      { source: "/service", destination: "/services/upholstery", permanent: true },
      { source: "/services", destination: "/services/upholstery", permanent: true },
      // City pages outside the service area (LA County + Orange County)
      { source: "/locations/riverside", destination: "/locations", permanent: true },
      { source: "/locations/rancho-cucamonga", destination: "/locations", permanent: true },
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
