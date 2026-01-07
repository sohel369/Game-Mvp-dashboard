'use client'

import { useState, useEffect } from 'react'
import { Trophy, ShoppingCart, Trash2, Plus, Minus, ArrowLeft, Wallet, AlertCircle, Loader2, Sparkles, Target } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useAccount } from 'wagmi'
import { useInternalBalance } from '@/hooks/useInternalBalance'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

interface Match {
    id: string
    homeTeam: string
    awayTeam: string
    startTime: string
}

interface Prediction {
    matchId: string
    homeScore: number
    awayScore: number
}

interface CartItem {
    id: string
    predictions: Prediction[]
    quantity: number
    price: number
}

export default function BettingPage() {
    const { address, isConnected } = useAccount()
    const { data: userData, refetch: refetchBalance } = useInternalBalance()
    const balance = userData?.balance || 0.00
    const router = useRouter()

    const { data: rounds, isLoading: isLoadingMatches } = useQuery({
        queryKey: ['matches'],
        queryFn: async () => {
            const res = await fetch('/api/matches')
            if (!res.ok) throw new Error('Failed to fetch matches')
            const data = await res.json()
            return Array.isArray(data) ? data : []
        }
    })

    const activeRound = rounds && rounds.length > 0 ? rounds[0] : null
    const matches: Match[] = activeRound?.matches || []

    const [currentPicks, setCurrentPicks] = useState<Record<string, { home: number, away: number }>>({})
    const [quantity, setQuantity] = useState(1)
    const [cart, setCart] = useState<CartItem[]>([])
    const [isSubmitting, setSubmitting] = useState(false)

    useEffect(() => {
        if (matches.length > 0) {
            setCurrentPicks(prev => {
                const next = { ...prev }
                let changed = false
                matches.forEach(m => {
                    if (!next[m.id]) {
                        next[m.id] = { home: 0, away: 0 }
                        changed = true
                    }
                })
                return changed ? next : prev
            })
        }
    }, [matches])

    const updateScore = (matchId: string, side: 'home' | 'away', value: number) => {
        const newVal = Math.max(0, Math.min(20, value))
        setCurrentPicks(prev => ({
            ...prev,
            [matchId]: { ...prev[matchId], [side]: newVal }
        }))
    }

    const addToCart = () => {
        const newItem: CartItem = {
            id: Math.random().toString(36).substr(2, 9),
            predictions: matches.map(m => ({
                matchId: m.id,
                homeScore: currentPicks[m.id]?.home || 0,
                awayScore: currentPicks[m.id]?.away || 0
            })),
            quantity,
            price: 10 * quantity
        }
        setCart([...cart, newItem])
        setQuantity(1)
    }

    const removeFromCart = (id: string) => {
        setCart(cart.filter(item => item.id !== id))
    }

    const totalCost = cart.reduce((sum, item) => sum + item.price, 0)

    const confirmBets = async () => {
        if (!address || !activeRound) return
        setSubmitting(true)

        const cartItems = cart.flatMap(item => Array(item.quantity).fill({
            roundId: activeRound.id,
            amount: 10,
            predictions: item.predictions.reduce((acc: any, p) => ({
                ...acc,
                [p.matchId]: { home: p.homeScore, away: p.awayScore }
            }), {})
        }))

        try {
            const res = await fetch('/api/bet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ walletAddress: address, cartItems })
            })
            const data = await res.json()

            if (res.ok && data.success) {
                setCart([])
                refetchBalance()
                alert('Bets placed successfully! Good luck!')
            } else {
                alert(data.error || 'Failed to place bets')
            }
        } catch (e) {
            console.error(e)
            alert('Something went wrong')
        } finally {
            setSubmitting(false)
        }
    }

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    }

    return (
        <div className="min-h-screen bg-[#050507] pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Area */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                    <div>
                        <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-primary transition-colors mb-4 group font-black text-xs uppercase tracking-[0.2em]">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Arena
                        </Link>
                        <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-2">
                            Make Your <span className="gradient-text">Masterpicks</span>
                        </h1>
                        <p className="text-white/40 font-medium tracking-wide">Enter the weekly vault by predicting exact scores for all featured matches.</p>
                    </div>

                    {isConnected && (
                        <div className="glass-morphism px-8 py-5 rounded-3xl border border-white/10 flex items-center gap-6 relative group overflow-hidden">
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="text-right relative z-10">
                                <div className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em] mb-1">Your Vault Balance</div>
                                <div className="text-3xl font-black text-white">${balance.toFixed(2)} <span className="text-sm text-primary">USDC</span></div>
                            </div>
                            <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/20 relative z-10 animate-float-slow">
                                <Sparkles className="text-primary w-6 h-6" />
                            </div>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                    {/* Matches List */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="glass-morphism p-10 rounded-[40px] border border-white/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-10 opacity-5">
                                <Trophy className="w-64 h-64 text-white" />
                            </div>

                            <div className="flex items-center justify-between mb-12 relative z-10">
                                <h2 className="text-2xl font-black flex items-center gap-3">
                                    <Target className="text-primary w-6 h-6" />
                                    {activeRound ? activeRound.name : 'Initializing Vault...'}
                                </h2>
                                <div className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
                                    6 Matches Included
                                </div>
                            </div>

                            {isLoadingMatches ? (
                                <div className="flex flex-col items-center justify-center py-20 gap-4">
                                    <Loader2 className="w-12 h-12 text-primary animate-spin" />
                                    <span className="text-white/30 font-black uppercase tracking-widest text-xs">Syncing with Blockchain...</span>
                                </div>
                            ) : matches.length === 0 ? (
                                <div className="text-center py-20 glass-morphism rounded-3xl border border-white/5">
                                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <AlertCircle className="w-10 h-10 text-white/20" />
                                    </div>
                                    <p className="text-white/40 font-black uppercase tracking-widest text-sm">No Active Match Rounds Found</p>
                                </div>
                            ) : (
                                <div className="space-y-6 relative z-10">
                                    {matches.map((match, idx) => (
                                        <motion.div
                                            key={match.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="glass-card p-4 md:p-8 rounded-3xl group hover:border-primary/30"
                                        >
                                            <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                                                <div className="flex-1 text-center md:text-right">
                                                    <div className="text-base md:text-xl font-black mb-1 group-hover:text-primary transition-colors">{match.homeTeam}</div>
                                                    <div className="text-[10px] text-white/30 font-bold uppercase tracking-widest">{formatDate(match.startTime)}</div>
                                                </div>

                                                <div className="flex items-center gap-6">
                                                    <div className="flex flex-col items-center gap-2">
                                                        <label className="text-[10px] font-black text-white/20 uppercase">Home</label>
                                                        <input
                                                            type="number"
                                                            value={currentPicks[match.id]?.home || 0}
                                                            onChange={(e) => updateScore(match.id, 'home', parseInt(e.target.value) || 0)}
                                                            className="w-16 h-16 md:w-20 md:h-20 glass-morphism border border-white/10 rounded-2xl text-center text-2xl md:text-3xl font-black focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all group-hover:bg-white/5"
                                                        />
                                                    </div>

                                                    <div className="pt-6">
                                                        <div className="text-2xl font-black text-white/10 italic">VS</div>
                                                    </div>

                                                    <div className="flex flex-col items-center gap-2">
                                                        <label className="text-[10px] font-black text-white/20 uppercase">Away</label>
                                                        <input
                                                            type="number"
                                                            value={currentPicks[match.id]?.away || 0}
                                                            onChange={(e) => updateScore(match.id, 'away', parseInt(e.target.value) || 0)}
                                                            className="w-16 h-16 md:w-20 md:h-20 glass-morphism border border-white/10 rounded-2xl text-center text-2xl md:text-3xl font-black focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all group-hover:bg-white/5"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex-1 text-center md:text-left">
                                                    <div className="text-base md:text-xl font-black mb-1 group-hover:text-primary transition-colors">{match.awayTeam}</div>
                                                    <div className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Match #{match.id.slice(0, 4)}</div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}

                            <div className="mt-14 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
                                <div className="flex items-center gap-10">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-2">Ticket Sets</span>
                                        <div className="flex items-center gap-6 glass-morphism p-2 rounded-2xl border border-white/10">
                                            <button
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                className="w-10 h-10 rounded-xl hover:bg-white/5 flex items-center justify-center transition-colors text-white/60 hover:text-white"
                                            >
                                                <Minus className="w-5 h-5" />
                                            </button>
                                            <span className="text-2xl font-black w-8 text-center">{quantity}</span>
                                            <button
                                                onClick={() => setQuantity(Math.min(1000, quantity + 1))}
                                                className="w-10 h-10 rounded-xl hover:bg-white/5 flex items-center justify-center transition-colors text-white/60 hover:text-white"
                                            >
                                                <Plus className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="h-10 w-px bg-white/5"></div>

                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-2">Unit Price</span>
                                        <div className="text-3xl font-black text-primary">$10.00 <span className="text-xs text-white/40">USDC</span></div>
                                    </div>
                                </div>

                                <button
                                    onClick={addToCart}
                                    disabled={matches.length === 0}
                                    className="gradient-bg-alt px-12 py-5 rounded-2xl font-black text-xl flex items-center gap-3 hover:shadow-[0_15px_35px_rgba(124,58,237,0.3)] transition-all duration-300 disabled:opacity-30 disabled:grayscale group"
                                >
                                    <ShoppingCart className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                    Add To Cart
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Cart Section */}
                    <div className="lg:sticky lg:top-32 space-y-8">
                        <div className="glass-morphism p-8 rounded-[40px] border border-white/10 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 gradient-bg opacity-30"></div>

                            <div className="flex items-center justify-between mb-10">
                                <h3 className="text-xl font-black flex items-center gap-3">
                                    <ShoppingCart className="text-primary w-6 h-6" />
                                    Your Cart
                                </h3>
                                {cart.length > 0 && (
                                    <span className="bg-primary text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-[0_5px_15px_rgba(139,92,246,0.3)]">
                                        {cart.length} ITEMS
                                    </span>
                                )}
                            </div>

                            <div className="space-y-4 max-h-[450px] overflow-y-auto pr-3 custom-scrollbar mb-10">
                                <AnimatePresence mode="popLayout" initial={false}>
                                    {cart.length === 0 ? (
                                        <div className="text-center py-16">
                                            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6 border border-white/5">
                                                <Target className="text-white/10 w-10 h-10" />
                                            </div>
                                            <p className="text-white/20 font-black uppercase tracking-widest text-xs">No entries drafted</p>
                                        </div>
                                    ) : (
                                        cart.map((item) => (
                                            <motion.div
                                                key={item.id}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                className="glass-card p-5 rounded-[24px] border border-white/10 relative group"
                                            >
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="absolute -top-2 -right-2 w-8 h-8 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>

                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="text-xs font-black uppercase tracking-widest text-white/50">Ticket Set × {item.quantity}</div>
                                                    <div className="text-sm font-black text-primary">${item.price.toFixed(2)}</div>
                                                </div>

                                                <div className="grid grid-cols-3 gap-2">
                                                    {item.predictions.map((p, i) => (
                                                        <div key={i} className="text-[9px] bg-white/5 rounded-lg py-2 text-center font-black text-white/40 border border-white/5 uppercase tracking-tighter">
                                                            {p.homeScore}-{p.awayScore}
                                                        </div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        ))
                                    )}
                                </AnimatePresence>
                            </div>

                            {cart.length > 0 && (
                                <div className="space-y-6 pt-8 border-t border-white/5">
                                    <div className="flex justify-between items-center">
                                        <span className="text-white/30 font-black uppercase tracking-widest text-xs">Total Commitment</span>
                                        <span className="text-4xl font-black text-white">${totalCost.toFixed(2)}</span>
                                    </div>

                                    {totalCost > balance && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex items-start gap-4 p-5 rounded-2xl bg-red-500/10 border border-red-500/20"
                                        >
                                            <AlertCircle className="text-red-500 w-6 h-6 shrink-0" />
                                            <p className="text-xs text-red-400 font-bold leading-relaxed uppercase tracking-wide">
                                                Insufficient Vault Funds. Please deposit USDC to your internal balance to confirm.
                                            </p>
                                        </motion.div>
                                    )}

                                    {!isConnected ? (
                                        <button
                                            onClick={() => open()}
                                            className="w-full py-5 rounded-2xl bg-white/5 text-white/40 font-black text-sm uppercase tracking-[0.3em] border border-white/5 hover:bg-white/10 transition-all"
                                        >
                                            Connect To Stake
                                        </button>
                                    ) : (
                                        <button
                                            onClick={confirmBets}
                                            disabled={totalCost > balance || cart.length === 0 || isSubmitting}
                                            className={cn(
                                                "w-full py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-4 transition-all duration-500 relative group overflow-hidden",
                                                totalCost <= balance && cart.length > 0
                                                    ? "gradient-bg text-white shadow-2xl shadow-primary/30 active:scale-95"
                                                    : "bg-white/5 text-white/20 cursor-not-allowed border border-white/5"
                                            )}
                                        >
                                            {isSubmitting ? (
                                                <Loader2 className="animate-spin w-6 h-6" />
                                            ) : (
                                                <>
                                                    Staking Entries <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
