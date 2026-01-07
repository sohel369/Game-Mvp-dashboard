/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: [
        '@web3modal/wagmi',
        'wagmi',
        'viem',
        '@web3modal/common',
        '@web3modal/ui',
        '@web3modal/core',
        'lit',
        '@lit/react',
        'lit-html',
        'lit-element'
    ],
};

module.exports = nextConfig;
