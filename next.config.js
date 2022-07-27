/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
        return {
            fallback: [
                {
                    source: '/graphql',
                    destination: process.env.NEXT_PUBLIC_ENDPOINT,
                },
            ],
        };
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    sassOptions: {
        additionalData: `@import "/styles/common.scss";`,
    },
    optimizeFonts: false
};

module.exports = nextConfig;
