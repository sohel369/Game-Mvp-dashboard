'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Mock public wallet address - replace with your actual Base multisig address
const PUBLIC_WALLET_ADDRESS = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb';

export default function DepositPage() {
    const { address, isConnected } = useAccount();
    const [copied, setCopied] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(PUBLIC_WALLET_ADDRESS);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!mounted) {
        return null;
    }

    if (!isConnected) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="glass-card p-8 max-w-md text-center">
                    <AlertCircle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-black mb-4">Wallet Not Connected</h2>
                    <p className="text-white/60 mb-6">Please connect your wallet to deposit USDC.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8 md:mb-12"
                >
                    <h1 className="text-3xl md:text-4xl font-black mb-4 gradient-text">Deposit USDC</h1>
                    <p className="text-white/60 text-base md:text-lg">
                        Send USDC on Base chain to add funds to your internal balance
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                    {/* QR Code Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass-card p-6 md:p-8"
                    >
                        <h2 className="text-xl md:text-2xl font-black mb-6 text-center">Scan QR Code</h2>
                        <div className="bg-white p-4 rounded-2xl mx-auto w-fit">
                            <QRCodeSVG
                                value={PUBLIC_WALLET_ADDRESS}
                                size={200}
                                level="H"
                                includeMargin={true}
                                className="w-[200px] h-[200px] sm:w-[240px] sm:h-[240px]"
                            />
                        </div>
                    </motion.div>

                    {/* Address & Instructions */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="glass-card p-6 md:p-8"
                    >
                        <h2 className="text-xl md:text-2xl font-black mb-6">Deposit Address</h2>

                        <div className="mb-6">
                            <label className="text-sm text-white/60 mb-2 block">Public Wallet (Base Chain)</label>
                            <div className="flex items-center gap-2 bg-black/40 p-3 rounded-lg border border-white/10">
                                <code className="text-xs sm:text-sm flex-1 break-all text-white/90">
                                    {PUBLIC_WALLET_ADDRESS}
                                </code>
                                <button
                                    onClick={handleCopy}
                                    className="p-2 hover:bg-white/10 rounded transition"
                                >
                                    {copied ? (
                                        <CheckCircle className="w-5 h-5 text-green-400" />
                                    ) : (
                                        <Copy className="w-5 h-5 text-white/60" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4 bg-primary/10 border border-primary/20 rounded-lg p-4">
                            <h3 className="font-black text-primary text-sm sm:text-base">⚠️ Important Instructions</h3>
                            <ul className="space-y-2 text-xs sm:text-sm text-white/80">
                                <li className="flex gap-2">
                                    <span className="text-primary">•</span>
                                    <span>Send <strong>USDC only</strong> on <strong>Base chain</strong></span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-primary">•</span>
                                    <span>Minimum deposit: <strong>$10 USDC</strong></span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-primary">•</span>
                                    <span>Funds will be credited to your internal balance automatically</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-primary">•</span>
                                    <span>Allow 1-2 minutes for confirmation</span>
                                </li>
                            </ul>
                        </div>

                        <div className="mt-6 p-4 bg-white/5 rounded-lg">
                            <p className="text-xs text-white/50 text-center">
                                Your connected wallet: <br />
                                <code className="text-white/70 break-all">{address}</code>
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* How it Works */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass-card p-6 md:p-8 mt-8"
                >
                    <h2 className="text-xl md:text-2xl font-black mb-6">How It Works</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                <span className="text-2xl font-black text-primary">1</span>
                            </div>
                            <h3 className="font-bold mb-2">Send USDC</h3>
                            <p className="text-sm text-white/60">Transfer USDC on Base to the public wallet address</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                <span className="text-2xl font-black text-primary">2</span>
                            </div>
                            <h3 className="font-bold mb-2">Auto Detection</h3>
                            <p className="text-sm text-white/60">System detects your deposit via blockchain listener</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                <span className="text-2xl font-black text-primary">3</span>
                            </div>
                            <h3 className="font-bold mb-2">Balance Updated</h3>
                            <p className="text-sm text-white/60">Your internal balance is credited instantly</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
