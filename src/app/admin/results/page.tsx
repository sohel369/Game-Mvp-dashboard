'use client'

import { useState } from 'react'
import { Save, CheckCircle } from 'lucide-react'

export default function AdminResults() {
    const [matches] = useState([
        { id: 1, home: 'Man City', away: 'Liverpool', homeScore: '', awayScore: '' },
        { id: 2, home: 'Arsenal', away: 'Chelsea', homeScore: '', awayScore: '' },
        { id: 3, home: 'Barcelona', away: 'Real Madrid', homeScore: '', awayScore: '' },
        { id: 4, home: 'Bayern', away: 'Dortmund', homeScore: '', awayScore: '' },
        { id: 5, home: 'PSG', away: 'Marseille', homeScore: '', awayScore: '' },
        { id: 6, home: 'Inter', away: 'Juventus', homeScore: '', awayScore: '' },
    ])

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Results Entry - Round #52</h1>

            <div className="glass p-8 rounded-[32px] border border-white/10 max-w-3xl">
                <div className="space-y-6 mb-8">
                    {matches.map((match) => (
                        <div key={match.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                            <div className="flex-1 text-right font-bold text-lg">{match.home}</div>

                            <div className="flex items-center gap-4 mx-6">
                                <input
                                    type="number"
                                    className="w-16 h-16 rounded-xl bg-black/20 border border-white/10 text-center text-2xl font-bold focus:border-primary outline-none"
                                    placeholder="-"
                                />
                                <span className="text-white/20 font-bold">VS</span>
                                <input
                                    type="number"
                                    className="w-16 h-16 rounded-xl bg-black/20 border border-white/10 text-center text-2xl font-bold focus:border-primary outline-none"
                                    placeholder="-"
                                />
                            </div>

                            <div className="flex-1 text-left font-bold text-lg">{match.away}</div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-end gap-4 pt-6 border-t border-white/5">
                    <button className="px-6 py-3 rounded-xl font-bold hover:bg-white/5 transition-colors">
                        Cancel
                    </button>
                    <button className="gradient-bg px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:shadow-lg hover:shadow-primary/20 transition-all">
                        <Save className="w-5 h-5" />
                        Save & Calculate Scores
                    </button>
                </div>
            </div>
        </div>
    )
}
