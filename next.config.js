/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return {
      fallback: [
        {
          source: "/api/graphql",
          destination: process.env.NEXT_PUBLIC_ENDPOINT,
        }
      ]
    };
  },
  sassOptions: {
    additionalData: `@import "/styles/common.scss";`
 },
};

module.exports = nextConfig;
