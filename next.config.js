/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },

  env: {
    
    GOOGLE_CLIENT_ID:
      "",
    GOOGLE_CLIENT_SECRET: "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",
    GOOGLE_API_KEY: "AIzaSyCJM_YcGyxmYKpe9tkfSzwL81Lr-L-ZbCw",
    NEXTAUTH_SECRET: " eeddddndnfnfnfnfnnfnffn",
    NEXTAUTH_URL: "http://localhost:3000",
    BASE_URL: "http://localhost:1215",
  },
  images: {
    domains: ["lh3.googleusercontent.com", "flowbite.com", "localhost"],
  },

  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/admin/dashboard",
        permanent: true, // Gunakan true jika ini adalah pengalihan permanen
      },
    ];
  },
};

module.exports = nextConfig;
