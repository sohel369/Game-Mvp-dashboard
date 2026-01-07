'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { X, ShoppingCart, Minus, Plus, Trash2, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function CartDrawer() {
    const [isOpen, setIsOpen] = useState(false)
    const { items, removeFromCart, updateQuantity, clearCart, getTotalCost, getTotalTickets } = useCart()

    const handleCheckout = async () => {
        // TODO: Implement checkout logic
        console.log('Checkout:', items)
        alert('Checkout functionality will be implemented with API integration')
    }

    return (
        <>
            {/* Cart Button - Fixed Position */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full gradient-bg shadow-2xl shadow-primary/40 flex items-center justify-center hover:scale-110 transition-transform duration-300 group"
            >
                <ShoppingCart className="w-7 h-7 text-white group-hover:rotate-12 transition-transform" />
                {getTotalTickets() > 0 && (
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-red-500 text-white text-xs font-black flex items-center justify-center animate-pulse">
                        {getTotalTickets()}
                    </span>
                )}
            </button>

            {/* Drawer Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
                        />

                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="fixed right-0 top-0 bottom-0 w-full sm:w-[500px] bg-[#0a0a0c] border-l border-white/10 z-[201] flex flex-col shadow-2xl"
                        >
                            {/* Header */}
                            <div className="p-6 border-b border-white/10 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center">
                                        <ShoppingCart className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-white">Your Cart</h2>
                                        <p className="text-xs text-white/40 font-bold uppercase tracking-wider">
                                            {getTotalTickets()} Ticket{getTotalTickets() !== 1 ? 's' : ''}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                                >
                                    <X className="w-5 h-5 text-white/60" />
                                </button>
                            </div>

                            {/* Cart Items */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                {items.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-center">
                                        <div className="w-24 h-24 rounded-3xl bg-white/5 flex items-center justify-center mb-6">
                                            <ShoppingCart className="w-12 h-12 text-white/20" />
                                        </div>
                                        <h3 className="text-xl font-black text-white/60 mb-2">Cart is Empty</h3>
                                        <p className="text-sm text-white/30 max-w-xs">
                                            Add your picks to get started with your betting tickets
                                        </p>
                                    </div>
                                ) : (
                                    items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="glass-morphism rounded-2xl p-5 border border-white/10 space-y-4"
                                        >
                                            {/* Item Header */}
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <h3 className="font-black text-white text-sm mb-1">{item.roundName}</h3>
                                                    <p className="text-xs text-white/40 font-bold uppercase tracking-wider">
                                                        {item.picks.length} Matches
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="w-8 h-8 rounded-lg bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4 text-red-400" />
                                                </button>
                                            </div>

                                            {/* Picks Summary */}
                                            <div className="space-y-2">
                                                {item.picks.map((pick, idx) => (
                                                    <div
                                                        key={pick.matchId}
                                                        className="flex items-center justify-between text-xs bg-white/5 rounded-lg p-2"
                                                    >
                                                        <span className="text-white/60 font-bold">
                                                            {pick.homeTeam} vs {pick.awayTeam}
                                                        </span>
                                                        <span className="text-primary font-black">
                                                            {pick.homeScore} - {pick.awayScore}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center justify-between pt-3 border-t border-white/5">
                                                <span className="text-xs text-white/40 font-bold uppercase tracking-wider">
                                                    Quantity
                                                </span>
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        disabled={item.quantity <= 1}
                                                        className={cn(
                                                            "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                                                            item.quantity <= 1
                                                                ? "bg-white/5 text-white/20 cursor-not-allowed"
                                                                : "bg-white/10 hover:bg-white/20 text-white"
                                                        )}
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </button>
                                                    <span className="text-lg font-black text-white w-12 text-center">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        disabled={item.quantity >= 1000}
                                                        className={cn(
                                                            "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                                                            item.quantity >= 1000
                                                                ? "bg-white/5 text-white/20 cursor-not-allowed"
                                                                : "bg-white/10 hover:bg-white/20 text-white"
                                                        )}
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Item Total */}
                                            <div className="flex items-center justify-between pt-3 border-t border-white/5">
                                                <span className="text-xs text-white/40 font-bold uppercase tracking-wider">
                                                    Subtotal
                                                </span>
                                                <span className="text-xl font-black text-white">
                                                    ${item.totalPrice.toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Footer */}
                            {items.length > 0 && (
                                <div className="p-6 border-t border-white/10 space-y-4 bg-[#08080a]">
                                    {/* Summary */}
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-white/40 font-bold">Total Tickets</span>
                                            <span className="text-white font-black">{getTotalTickets()}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-white/40 font-bold">Price per Ticket</span>
                                            <span className="text-white font-black">$10.00</span>
                                        </div>
                                        <div className="h-px bg-white/10 my-3" />
                                        <div className="flex items-center justify-between">
                                            <span className="text-white font-black text-lg">Total Cost</span>
                                            <span className="text-3xl font-black gradient-text">
                                                ${getTotalCost().toFixed(2)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="space-y-3">
                                        <button
                                            onClick={handleCheckout}
                                            className="w-full gradient-bg py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:shadow-[0_0_40px_rgba(139,92,246,0.4)] transition-all group"
                                        >
                                            Confirm & Place Bets
                                            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                        <button
                                            onClick={clearCart}
                                            className="w-full bg-white/5 hover:bg-white/10 py-3 rounded-xl font-bold text-sm text-white/60 transition-colors"
                                        >
                                            Clear Cart
                                        </button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
