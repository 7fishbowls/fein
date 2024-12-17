/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
        pathname: "**", // Allow all paths under ibb.co
      },
      {
        protocol: "https",
        hostname: "images-assets.nasa.gov",
        pathname: "**", // Allow all paths under ibb.co
      },
      {
        protocol: "https",
        hostname: "www.nasa.gov",
        pathname: "**", // Allow all paths under ibb.co
      },
    ],
  },
};

export default nextConfig;
