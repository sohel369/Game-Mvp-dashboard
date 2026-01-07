'use client'

import { useState } from 'react'

export default function AdminPage() {
    const [withdrawalId, setWithdrawalId] = useState('')
    const [txHash, setTxHash] = useState('')
    const [matchScores, setMatchScores] = useState('')
    const [roundId, setRoundId] = useState('')

    const approveWithdrawal = async () => {
        try {
            const res = await fetch('/api/withdrawal/approve', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ withdrawalId, txHash, action: 'APPROVE' })
            })
            const data = await res.json()
            if (data.success) alert('Approved!')
            else alert(data.error)
        } catch (e) { alert('Error') }
    }

    const submitScores = async () => {
        try {
            const res = await fetch('/api/admin/results', { // Note: I used api/admin/results route previously
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ roundId, scores: JSON.parse(matchScores) })
            })
            const data = await res.json()
            if (data.success) alert('Scores Submitted & Prizes Credited!')
            else alert(data.error)
        } catch (e) { alert('Error') }
    }

    const seedDB = async () => {
        const res = await fetch('/api/seed', { method: 'POST' })
        const data = await res.json()
        alert('Seeded: ' + JSON.stringify(data))
    }

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 md:px-8 space-y-12 min-h-screen">
            <h1 className="text-3xl font-bold">Admin Console</h1>

            <div className="glass p-8 rounded-2xl border border-white/10">
                <h2 className="text-xl font-bold mb-4">Actions</h2>
                <button onClick={seedDB} className="bg-purple-600 px-6 py-3 rounded-xl text-white font-bold hover:bg-purple-500 transition-colors">Seed Database (Round 1)</button>
            </div>

            <div className="glass p-8 rounded-2xl border border-white/10">
                <h2 className="text-xl font-bold mb-4">Process Withdrawal</h2>
                <div className="space-y-4">
                    <input
                        className="w-full glass-morphism p-4 rounded-xl border border-white/10 focus:border-primary outline-none transition-all"
                        placeholder="Withdrawal ID (UUID)"
                        value={withdrawalId}
                        onChange={e => setWithdrawalId(e.target.value)}
                    />
                    <input
                        className="w-full glass-morphism p-4 rounded-xl border border-white/10 focus:border-primary outline-none transition-all"
                        placeholder="Transaction Hash (0x...)"
                        value={txHash}
                        onChange={e => setTxHash(e.target.value)}
                    />
                    <button onClick={approveWithdrawal} className="bg-green-600 px-6 py-3 rounded-xl text-white font-bold hover:bg-green-500 transition-colors w-full md:w-auto">Approve & Complete</button>
                    {/* Rejection logic can be added similarly */}
                </div>
            </div>

            <div className="glass p-8 rounded-2xl border border-white/10">
                <h2 className="text-xl font-bold mb-4">Submit Round Results</h2>
                <div className="space-y-4">
                    <input
                        className="w-full glass-morphism p-4 rounded-xl border border-white/10 focus:border-primary outline-none transition-all"
                        placeholder="Round ID (UUID)"
                        value={roundId}
                        onChange={e => setRoundId(e.target.value)}
                    />
                    <textarea
                        className="w-full glass-morphism p-4 rounded-xl border border-white/10 focus:border-primary outline-none transition-all font-mono h-32"
                        placeholder='[{"matchId": "UUID", "homeScore": 2, "awayScore": 1}]'
                        value={matchScores}
                        onChange={e => setMatchScores(e.target.value)}
                    />
                    <button onClick={submitScores} className="bg-blue-600 px-6 py-3 rounded-xl text-white font-bold hover:bg-blue-500 transition-colors w-full md:w-auto">Finalize Round & Distribute Prizes</button>
                </div>
            </div>
        </div>
    )
}
