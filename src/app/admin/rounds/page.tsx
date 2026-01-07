'use client'

import { useState } from 'react'
import { Plus, Edit2, Trash2, Calendar, Clock } from 'lucide-react'

export default function AdminRounds() {
    const [rounds] = useState([
        { id: 52, status: 'Active', startDate: 'Jan 5, 2026', endDate: 'Jan 7, 2026', matches: 6, entries: 245 },
        { id: 53, status: 'Upcoming', startDate: 'Jan 12, 2026', endDate: 'Jan 14, 2026', matches: 6, entries: 0 },
        { id: 51, status: 'Completed', startDate: 'Dec 28, 2025', endDate: 'Dec 30, 2025', matches: 6, entries: 312 },
    ])

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Rounds & Matches</h1>
                <button className="gradient-bg px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:shadow-lg hover:shadow-primary/20 transition-all">
                    <Plus className="w-5 h-5" />
                    Create New Round
                </button>
            </div>

            <div className="glass rounded-[32px] border border-white/10 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-white/5">
                        <tr>
                            <th className="text-left py-4 px-6 text-sm font-bold text-white/50">Round ID</th>
                            <th className="text-left py-4 px-6 text-sm font-bold text-white/50">Status</th>
                            <th className="text-left py-4 px-6 text-sm font-bold text-white/50">Dates</th>
                            <th className="text-left py-4 px-6 text-sm font-bold text-white/50">Matches</th>
                            <th className="text-left py-4 px-6 text-sm font-bold text-white/50">Entries</th>
                            <th className="text-right py-4 px-6 text-sm font-bold text-white/50">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rounds.map((round) => (
                            <tr key={round.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                <td className="py-4 px-6 font-bold">#{round.id}</td>
                                <td className="py-4 px-6">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${round.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                                            round.status === 'Upcoming' ? 'bg-blue-500/20 text-blue-400' :
                                                'bg-white/10 text-white/50'
                                        }`}>
                                        {round.status}
                                    </span>
                                </td>
                                <td className="py-4 px-6 text-sm text-white/70">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        {round.startDate} - {round.endDate}
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-sm">{round.matches} Matches</td>
                                <td className="py-4 px-6 text-sm font-bold">{round.entries}</td>
                                <td className="py-4 px-6 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-blue-400">
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-red-400">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
