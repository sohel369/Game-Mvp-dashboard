'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data - replace with real API data
const mockPrizeCredits = [
    {
        id: '1',
        wallet: '0x742d...5f0b',
        amount: 500,
        tier: '60 points (Jackpot)',
        tickets: 1,
        date: '2026-01-01T18:00:00Z',
        vault: 'Week 52 Main Vault',
    },
    {
        id: '2',
        wallet: '0x1a2b...3c4d',
        amount: 200,
        tier: '45-59 points',
        tickets: 2,
        date: '2026-01-01T18:00:00Z',
        vault: 'Week 52 Main Vault',
    },
    {
        id: '3',
        wallet: '0x9f8e...7d6c',
        amount: 150,
        tier: '30-44 points',
        tickets: 3,
        date: '2026-01-01T18:00:00Z',
        vault: 'Week 52 Main Vault',
    },
];

export default function PrizeCreditsPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCredits = mockPrizeCredits.filter((credit) =>
        credit.wallet.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getTierColor = (tier: string) => {
        if (tier.includes('Jackpot')) return 'text-yellow-400';
        if (tier.includes('45-59')) return 'text-green-400';
        if (tier.includes('30-44')) return 'text-blue-400';
        return 'text-white/60';
    };

    return (
        <div className="min-h-screen py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Trophy className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-4xl font-black mb-4 gradient-text">Prize Credits</h1>
                    <p className="text-white/60 text-lg">
                        All prizes credited to internal balances – fully transparent
                    </p>
                </motion.div>

                {/* Search */}
                <div className="glass-card p-4 mb-8">
                    <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg border border-white/10">
                        <Search className="w-5 h-5 text-white/40" />
                        <input
                            type="text"
                            placeholder="Search by wallet address..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-1 bg-transparent outline-none text-white"
                        />
                    </div>
                </div>

                {/* Stats Summary */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="glass-card p-6"
                    >
                        <p className="text-sm text-white/40 mb-2">Total Prizes Credited</p>
                        <p className="text-3xl font-black gradient-text">
                            ${mockPrizeCredits.reduce((sum, c) => sum + c.amount, 0).toLocaleString()}
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass-card p-6"
                    >
                        <p className="text-sm text-white/40 mb-2">Total Winners</p>
                        <p className="text-3xl font-black text-white">
                            {mockPrizeCredits.length}
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="glass-card p-6"
                    >
                        <p className="text-sm text-white/40 mb-2">Winning Tickets</p>
                        <p className="text-3xl font-black text-white">
                            {mockPrizeCredits.reduce((sum, c) => sum + c.tickets, 0)}
                        </p>
                    </motion.div>
                </div>

                {/* Credits Table */}
                <div className="glass-card overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-white/5 border-b border-white/10">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-black text-white/60 uppercase tracking-wider">
                                        Wallet
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-black text-white/60 uppercase tracking-wider">
                                        Prize Amount
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-black text-white/60 uppercase tracking-wider">
                                        Tier
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-black text-white/60 uppercase tracking-wider">
                                        Tickets
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-black text-white/60 uppercase tracking-wider">
                                        Vault/Round
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-black text-white/60 uppercase tracking-wider">
                                        Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {filteredCredits.map((credit, index) => (
                                    <motion.tr
                                        key={credit.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="hover:bg-white/5 transition"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <code className="text-sm font-bold">{credit.wallet}</code>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-lg font-black text-primary">
                                                ${credit.amount.toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={cn("text-sm font-bold", getTierColor(credit.tier))}>
                                                {credit.tier}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm font-bold">{credit.tickets}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm text-white/60">{credit.vault}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm text-white/60">
                                                {new Date(credit.date).toLocaleDateString()}
                                            </span>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {filteredCredits.length === 0 && (
                    <div className="glass-card p-12 text-center mt-8">
                        <p className="text-white/40">No prize credits found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
