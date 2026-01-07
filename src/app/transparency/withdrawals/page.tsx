'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ExternalLink } from 'lucide-react';

// Mock data - replace with real API data
const mockWithdrawals = [
    {
        id: '1',
        wallet: '0x742d...5f0b',
        amount: 250,
        txHash: '0xabcd1234567890abcdef1234567890abcdef1234567890abcdef1234567890ab',
        date: '2026-01-02T10:30:00Z',
    },
    {
        id: '2',
        wallet: '0x1a2b...3c4d',
        amount: 120,
        txHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
        date: '2026-01-02T14:15:00Z',
    },
    {
        id: '3',
        wallet: '0x9f8e...7d6c',
        amount: 500,
        txHash: '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
        date: '2026-01-03T09:45:00Z',
    },
];

export default function WithdrawalsPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredWithdrawals = mockWithdrawals.filter((w) =>
        w.wallet.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.txHash.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-black mb-4 gradient-text">Withdrawals</h1>
                    <p className="text-white/60 text-lg">
                        All withdrawals verified on-chain – complete transparency
                    </p>
                </motion.div>

                {/* Search */}
                <div className="glass-card p-4 mb-8">
                    <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg border border-white/10">
                        <Search className="w-5 h-5 text-white/40" />
                        <input
                            type="text"
                            placeholder="Search by wallet or transaction hash..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-1 bg-transparent outline-none text-white"
                        />
                    </div>
                </div>

                {/* Stats */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="glass-card p-6"
                    >
                        <p className="text-sm text-white/40 mb-2">Total Withdrawn</p>
                        <p className="text-3xl font-black gradient-text">
                            ${mockWithdrawals.reduce((sum, w) => sum + w.amount, 0).toLocaleString()}
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass-card p-6"
                    >
                        <p className="text-sm text-white/40 mb-2">Total Transactions</p>
                        <p className="text-3xl font-black text-white">
                            {mockWithdrawals.length}
                        </p>
                    </motion.div>
                </div>

                {/* Withdrawals Table */}
                <div className="glass-card overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-white/5 border-b border-white/10">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-black text-white/60 uppercase tracking-wider">
                                        Wallet
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-black text-white/60 uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-black text-white/60 uppercase tracking-wider">
                                        Transaction Hash
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-black text-white/60 uppercase tracking-wider">
                                        Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {filteredWithdrawals.map((withdrawal, index) => (
                                    <motion.tr
                                        key={withdrawal.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="hover:bg-white/5 transition"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <code className="text-sm font-bold">{withdrawal.wallet}</code>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-lg font-black text-primary">
                                                ${withdrawal.amount.toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <a
                                                href={`https://basescan.org/tx/${withdrawal.txHash}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition group"
                                            >
                                                <code className="truncate max-w-xs">
                                                    {withdrawal.txHash.slice(0, 10)}...{withdrawal.txHash.slice(-8)}
                                                </code>
                                                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </a>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm text-white/60">
                                                {new Date(withdrawal.date).toLocaleDateString()} {' '}
                                                {new Date(withdrawal.date).toLocaleTimeString()}
                                            </span>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {filteredWithdrawals.length === 0 && (
                    <div className="glass-card p-12 text-center mt-8">
                        <p className="text-white/40">No withdrawals found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
