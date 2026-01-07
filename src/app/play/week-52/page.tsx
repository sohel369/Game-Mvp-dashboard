'use client'

import { useState } from 'react'
import { useCart, Pick } from '@/context/CartContext'
import { Trophy, Plus, Minus, ShoppingCart, Calendar, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

// Mock data for Week 52 matches
const MOCK_MATCHES = [
    { id: '1', homeTeam: 'Arsenal', awayTeam: 'Liverpool', startTime: 'Jan 5, 21:00 UTC' },
    { id: '2', homeTeam: 'Man City', awayTeam: 'Chelsea', startTime: 'Jan 6, 18:30 UTC' },
    { id: '3', homeTeam: 'Real Madrid', awayTeam: 'Barcelona', startTime: 'Jan 6, 23:00 UTC' },
    { id: '4', homeTeam: 'Bayern Munich', awayTeam: 'Dortmund', startTime: 'Jan 7, 19:45 UTC' },
    { id: '5', homeTeam: 'Inter Milan', awayTeam: 'Juventus', startTime: 'Jan 7, 20:45 UTC' },
    { id: '6', homeTeam: 'PSG', awayTeam: 'Marseille', startTime: 'Jan 8, 21:00 UTC' },
]

const ROUND_INFO = {
    id: 'week-52',
    name: 'Week 52',
    prizePool: 10450,
    entries: 1045,
    closingTime: '4h 12m'
}

export default function PlayWeek52() {
    const { addToCart } = useCart()
    const [quantity, setQuantity] = useState(1)
    const [predictions, setPredictions] = useState<Record<string, { home: number; away: number }>>({})

    const handleScoreChange = (matchId: string, team: 'home' | 'away', value: string) => {
        const numValue = parseInt(value) || 0
        if (numValue < 0 || numValue > 99) return

        setPredictions(prev => ({
            ...prev,
            [matchId]: {
                ...prev[matchId],
                [team]: numValue
            }
        }))
    }

    const isFormComplete = () => {
        return MOCK_MATCHES.every(match =>
            predictions[match.id]?.home !== undefined &&
            predictions[match.id]?.away !== undefined
        )
    }

    const handleAddToCart = () => {
        if (!isFormComplete()) {
            alert('Please predict scores for all 6 matches')
            return
        }

        const picks: Pick[] = MOCK_MATCHES.map(match => ({
            matchId: match.id,
            homeTeam: match.homeTeam,
            awayTeam: match.awayTeam,
            homeScore: predictions[match.id].home,
            awayScore: predictions[match.id].away
        }))

        addToCart({
            roundId: ROUND_INFO.id,
            roundName: ROUND_INFO.name,
            picks,
            quantity,
            pricePerTicket: 10
        })

        // Reset form
        setPredictions({})
        setQuantity(1)

        alert(`Added ${quantity} ticket(s) to cart!`)
    }

    return (
        <div className="min-h-screen bg-[#050507] pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 md:mb-12"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl gradient-bg flex items-center justify-center shadow-xl shadow-primary/30">
                            <Trophy className="w-6 h-6 md:w-9 md:h-9 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">Week 52</h1>
                            <p className="text-white/40 font-bold uppercase tracking-wider text-xs md:text-sm mt-1">
                                Make Your Predictions
                            </p>
                        </div>
                    </div>

                    {/* Round Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                        <div className="glass-morphism rounded-2xl p-5 md:p-6 border border-white/10">
                            <div className="text-xs text-white/40 font-bold uppercase tracking-wider mb-2">Prize Pool</div>
                            <div className="text-2xl md:text-3xl font-black gradient-text">${ROUND_INFO.prizePool.toLocaleString()}</div>
                        </div>
                        <div className="glass-morphism rounded-2xl p-5 md:p-6 border border-white/10">
                            <div className="text-xs text-white/40 font-bold uppercase tracking-wider mb-2">Total Entries</div>
                            <div className="text-2xl md:text-3xl font-black text-white">{ROUND_INFO.entries.toLocaleString()}</div>
                        </div>
                        <div className="glass-morphism rounded-2xl p-5 md:p-6 border border-white/10">
                            <div className="text-xs text-white/40 font-bold uppercase tracking-wider mb-2">Closes In</div>
                            <div className="text-2xl md:text-3xl font-black text-red-400">{ROUND_INFO.closingTime}</div>
                        </div>
                    </div>
                </motion.div>

                {/* Matches Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                    {MOCK_MATCHES.map((match, idx) => (
                        <motion.div
                            key={match.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass-card p-5 md:p-8 border border-white/10"
                        >
                            {/* Match Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
                                        <span className="text-primary font-black text-base md:text-lg">{idx + 1}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-white/40 font-bold">
                                        <Clock className="w-3 h-3 md:w-4 md:h-4" />
                                        {match.startTime}
                                    </div>
                                </div>
                            </div>

                            {/* Teams & Score Inputs */}
                            <div className="space-y-6">
                                {/* Home Team */}
                                <div className="flex items-center justify-between gap-4 md:gap-6">
                                    <div className="flex-1">
                                        <div className="text-lg md:text-xl font-black text-white">{match.homeTeam}</div>
                                        <div className="text-[10px] md:text-xs text-white/30 font-bold uppercase tracking-wider mt-1">Home</div>
                                    </div>
                                    <input
                                        type="number"
                                        min="0"
                                        max="99"
                                        value={predictions[match.id]?.home ?? ''}
                                        onChange={(e) => handleScoreChange(match.id, 'home', e.target.value)}
                                        placeholder="0"
                                        className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/5 border-2 border-white/10 text-center text-2xl md:text-3xl font-black text-white focus:border-primary focus:outline-none transition-colors"
                                    />
                                </div>

                                {/* VS Divider */}
                                <div className="flex items-center gap-4">
                                    <div className="flex-1 h-px bg-white/10" />
                                    <span className="text-xs text-primary font-black uppercase tracking-wider">VS</span>
                                    <div className="flex-1 h-px bg-white/10" />
                                </div>

                                {/* Away Team */}
                                <div className="flex items-center justify-between gap-4 md:gap-6">
                                    <div className="flex-1">
                                        <div className="text-lg md:text-xl font-black text-white">{match.awayTeam}</div>
                                        <div className="text-[10px] md:text-xs text-white/30 font-bold uppercase tracking-wider mt-1">Away</div>
                                    </div>
                                    <input
                                        type="number"
                                        min="0"
                                        max="99"
                                        value={predictions[match.id]?.away ?? ''}
                                        onChange={(e) => handleScoreChange(match.id, 'away', e.target.value)}
                                        placeholder="0"
                                        className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/5 border-2 border-white/10 text-center text-2xl md:text-3xl font-black text-white focus:border-primary focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Ticket Quantity & Add to Cart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="glass-morphism rounded-3xl p-6 md:p-8 border border-white/10 sticky bottom-8 z-10 box-shadow-up"
                >
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8">
                        {/* Quantity Selector */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-full lg:w-auto justify-center lg:justify-start">
                            <div className="text-center sm:text-left">
                                <div className="text-xs text-white/40 font-bold uppercase tracking-wider mb-2">
                                    Number of Tickets
                                </div>
                                <div className="text-sm text-white/60 font-medium">
                                    $10 per ticket
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    disabled={quantity <= 1}
                                    className={cn(
                                        "w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all",
                                        quantity <= 1
                                            ? "bg-white/5 text-white/20 cursor-not-allowed"
                                            : "bg-white/10 hover:bg-white/20 text-white hover:scale-110"
                                    )}
                                >
                                    <Minus className="w-4 h-4 md:w-5 md:h-5" />
                                </button>
                                <div className="w-20 h-14 md:w-24 md:h-16 rounded-2xl bg-white/5 border-2 border-white/10 flex items-center justify-center">
                                    <span className="text-2xl md:text-3xl font-black text-white">{quantity}</span>
                                </div>
                                <button
                                    onClick={() => setQuantity(Math.min(1000, quantity + 1))}
                                    disabled={quantity >= 1000}
                                    className={cn(
                                        "w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all",
                                        quantity >= 1000
                                            ? "bg-white/5 text-white/20 cursor-not-allowed"
                                            : "bg-white/10 hover:bg-white/20 text-white hover:scale-110"
                                    )}
                                >
                                    <Plus className="w-4 h-4 md:w-5 md:h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Total & Add to Cart */}
                        <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto">
                            <div className="text-center sm:text-right w-full sm:w-auto flex justify-between sm:block px-4 sm:px-0">
                                <div className="text-xs text-white/40 font-bold uppercase tracking-wider mb-1 sm:mb-2 text-left sm:text-right">
                                    Total Cost
                                </div>
                                <div className="text-3xl md:text-4xl font-black gradient-text">
                                    ${(quantity * 10).toFixed(2)}
                                </div>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                disabled={!isFormComplete()}
                                className={cn(
                                    "w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 rounded-2xl font-black text-lg md:text-xl flex items-center justify-center gap-3 transition-all duration-300",
                                    isFormComplete()
                                        ? "gradient-bg hover:shadow-[0_0_40px_rgba(139,92,246,0.4)] hover:scale-105"
                                        : "bg-white/5 text-white/30 cursor-not-allowed"
                                )}
                            >
                                <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Info Notice */}
                <div className="mt-8 text-center">
                    <p className="text-white/30 text-sm font-medium">
                        Complete all 6 predictions to add tickets to your cart. You can create multiple selections with different picks.
                    </p>
                </div>
            </div>
        </div>
    )
}
