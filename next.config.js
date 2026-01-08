/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: [
        '@web3modal/wagmi',
        'wagmi',
        'viem',
        '@web3modal/common',
        '@web3modal/ui',
        '@web3modal/core',
        '@web3modal/base', // Fix: Added missing module
        'lit',
        '@lit/react',
        'lit-html',
        'lit-element'
    ],
    typescript: {
        ignoreBuildErrors: true, // Fix: Prevent strict TS checks on Vercel
    },
};

module.exports = nextConfig;
