/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/cakes',
                permanent: true,
            },
        ]
    },
};

export default nextConfig;
