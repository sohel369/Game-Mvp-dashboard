'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { DollarSign, AlertCircle, CheckCircle, Clock, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useInternalBalance } from '@/hooks/useInternalBalance'

// Mock withdrawal history
const MOCK_WITHDRAWALS = [
    {
        id: '1',
        amount: 150.00,
        status: 'APPROVED',
        txHash: '0x1234...5678',
        date: '2026-01-03 14:30 UTC'
    },
    {
        id: '2',
        amount: 50.00,
        status: 'PENDING',
        txHash: null,
        date: '2026-01-05 10:15 UTC'
    }
]

export default function WithdrawalPage() {
    const { address, isConnected } = useAccount()
    const { data: userData } = useInternalBalance()
    const [amount, setAmount] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleWithdrawal = async (e: React.FormEvent) => {
        e.preventDefault()

        const withdrawAmount = parseFloat(amount)
        if (isNaN(withdrawAmount) || withdrawAmount < 10) {
            alert('Minimum withdrawal amount is $10')
            return
        }

        if (withdrawAmount > (userData?.balance || 0)) {
            alert('Insufficient balance')
            return
        }

        setIsSubmitting(true)

        // TODO: Implement actual withdrawal request API call
        setTimeout(() => {
            alert(`Withdrawal request for $${withdrawAmount.toFixed(2)} submitted successfully!`)
            setAmount('')
            setIsSubmitting(false)
        }, 1500)
    }

    if (!isConnected) {
        return (
            <div className="min-h-screen bg-[#050507] pt-32 pb-20 flex items-center justify-center">
                <div className="glass-morphism rounded-3xl p-12 border border-white/10 text-center max-w-md">
                    <div className="w-20 h-20 rounded-3xl bg-primary/20 flex items-center justify-center mx-auto mb-6">
                        <DollarSign className="w-10 h-10 text-primary" />
                    </div>
                    <h2 className="text-3xl font-black text-white mb-4">Connect Wallet</h2>
                    <p className="text-white/60 font-medium">
                        Please connect your wallet to access withdrawal features
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#050507] pt-32 pb-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 md:mb-12"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl gradient-bg flex items-center justify-center shadow-xl shadow-primary/30">
                            <DollarSign className="w-6 h-6 md:w-9 md:h-9 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">Withdrawals</h1>
                            <p className="text-white/40 font-bold uppercase tracking-wider text-xs md:text-sm mt-1">
                                Request Cashout from Your Balance
                            </p>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                    {/* Withdrawal Request Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="glass-morphism rounded-3xl p-6 md:p-8 border border-white/10">
                            <h2 className="text-xl md:text-2xl font-black text-white mb-6">Request Withdrawal</h2>

                            {/* Current Balance */}
                            <div className="mb-8 p-5 md:p-6 rounded-2xl bg-white/5 border border-white/10">
                                <div className="text-xs text-white/40 font-bold uppercase tracking-wider mb-2">
                                    Available Balance
                                </div>
                                <div className="text-3xl md:text-4xl font-black gradient-text">
                                    ${userData?.balance?.toFixed(2) || '0.00'}
                                </div>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleWithdrawal} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-white/60 mb-3 uppercase tracking-wider">
                                        Withdrawal Amount (USDC)
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-black text-white/40">
                                            $
                                        </span>
                                        <input
                                            type="number"
                                            step="0.01"
                                            min="10"
                                            max={userData?.balance || 0}
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            placeholder="0.00"
                                            className="w-full pl-12 pr-6 py-4 md:py-5 rounded-2xl bg-white/5 border-2 border-white/10 text-xl md:text-2xl font-black text-white placeholder:text-white/20 focus:border-primary focus:outline-none transition-colors"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Info Notice */}
                                <div className="flex items-start gap-3 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                                    <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                                    <div className="text-xs md:text-sm text-yellow-200/80 font-medium">
                                        <strong className="font-black">Minimum withdrawal: $10.00</strong>
                                        <br />
                                        Withdrawals are manually processed within 24-48 hours. You'll receive USDC to your connected wallet address.
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !amount || parseFloat(amount) < 10}
                                    className={cn(
                                        "w-full py-4 md:py-5 rounded-2xl font-black text-lg md:text-xl transition-all duration-300",
                                        isSubmitting || !amount || parseFloat(amount) < 10
                                            ? "bg-white/5 text-white/30 cursor-not-allowed"
                                            : "gradient-bg hover:shadow-[0_0_40px_rgba(139,92,246,0.4)] hover:scale-[1.02]"
                                    )}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Request Withdrawal'}
                                </button>
                            </form>
                        </div>
                    </motion.div>

                    {/* Withdrawal History */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="glass-morphism rounded-3xl p-6 md:p-8 border border-white/10">
                            <h2 className="text-xl md:text-2xl font-black text-white mb-6">Recent Withdrawals</h2>

                            <div className="space-y-4">
                                {MOCK_WITHDRAWALS.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                                            <DollarSign className="w-8 h-8 text-white/20" />
                                        </div>
                                        <p className="text-white/40 font-medium">No withdrawal history</p>
                                    </div>
                                ) : (
                                    MOCK_WITHDRAWALS.map((withdrawal) => (
                                        <div
                                            key={withdrawal.id}
                                            className="glass-card p-5 md:p-6 border border-white/10 hover:border-white/20 transition-colors"
                                        >
                                            <div className="flex items-start justify-between mb-4">
                                                <div>
                                                    <div className="text-xl md:text-2xl font-black text-white mb-1">
                                                        ${withdrawal.amount.toFixed(2)}
                                                    </div>
                                                    <div className="text-xs text-white/40 font-bold">
                                                        {withdrawal.date}
                                                    </div>
                                                </div>
                                                <div className={cn(
                                                    "px-3 py-1.5 md:px-4 md:py-2 rounded-xl font-black text-[10px] md:text-xs uppercase tracking-wider flex items-center gap-2",
                                                    withdrawal.status === 'APPROVED' && "bg-green-500/10 text-green-400 border border-green-500/20",
                                                    withdrawal.status === 'PENDING' && "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
                                                    withdrawal.status === 'REJECTED' && "bg-red-500/10 text-red-400 border border-red-500/20"
                                                )}>
                                                    {withdrawal.status === 'APPROVED' && <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />}
                                                    {withdrawal.status === 'PENDING' && <Clock className="w-3 h-3 md:w-4 md:h-4" />}
                                                    {withdrawal.status}
                                                </div>
                                            </div>

                                            {withdrawal.txHash && (
                                                <a
                                                    href={`https://basescan.org/tx/${withdrawal.txHash}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 text-xs md:text-sm text-primary hover:text-primary/80 font-bold transition-colors group"
                                                >
                                                    <span className="font-mono truncate max-w-[150px] md:max-w-none">{withdrawal.txHash}</span>
                                                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                                </a>
                                            )}

                                            {withdrawal.status === 'PENDING' && (
                                                <div className="mt-3 text-xs text-white/40 font-medium">
                                                    Your withdrawal is being processed. You'll be notified once completed.
                                                </div>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Additional Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-8 glass-morphism rounded-2xl p-6 border border-white/10"
                >
                    <h3 className="text-lg font-black text-white mb-4">Important Information</h3>
                    <ul className="space-y-2 text-sm text-white/60 font-medium">
                        <li className="flex items-start gap-3">
                            <span className="text-primary font-black">•</span>
                            <span>Minimum withdrawal amount is $10.00 USDC</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-primary font-black">•</span>
                            <span>Withdrawals are processed manually within 24-48 hours</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-primary font-black">•</span>
                            <span>USDC will be sent to your connected wallet address on Base network</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-primary font-black">•</span>
                            <span>Make sure your wallet address is correct before requesting withdrawal</span>
                        </li>
                    </ul>
                </motion.div>
            </div>
        </div>
    )
}
