'use client';

import Link from 'next/link';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount } from 'wagmi';
import { motion } from 'framer-motion';

export default function ConnectContent() {
    const { open } = useWeb3Modal();
    const { isConnected, address } = useAccount();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#050507] text-white">
            <motion.h1
                className="text-3xl md:text-4xl font-black mb-8 gradient-text"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                Connect Your Wallet
            </motion.h1>

            {isConnected ? (
                <p className="text-lg mb-4">Connected: {address?.slice(0, 6)}...{address?.slice(-4)}</p>
            ) : (
                <button
                    onClick={() => open()}
                    className="gradient-bg px-6 py-3 rounded-full font-black hover:shadow-lg transition"
                >
                    Connect with WalletConnect
                </button>
            )}

            <Link href="/" className="mt-6 text-white/60 hover:text-white transition">
                ← Back to Home
            </Link>
        </div>
    );
}
