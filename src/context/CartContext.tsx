'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface Pick {
    matchId: string
    homeTeam: string
    awayTeam: string
    homeScore: number
    awayScore: number
}

export interface CartItem {
    id: string
    roundId: string
    roundName: string
    picks: Pick[] // Array of 6 match predictions
    quantity: number // Number of tickets with these exact picks
    pricePerTicket: number // Always $10
    totalPrice: number // quantity * pricePerTicket
}

interface CartContextType {
    items: CartItem[]
    addToCart: (item: Omit<CartItem, 'id' | 'totalPrice'>) => void
    removeFromCart: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
    clearCart: () => void
    getTotalCost: () => number
    getTotalTickets: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const saved = localStorage.getItem('easypicks-cart')
        if (saved) {
            try {
                setItems(JSON.parse(saved))
            } catch (e) {
                console.error('Failed to parse cart', e)
            }
        }
        setMounted(true)
    }, [])

    useEffect(() => {
        if (mounted) {
            localStorage.setItem('easypicks-cart', JSON.stringify(items))
        }
    }, [items, mounted])

    const addToCart = (item: Omit<CartItem, 'id' | 'totalPrice'>) => {
        const newItem: CartItem = {
            ...item,
            id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            totalPrice: item.quantity * item.pricePerTicket
        }
        setItems(prev => [...prev, newItem])
    }

    const removeFromCart = (id: string) => {
        setItems(prev => prev.filter(item => item.id !== id))
    }

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity < 1 || quantity > 1000) return
        setItems(prev => prev.map(item =>
            item.id === id
                ? { ...item, quantity, totalPrice: quantity * item.pricePerTicket }
                : item
        ))
    }

    const clearCart = () => {
        setItems([])
    }

    const getTotalCost = () => {
        return items.reduce((sum, item) => sum + item.totalPrice, 0)
    }

    const getTotalTickets = () => {
        return items.reduce((sum, item) => sum + item.quantity, 0)
    }

    return (
        <CartContext.Provider value={{
            items,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getTotalCost,
            getTotalTickets
        }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) throw new Error('useCart must be used within CartProvider')
    return context
}
