'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'

export default function AdminUsers() {
    const [users] = useState([
        { id: 1, wallet: '0x742d...5f0b', balance: 125.50, referrals: 12, joined: 'Dec 15, 2025' },
        { id: 2, wallet: '0x8f3e...2a9c', balance: 45.00, referrals: 3, joined: 'Dec 18, 2025' },
        { id: 3, wallet: '0x1a5b...7e4f', balance: 210.00, referrals: 0, joined: 'Dec 20, 2025' },
        { id: 4, wallet: '0x9c7d...3b8e', balance: 10.00, referrals: 1, joined: 'Dec 22, 2025' },
    ])

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Users & Referrals</h1>
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                    <input
                        type="text"
                        placeholder="Search wallet..."
                        className="pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary outline-none w-64"
                    />
                </div>
            </div>

            <div className="glass rounded-[32px] border border-white/10 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-white/5">
                        <tr>
                            <th className="text-left py-4 px-6 text-sm font-bold text-white/50">User ID</th>
                            <th className="text-left py-4 px-6 text-sm font-bold text-white/50">Wallet Address</th>
                            <th className="text-left py-4 px-6 text-sm font-bold text-white/50">Internal Balance</th>
                            <th className="text-left py-4 px-6 text-sm font-bold text-white/50">Referrals</th>
                            <th className="text-left py-4 px-6 text-sm font-bold text-white/50">Joined Date</th>
                            <th className="text-right py-4 px-6 text-sm font-bold text-white/50">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                <td className="py-4 px-6 font-bold">#{user.id}</td>
                                <td className="py-4 px-6">
                                    <code className="text-sm font-mono text-primary">{user.wallet}</code>
                                </td>
                                <td className="py-4 px-6 font-bold">${user.balance.toFixed(2)}</td>
                                <td className="py-4 px-6">{user.referrals}</td>
                                <td className="py-4 px-6 text-sm text-white/70">{user.joined}</td>
                                <td className="py-4 px-6 text-right">
                                    <button className="text-sm text-primary hover:underline">View Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
