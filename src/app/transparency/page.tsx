'use client'

import { useState, useEffect } from 'react'
import { Search, ExternalLink, Eye, Award, ArrowUpRight, ShieldCheck, Database, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

type Tab = 'bets' | 'withdrawals'

interface Bet {
    id: string
    wallet: string
    tickets: number
    entry: number
    score: any
    prize: number
    date: string
    picks: any
}

interface Withdrawal {
    id: string
    wallet: string
    amount: number
    tx: string
    date: string
}

export default function TransparencyPage() {
    const [activeTab, setActiveTab] = useState<Tab>('bets')
    const [selectedBet, setSelectedBet] = useState<Bet | null>(null)
    const [data, setData] = useState<{ bets: any[], withdrawals: any[] }>({ bets: [], withdrawals: [] })
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch('/api/transparency')
            .then(res => res.json())
            .then(d => {
                if (d.bets) setData(d)
                setIsLoading(false)
            })
            .catch(console.error)
    }, [])

    const betsDisplay: Bet[] = data.bets.map((b: any) => ({
        id: b.id,
        wallet: b.user?.walletAddress || 'Unknown',
        tickets: Math.floor(b.amount / 10),
        entry: b.amount,
        score: b.status === 'WON' ? 'SUCCESS' : b.status,
        prize: b.payout,
        date: new Date(b.createdAt).toLocaleDateString(),
        picks: b.predictions ? JSON.parse(b.predictions) : {}
    }))

    const withdrawalsDisplay: Withdrawal[] = data.withdrawals.map((w: any) => ({
        id: w.id,
        wallet: w.user?.walletAddress || 'Unknown',
        amount: w.amount,
        tx: w.txHash || 'Pending',
        date: new Date(w.createdAt).toLocaleDateString()
    }))

    const tabs = [
        { id: 'bets' as Tab, label: 'Ledger: Bets', icon: Database, count: betsDisplay.length },
        { id: 'withdrawals' as Tab, label: 'Ledger: Payouts', icon: Zap, count: withdrawalsDisplay.length },
    ]

    return (
        <div className="min-h-screen bg-[#050507] pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hub Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/20 shadow-xl shadow-primary/20">
                                <ShieldCheck className="text-primary w-8 h-8" />
                            </div>
                            <span className="text-white/30 font-black uppercase tracking-[0.4em] text-xs">Public Audit Node</span>
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-6">Transparency <span className="gradient-text">Protocol</span></h1>
                        <p className="text-xl text-white/40 leading-relaxed font-medium">
                            Every byte of data on EasyPicks is publicly indexable. No hidden operations. No manual overrides. The protocol is the final truth.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6 min-w-[320px]">
                        <div className="glass-morphism p-6 rounded-[32px] border border-white/10">
                            <div className="text-[10px] text-white/30 font-black uppercase tracking-widest mb-1">Status</div>
                            <div className="text-xl font-black text-green-400 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                                SYNCED
                            </div>
                        </div>
                        <div className="glass-morphism p-6 rounded-[32px] border border-white/10">
                            <div className="text-[10px] text-white/30 font-black uppercase tracking-widest mb-1">Network</div>
                            <div className="text-xl font-black text-primary">BASE</div>
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex justify-center mb-12">
                    <div className="glass-morphism rounded-[32px] border border-white/10 p-2 inline-flex gap-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "flex items-center gap-4 px-6 md:px-10 py-5 rounded-[26px] font-black uppercase tracking-widest text-sm transition-all duration-300",
                                    activeTab === tab.id
                                        ? "gradient-bg text-white shadow-2xl shadow-primary/30 scale-105"
                                        : "text-white/30 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <tab.icon className="w-5 h-5" />
                                {tab.label}
                                <span className={cn(
                                    "text-[10px] font-black px-3 py-1 rounded-full",
                                    activeTab === tab.id ? "bg-white/20" : "bg-white/5"
                                )}>
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content Terminal */}
                <div className="glass-morphism rounded-[48px] border border-white/10 p-10 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-1.5 gradient-bg opacity-40"></div>

                    <AnimatePresence mode="wait">
                        {activeTab === 'bets' ? (
                            <motion.div
                                key="bets"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="overflow-x-auto"
                            >
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-white/5 text-left">
                                            <th className="pb-10 px-6 text-xs font-black text-white/20 uppercase tracking-[0.3em]">Temporal Point</th>
                                            <th className="pb-10 px-6 text-xs font-black text-white/20 uppercase tracking-[0.3em]">Auth: Wallet</th>
                                            <th className="pb-10 px-6 text-xs font-black text-white/20 uppercase tracking-[0.3em]">Loadout</th>
                                            <th className="pb-10 px-6 text-xs font-black text-white/20 uppercase tracking-[0.3em]">Status</th>
                                            <th className="pb-10 px-6 text-xs font-black text-white/20 uppercase tracking-[0.3em]">Yield</th>
                                            <th className="pb-10 px-6 text-xs font-black text-white/20 uppercase tracking-[0.3em]">Inspect</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {betsDisplay.map((bet) => (
                                            <tr key={bet.id} className="group hover:bg-white/5 transition-all">
                                                <td className="py-10 px-6 text-sm font-medium text-white/50">{bet.date}</td>
                                                <td className="py-10 px-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-lg gradient-bg opacity-20"></div>
                                                        <code className="text-sm font-mono text-primary font-bold">{bet.wallet.slice(0, 10)}...</code>
                                                    </div>
                                                </td>
                                                <td className="py-10 px-6 text-xl font-black">{bet.tickets} ENTRIES</td>
                                                <td className="py-10 px-6">
                                                    <span className={cn(
                                                        "px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest",
                                                        bet.score === 'SUCCESS' ? "bg-green-500/10 text-green-400 border border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.1)]" : "bg-white/5 text-white/30 border border-white/10"
                                                    )}>
                                                        {bet.score}
                                                    </span>
                                                </td>
                                                <td className="py-10 px-6 text-2xl font-black text-green-400">
                                                    {bet.prize > 0 ? `$${bet.prize}` : <span className="text-white/10">-</span>}
                                                </td>
                                                <td className="py-10 px-6">
                                                    <button
                                                        onClick={() => setSelectedBet(bet)}
                                                        className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-[10px] hover:text-white transition-colors group/btn"
                                                    >
                                                        <Eye className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                                                        DECODE
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="withdrawals"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="overflow-x-auto"
                            >
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-white/5 text-left">
                                            <th className="pb-10 px-6 text-xs font-black text-white/20 uppercase tracking-[0.3em]">Timestamp</th>
                                            <th className="pb-10 px-6 text-xs font-black text-white/20 uppercase tracking-[0.3em]">Target: Wallet</th>
                                            <th className="pb-10 px-6 text-xs font-black text-white/20 uppercase tracking-[0.3em]">Volume</th>
                                            <th className="pb-10 px-6 text-xs font-black text-white/20 uppercase tracking-[0.3em]">Base Transaction</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {withdrawalsDisplay.map((withdrawal) => (
                                            <tr key={withdrawal.id} className="group hover:bg-white/5 transition-all">
                                                <td className="py-12 px-6 text-sm font-medium text-white/50">{withdrawal.date}</td>
                                                <td className="py-12 px-6">
                                                    <code className="text-sm font-mono text-primary font-bold">{withdrawal.wallet.slice(0, 10)}...</code>
                                                </td>
                                                <td className="py-12 px-6 text-3xl font-black text-white">${withdrawal.amount}</td>
                                                <td className="py-12 px-6">
                                                    <a
                                                        href={`https://basescan.org/tx/${withdrawal.tx}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-4 bg-white/5 hover:bg-white/10 px-6 py-4 rounded-2xl border border-white/5 transition-all group/tx overflow-hidden max-w-[280px]"
                                                    >
                                                        <code className="flex-1 text-xs font-mono text-white/40 truncate">
                                                            {withdrawal.tx !== 'Pending' ? withdrawal.tx : 'SIGNAL PENDING...'}
                                                        </code>
                                                        <ExternalLink className="w-5 h-5 text-primary group-hover/tx:scale-110 transition-transform" />
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Premium Inspect Modal */}
            <AnimatePresence>
                {selectedBet && (
                    <div
                        className="fixed inset-0 bg-black/95 flex items-center justify-center z-[200] p-4 backdrop-blur-xl"
                        onClick={() => setSelectedBet(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 40 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 40 }}
                            onClick={(e) => e.stopPropagation()}
                            className="glass-morphism rounded-[48px] border border-white/10 p-12 max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col relative"
                        >
                            <div className="absolute top-0 left-0 w-full h-2 gradient-bg"></div>

                            <div className="flex items-center justify-between mb-12">
                                <h3 className="text-4xl font-black tracking-tighter">Payload <span className="text-white/20">Analysis</span></h3>
                                <button onClick={() => setSelectedBet(null)} className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all group">
                                    < Zap className="w-5 h-5 text-white/30 group-hover:text-white" />
                                </button>
                            </div>

                            <div className="space-y-6 mb-12">
                                <div className="flex justify-between items-center p-6 rounded-3xl bg-white/2 border border-white/5">
                                    <span className="text-white/20 font-black uppercase tracking-widest text-[10px]">Auth Context</span>
                                    <code className="text-primary font-bold text-sm">{selectedBet.wallet}</code>
                                </div>
                                <div className="flex justify-between items-center p-6 rounded-3xl bg-white/2 border border-white/5">
                                    <span className="text-white/20 font-black uppercase tracking-widest text-[10px]">Mission Result</span>
                                    <span className="font-black text-2xl text-white">{selectedBet.score}</span>
                                </div>
                                <div className="flex justify-between items-center p-6 rounded-3xl bg-white/2 border border-white/5">
                                    <span className="text-white/20 font-black uppercase tracking-widest text-[10px]">Yield Credit</span>
                                    <span className="font-black text-3xl text-green-400">${selectedBet.prize}</span>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto px-4 custom-scrollbar">
                                <h4 className="font-black text-xs text-white/30 uppercase tracking-[0.4em] mb-8">Raw Ledger Predictions</h4>
                                <div className="space-y-4">
                                    <pre className="glass-morphism p-8 rounded-3xl text-xs font-mono text-primary leading-loose border border-primary/20 bg-primary/5">
                                        {JSON.stringify(selectedBet.picks, null, 4)}
                                    </pre>
                                </div>
                            </div>

                            <button
                                onClick={() => setSelectedBet(null)}
                                className="gradient-bg w-full mt-10 py-6 rounded-3xl font-black text-xl uppercase tracking-widest shadow-2xl shadow-primary/30"
                            >
                                Close Terminal
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}
