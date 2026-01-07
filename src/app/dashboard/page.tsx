'use client'

import { useState, useEffect } from 'react'
import { Trophy, Wallet, ArrowUpRight, Copy, CheckCircle, TrendingUp, History, Users, Sparkles, Loader2, ExternalLink } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js'
import { useAccount } from 'wagmi'
import { useInternalBalance } from '@/hooks/useInternalBalance'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

export default function DashboardPage() {
    const { address, isConnected } = useAccount()
    const { data: userData, refetch: refetchBalance } = useInternalBalance()
    const [copied, setCopied] = useState(false)
    const [showWithdraw, setShowWithdraw] = useState(false)
    const [withdrawAmount, setWithdrawAmount] = useState('')
    const [withdrawAddress, setWithdrawAddress] = useState('')
    const [isSubmitting, setSubmitting] = useState(false)

    const balance = userData?.balance || 0.00

    const copyReferral = () => {
        navigator.clipboard.writeText(`https://easypicks.io/?ref=${address?.slice(0, 8)}`)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleWithdraw = async () => {
        if (!withdrawAddress || !withdrawAmount) return alert('Please fill all fields')
        setSubmitting(true)
        try {
            const res = await fetch('/api/withdrawal/request', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ walletAddress: address, amount: parseFloat(withdrawAmount) })
            })
            const data = await res.json()
            if (data.success) {
                alert('Withdrawal requested successfully!')
                setShowWithdraw(false)
                setWithdrawAmount('')
                refetchBalance()
            } else {
                alert(data.error || 'Failed')
            }
        } catch (e) { alert('Error submitting request') }
        finally { setSubmitting(false) }
    }

    const chartData = {
        labels: ['Week 46', 'Week 47', 'Week 48', 'Week 49', 'Week 50', 'Week 51'],
        datasets: [{
            label: 'Score',
            data: [35, 42, 28, 45, 38, 52],
            borderColor: '#8b5cf6',
            backgroundColor: 'rgba(139, 92, 246, 0.1)',
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#8b5cf6',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 4,
        }],
    }

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: 'rgba(10, 10, 12, 0.9)',
                titleFont: { weight: 'bold' as any },
                padding: 12,
                cornerRadius: 12,
            },
        },
        scales: {
            y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, border: { display: false }, ticks: { color: 'rgba(255, 255, 255, 0.2)', font: { size: 10, weight: 'bold' as any } } },
            x: { grid: { display: false }, border: { display: false }, ticks: { color: 'rgba(255, 255, 255, 0.2)', font: { size: 10, weight: 'bold' as any } } },
        },
    }

    return (
        <div className="min-h-screen bg-[#050507] pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/20">
                                <Users className="text-primary w-6 h-6" />
                            </div>
                            <span className="text-white/30 font-black uppercase tracking-[0.3em] text-xs">Pilot Terminal</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter">Your <span className="gradient-text">Command Center</span></h1>
                    </div>

                    {!isConnected && (
                        <div className="glass-morphism p-8 rounded-3xl border border-red-500/20 text-red-400 font-bold uppercase tracking-widest text-xs">
                            Please connect your wallet to view stats
                        </div>
                    )}
                </div>

                {isConnected && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        {/* Stats Cluster */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                            <div className="glass-morphism p-8 rounded-[32px] border border-white/10 group relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <Wallet className="w-24 h-24 text-white" />
                                </div>
                                <div className="flex justify-between items-start mb-10 relative z-10">
                                    <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/20 shadow-lg shadow-primary/20">
                                        <Wallet className="text-primary w-7 h-7" />
                                    </div>
                                    <button
                                        onClick={() => setShowWithdraw(!showWithdraw)}
                                        className="text-[10px] font-black uppercase tracking-[0.2em] px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
                                    >
                                        Extract Funds
                                    </button>
                                </div>
                                <div className="text-white/30 text-xs font-black uppercase tracking-[0.2em] mb-2">Vault Balance</div>
                                <div className="text-3xl lg:text-5xl font-black text-white tracking-tighter">${balance.toFixed(2)}</div>
                            </div>

                            <div className="glass-morphism p-8 rounded-[32px] border border-white/10 group relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <Trophy className="w-24 h-24 text-white" />
                                </div>
                                <div className="flex justify-between items-start mb-10 relative z-10">
                                    <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center border border-green-500/20 shadow-lg shadow-green-500/20">
                                        <Trophy className="text-green-500 w-7 h-7" />
                                    </div>
                                </div>
                                <div className="text-white/30 text-xs font-black uppercase tracking-[0.2em] mb-2">Total Yield Won</div>
                                <div className="text-3xl lg:text-5xl font-black text-green-400 tracking-tighter">$485.00</div>
                            </div>

                            <div className="glass-morphism p-8 rounded-[32px] border border-white/10 group relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <TrendingUp className="w-24 h-24 text-white" />
                                </div>
                                <div className="flex justify-between items-start mb-10 relative z-10">
                                    <div className="w-14 h-14 rounded-2xl bg-yellow-500/20 flex items-center justify-center border border-yellow-500/20 shadow-lg shadow-yellow-500/20">
                                        <TrendingUp className="text-yellow-500 w-7 h-7" />
                                    </div>
                                </div>
                                <div className="text-white/30 text-xs font-black uppercase tracking-[0.2em] mb-2">Elite Score</div>
                                <div className="text-3xl lg:text-5xl font-black text-white tracking-tighter">1,240 <span className="text-xs text-white/30">PTS</span></div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                            <div className="lg:col-span-2 glass-morphism p-10 rounded-[40px] border border-white/10">
                                <div className="flex items-center justify-between mb-10">
                                    <h3 className="text-2xl font-black tracking-tight">Analytics <span className="text-white/20">& Performance</span></h3>
                                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                                        <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">Live Syncing</span>
                                    </div>
                                </div>
                                <div className="h-[350px] w-full">
                                    <Line data={chartData} options={chartOptions} />
                                </div>
                            </div>

                            <div className="glass-morphism p-10 rounded-[40px] border border-white/10 relative overflow-hidden">
                                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-primary/10 blur-[60px] rounded-full"></div>
                                <h3 className="text-2xl font-black mb-8">Ally <span className="text-white/20">Network</span></h3>

                                <div className="bg-white/5 p-6 rounded-3xl border border-white/5 mb-8">
                                    <div className="text-[10px] text-white/30 font-black tracking-[0.2em] uppercase mb-4">Your Transmission Link</div>
                                    <div className="flex items-center gap-3 bg-black/40 p-3 rounded-2xl border border-white/5">
                                        <code className="flex-1 text-xs font-mono text-white/80 truncate px-2">
                                            easypicks.io/?ref={address?.slice(0, 8)}
                                        </code>
                                        <button onClick={copyReferral} className="p-3 bg-primary/10 hover:bg-primary/20 rounded-xl transition-all border border-primary/20 group">
                                            {copied ? <CheckCircle className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-primary group-hover:scale-110" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="p-6 rounded-[28px] bg-white/5 border border-white/5">
                                        <div className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em] mb-2">Allies</div>
                                        <div className="text-3xl font-black">12 <span className="text-xs text-white/20">/ 40</span></div>
                                    </div>
                                    <div className="p-6 rounded-[28px] bg-white/5 border border-white/5">
                                        <div className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em] mb-2">Comms</div>
                                        <div className="text-3xl font-black text-green-400">$60.00</div>
                                    </div>
                                </div>

                                <button className="w-full mt-8 py-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-black uppercase tracking-[0.4em] transition-all">
                                    View Leaderboard
                                </button>
                            </div>
                        </div>

                        {/* Withdraw Section */}
                        <AnimatePresence>
                            {showWithdraw && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-12 overflow-hidden">
                                    <div className="glass-morphism p-10 rounded-[40px] border border-primary/30 relative shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
                                        <h3 className="text-2xl font-black mb-10 flex items-center gap-4">
                                            <ArrowUpRight className="w-7 h-7 text-primary" />
                                            Funds Extraction Terminal
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                            <div>
                                                <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-4">Payload Amount (MIN $10)</label>
                                                <input
                                                    type="number" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)}
                                                    className="w-full h-20 glass-morphism p-6 rounded-3xl border border-white/10 focus:border-primary outline-none text-2xl font-black transition-all"
                                                    placeholder="0.00"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-4">Target Base Address</label>
                                                <input
                                                    type="text" value={withdrawAddress} onChange={(e) => setWithdrawAddress(e.target.value)}
                                                    className="w-full h-20 glass-morphism p-6 rounded-3xl border border-white/10 focus:border-primary outline-none font-mono text-sm transition-all"
                                                    placeholder="0x..."
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-12 flex justify-end gap-6">
                                            <button onClick={() => setShowWithdraw(false)} className="px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-white/30 hover:text-white transition-all">Cancel</button>
                                            <button
                                                onClick={handleWithdraw} disabled={isSubmitting}
                                                className="gradient-bg-alt px-12 py-5 rounded-2xl font-black text-lg flex items-center gap-3 shadow-2xl shadow-primary/30 active:scale-95 disabled:opacity-30"
                                            >
                                                {isSubmitting ? <Loader2 className="animate-spin w-6 h-6" /> : "Authorize Transfer"}
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* History Terminal */}
                        <div className="glass-morphism p-10 rounded-[40px] border border-white/10 relative overflow-hidden">
                            <h3 className="text-2xl font-black mb-10 flex items-center gap-4">
                                <History className="w-7 h-7 text-white/20" />
                                Archival Records <span className="text-white/20">• History</span>
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-white/5 text-left">
                                            <th className="pb-6 px-4 text-xs font-black text-white/20 uppercase tracking-[0.2em]">Mission Round</th>
                                            <th className="pb-6 px-4 text-xs font-black text-white/20 uppercase tracking-[0.2em]">Timestamp</th>
                                            <th className="pb-6 px-4 text-xs font-black text-white/20 uppercase tracking-[0.2em]">Loadout</th>
                                            <th className="pb-6 px-4 text-xs font-black text-white/20 uppercase tracking-[0.2em]">Final Score</th>
                                            <th className="pb-6 px-4 text-xs font-black text-white/20 uppercase tracking-[0.2em]">Status</th>
                                            <th className="pb-6 px-4 text-xs font-black text-white/20 uppercase tracking-[0.2em]">Yield</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {[
                                            { round: 'Week 52', date: 'Dec 28, 2025', tickets: 5, score: 42, status: 'Completed', prize: 75 },
                                            { round: 'Week 51', date: 'Dec 21, 2025', tickets: 2, score: 28, status: 'Completed', prize: 0 },
                                            { round: 'Week 50', date: 'Dec 14, 2025', tickets: 10, score: 55, status: 'Completed', prize: 150 },
                                        ].map((row, i) => (
                                            <tr key={i} className="group hover:bg-white/5 transition-colors">
                                                <td className="py-8 px-4 font-black text-xl group-hover:text-primary transition-colors">{row.round}</td>
                                                <td className="py-8 px-4 text-sm font-medium text-white/30">{row.date}</td>
                                                <td className="py-8 px-4 font-black">{row.tickets} Ent.</td>
                                                <td className="py-8 px-4 font-black text-xl">{row.score} <span className="text-xs text-white/20">PTS</span></td>
                                                <td className="py-8 px-4">
                                                    <span className="px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-white/5 border border-white/10 text-white/60">
                                                        {row.status}
                                                    </span>
                                                </td>
                                                <td className="py-8 px-4 font-black text-2xl text-green-400">
                                                    {row.prize > 0 ? `$${row.prize}` : <span className="text-white/10">-</span>}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
