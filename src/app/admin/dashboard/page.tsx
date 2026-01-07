'use client'

import { Users, Trophy, DollarSign, AlertCircle } from 'lucide-react'

export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Total Users', value: '1,245', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/20' },
                    { label: 'Active Round', value: 'Week 52', icon: Trophy, color: 'text-purple-500', bg: 'bg-purple-500/20' },
                    { label: 'Total Volume', value: '$45,230', icon: DollarSign, color: 'text-green-500', bg: 'bg-green-500/20' },
                    { label: 'Pending Withdrawals', value: '3', icon: AlertCircle, color: 'text-yellow-500', bg: 'bg-yellow-500/20' },
                ].map((stat, i) => (
                    <div key={i} className="glass p-6 rounded-2xl border border-white/10">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="text-white/50 text-sm font-medium mb-1">{stat.label}</div>
                        <div className="text-3xl font-black">{stat.value}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass p-8 rounded-[32px] border border-white/10">
                    <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
                    <div className="space-y-4">
                        {[
                            { action: 'New User Registered', user: '0x74...5f0b', time: '2 mins ago' },
                            { action: 'Ticket Purchased (x5)', user: '0x8f...2a9c', time: '15 mins ago' },
                            { action: 'Withdrawal Requested', user: '0x1a...7e4f', time: '1 hour ago' },
                            { action: 'Round 51 Finalized', user: 'System', time: '5 hours ago' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                                <div>
                                    <div className="font-bold text-sm">{item.action}</div>
                                    <div className="text-xs text-white/40">{item.user}</div>
                                </div>
                                <div className="text-xs text-white/40">{item.time}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass p-8 rounded-[32px] border border-white/10">
                    <h3 className="text-xl font-bold mb-6">System Status</h3>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <span className="text-white/70">Blockchain Listener</span>
                            <span className="flex items-center gap-2 text-green-400 text-sm font-bold">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                Active
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-white/70">Prize Distribution</span>
                            <span className="flex items-center gap-2 text-green-400 text-sm font-bold">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                Ready
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-white/70">Database Connection</span>
                            <span className="flex items-center gap-2 text-green-400 text-sm font-bold">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                Connected
                            </span>
                        </div>

                        <div className="pt-6 border-t border-white/5">
                            <div className="text-sm font-bold mb-2">Wallet Balance (Hot Wallet)</div>
                            <div className="text-2xl font-mono text-primary">12,450.00 USDC</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
