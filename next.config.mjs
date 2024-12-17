/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "images-assets.nasa.gov",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "www.nasa.gov",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cdn.esahubble.org",
        pathname: "**",
      },

      {
        protocol: "https",
        hostname: "stsci-opo.org",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
