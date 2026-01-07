'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data - replace with real API data
const mockBets = [
    {
        id: '1',
        wallet: '0x742d...5f0b',
        tickets: 3,
        amount: 30,
        picks: [
            { home: 'Arsenal', away: 'Liverpool', homeScore: 2, awayScore: 1 },
            { home: 'Man Utd', away: 'Chelsea', homeScore: 1, awayScore: 1 },
            { home: 'Real Madrid', away: 'Barca', homeScore: 3, awayScore: 2 },
            { home: 'Inter', away: 'Juventus', homeScore: 0, awayScore: 0 },
            { home: 'Bayern', away: 'Dortmund', homeScore: 4, awayScore: 1 },
            { home: 'PSG', away: 'Lyon', homeScore: 2, awayScore: 0 },
        ],
        finalScore: 45,
        prize: 150,
        date: '2026-01-01T10:30:00Z',
    },
    {
        id: '2',
        wallet: '0x1a2b...3c4d',
        tickets: 1,
        amount: 10,
        picks: [
            { home: 'Arsenal', away: 'Liverpool', homeScore: 1, awayScore: 2 },
            { home: 'Man Utd', away: 'Chelsea', homeScore: 2, awayScore: 2 },
            { home: 'Real Madrid', away: 'Barca', homeScore: 2, awayScore: 1 },
            { home: 'Inter', away: 'Juventus', homeScore: 1, awayScore: 0 },
            { home: 'Bayern', away: 'Dortmund', homeScore: 3, awayScore: 2 },
            { home: 'PSG', away: 'Lyon', homeScore: 1, awayScore: 1 },
        ],
        finalScore: 35,
        prize: 75,
        date: '2026-01-01T14:15:00Z',
    },
];

export default function AllBetsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedBet, setExpandedBet] = useState<string | null>(null);

    const filteredBets = mockBets.filter((bet) =>
        bet.wallet.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-black mb-4 gradient-text">All Bets</h1>
                    <p className="text-white/60 text-lg">
                        Complete transparency – every bet, every pick, every prize
                    </p>
                </motion.div>

                {/* Search & Filter */}
                <div className="glass-card p-4 mb-8 flex gap-4 items-center">
                    <div className="flex-1 flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg border border-white/10">
                        <Search className="w-5 h-5 text-white/40" />
                        <input
                            type="text"
                            placeholder="Search by wallet address..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-1 bg-transparent outline-none text-white"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition">
                        <Filter className="w-5 h-5" />
                        <span>Filter</span>
                    </button>
                </div>

                {/* Bets Table */}
                <div className="space-y-4">
                    {filteredBets.map((bet, index) => (
                        <motion.div
                            key={bet.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card overflow-hidden"
                        >
                            {/* Summary Row */}
                            <div
                                className="p-6 cursor-pointer hover:bg-white/5 transition"
                                onClick={() => setExpandedBet(expandedBet === bet.id ? null : bet.id)}
                            >
                                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                                    <div>
                                        <p className="text-xs text-white/40 mb-1">Wallet</p>
                                        <code className="text-sm font-bold">{bet.wallet}</code>
                                    </div>
                                    <div>
                                        <p className="text-xs text-white/40 mb-1">Tickets</p>
                                        <p className="text-sm font-bold">{bet.tickets}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-white/40 mb-1">Amount</p>
                                        <p className="text-sm font-bold">${bet.amount}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-white/40 mb-1">Score</p>
                                        <p className={cn(
                                            "text-sm font-bold",
                                            bet.finalScore >= 45 ? "text-green-400" : bet.finalScore >= 30 ? "text-yellow-400" : "text-white/60"
                                        )}>
                                            {bet.finalScore} pts
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-white/40 mb-1">Prize</p>
                                        <p className="text-sm font-bold text-primary">${bet.prize}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-white/40 mb-1">Date</p>
                                        <p className="text-sm font-bold">
                                            {new Date(bet.date).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Expanded Picks */}
                            {expandedBet === bet.id && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="border-t border-white/10 p-6 bg-black/20"
                                >
                                    <h3 className="font-black mb-4">Predictions</h3>
                                    <div className="grid gap-3">
                                        {bet.picks.map((pick, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                                            >
                                                <span className="text-sm font-bold">
                                                    {pick.home} vs {pick.away}
                                                </span>
                                                <span className="px-3 py-1 bg-primary/20 rounded-full text-sm font-bold">
                                                    {pick.homeScore} - {pick.awayScore}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {filteredBets.length === 0 && (
                    <div className="glass-card p-12 text-center">
                        <p className="text-white/40">No bets found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
