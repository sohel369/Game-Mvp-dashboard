'use client';

import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount } from 'wagmi';
import { Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

export default function WalletConnectButton({
    customClasses
}: {
    customClasses?: string
}) {
    const { open } = useWeb3Modal();
    const { address, isConnected } = useAccount();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <button
            onClick={() => open()}
            className={cn(
                "flex items-center gap-2.5 px-3 py-3 sm:px-6 rounded-full font-black text-[11px] transition-all duration-500 border",
                mounted && isConnected
                    ? "bg-white/5 border-white/10 text-white hover:bg-white/10"
                    : "gradient-bg border-transparent text-white shadow-xl shadow-primary/20 hover:scale-105",
                customClasses
            )}
        >
            <Wallet className="w-4 h-4" />
            <span className="tracking-[0.2em] uppercase hidden sm:block">
                {mounted && isConnected
                    ? <span className="hidden sm:inline">{`${address?.slice(0, 6)}...${address?.slice(-4)}`}</span>
                    : 'Authorize'
                }
                {mounted && isConnected && (
                    <span className="sm:hidden">{`${address?.slice(0, 4)}...`}</span>
                )}
            </span>
        </button>
    );
}
