'use client'

import { useState } from 'react'
import { Check, X, ExternalLink } from 'lucide-react'

export default function AdminWithdrawals() {
    const [requests] = useState([
        { id: 1, user: '0x742d...5f0b', amount: 125.50, date: 'Jan 3, 2026', status: 'Pending' },
        { id: 2, user: '0x8f3e...2a9c', amount: 45.00, date: 'Jan 3, 2026', status: 'Pending' },
        { id: 3, user: '0x1a5b...7e4f', amount: 210.00, date: 'Jan 2, 2026', status: 'Approved' },
    ])

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Withdrawal Requests</h1>

            <div className="glass rounded-[32px] border border-white/10 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-white/5">
                        <tr>
                            <th className="text-left py-4 px-6 text-sm font-bold text-white/50">Request ID</th>
                            <th className="text-left py-4 px-6 text-sm font-bold text-white/50">User Wallet</th>
                            <th className="text-left py-4 px-6 text-sm font-bold text-white/50">Amount</th>
                            <th className="text-left py-4 px-6 text-sm font-bold text-white/50">Date</th>
                            <th className="text-left py-4 px-6 text-sm font-bold text-white/50">Status</th>
                            <th className="text-right py-4 px-6 text-sm font-bold text-white/50">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((req) => (
                            <tr key={req.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                <td className="py-4 px-6 font-bold">#{req.id}</td>
                                <td className="py-4 px-6">
                                    <code className="text-sm font-mono text-primary">{req.user}</code>
                                </td>
                                <td className="py-4 px-6 font-bold text-lg">${req.amount.toFixed(2)}</td>
                                <td className="py-4 px-6 text-sm text-white/70">{req.date}</td>
                                <td className="py-4 px-6">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${req.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' :
                                            req.status === 'Approved' ? 'bg-green-500/20 text-green-400' :
                                                'bg-red-500/20 text-red-400'
                                        }`}>
                                        {req.status}
                                    </span>
                                </td>
                                <td className="py-4 px-6 text-right">
                                    {req.status === 'Pending' && (
                                        <div className="flex justify-end gap-2">
                                            <button className="p-2 bg-green-500/10 hover:bg-green-500/20 rounded-lg transition-colors text-green-400" title="Approve">
                                                <Check className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors text-red-400" title="Reject">
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                    {req.status === 'Approved' && (
                                        <button className="text-xs text-primary hover:underline flex items-center gap-1 justify-end ml-auto">
                                            View TX <ExternalLink className="w-3 h-3" />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
