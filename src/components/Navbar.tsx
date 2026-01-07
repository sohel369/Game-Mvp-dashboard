'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'
// Dynamic import to avoid SSR issues with Web3Modal
const WalletConnectButton = dynamic(() => import('./WalletConnectButton'), { ssr: false })
import { useAccount, useSwitchChain } from 'wagmi'
import { Trophy, LayoutDashboard, Search, Wallet, ChevronDown, Menu, X, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useInternalBalance } from '@/hooks/useInternalBalance'
import { motion, AnimatePresence } from 'framer-motion'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navbar() {
    // Web3Modal logic moved to WalletConnectButton component
    const { address, isConnected, chainId } = useAccount()
    const { switchChain } = useSwitchChain()
    const { data: userData } = useInternalBalance()
    const [mounted, setMounted] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const BASE_CHAIN_ID = 8453
    const isWrongNetwork = mounted && isConnected && chainId !== BASE_CHAIN_ID

    const pathname = usePathname()
    const isAdmin = pathname?.startsWith('/admin') ?? false

    useEffect(() => {
        setMounted(true)
        const handleScroll = () => setScrolled(window.scrollY > 10)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    if (isAdmin) return null

    const navItems = [
        { name: 'Play', href: '/betting', icon: Trophy },
        { name: 'Transparency', href: '/transparency', icon: Search },
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    ]

    return (
        <header className={cn(
            "fixed top-0 left-0 right-0 z-[999] transition-all duration-300 ease-in-out border-b glass-morphism !overflow-visible",
            scrolled || mobileMenuOpen
                ? "h-[72px] border-white/10 bg-[#050507]/90 backdrop-blur-md"
                : "h-[88px] border-white/5 bg-white/5"
        )}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex justify-between items-center flex-nowrap">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 gradient-bg rounded-xl flex items-center justify-center shadow-lg shadow-primary/30 group-hover:rotate-12 transition-transform duration-500">
                        <Trophy className="text-white w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg sm:text-2xl font-black tracking-tighter text-white uppercase leading-none whitespace-nowrap">EASY<span className="text-primary italic">P</span>ICKS</span>
                        <span className="text-[8px] sm:text-[10px] font-black text-white/30 tracking-[0.4em] uppercase hidden xs:block mt-1">
                            Elite <span className="text-primary">•</span> Base
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-10">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            prefetch={true}
                            className={cn(
                                "text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-300 flex items-center gap-2 relative group",
                                pathname === item.href ? "text-primary border-b-2 border-primary pb-1" : "text-white/40 hover:text-white"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 sm:gap-6">
                    <AnimatePresence>
                        {mounted && isConnected && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="hidden md:flex flex-col items-end"
                            >
                                <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">Available Funds</span>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-lg font-black text-white tracking-tight">${userData?.balance?.toFixed(2) ?? '0.00'}</span>
                                    <span className="text-[9px] font-black text-primary px-1.5 py-0.5 rounded-md bg-primary/10">USDC</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="h-8 w-px bg-white/5 hidden md:block"></div>

                    <div className="hidden md:block">
                        <LanguageSwitcher />
                    </div>

                    <div className="h-8 w-px bg-white/5 hidden md:block"></div>

                    {isWrongNetwork ? (
                        <button
                            onClick={() => switchChain?.({ chainId: BASE_CHAIN_ID })}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full font-black text-[10px] transition-all duration-300 bg-red-500/10 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white animate-pulse"
                        >
                            SWITCH NETWORK
                        </button>
                    ) : (
                        <WalletConnectButton />
                    )}

                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden w-11 h-11 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-white"
                    >
                        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="lg:hidden absolute top-full left-0 right-0 p-4"
                    >
                        <div className="bg-[#0c0c10] rounded-3xl p-6 border border-white/10 shadow-3xl">
                            <div className="flex flex-col gap-3">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        prefetch={true}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={cn(
                                            "flex items-center justify-between px-6 py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-xs transition-all",
                                            pathname === item.href ? "bg-primary text-white" : "bg-white/5 text-white/40"
                                        )}
                                    >
                                        <div className="flex items-center gap-4">
                                            <item.icon className="w-5 h-5" />
                                            {item.name}
                                        </div>
                                    </Link>
                                ))}

                                {/* Mobile Language Selector */}
                                <div className="mt-2 px-2">
                                    <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-2 px-4">
                                        Language
                                    </div>
                                    <LanguageSwitcher />
                                </div>

                                {mounted && isConnected && (
                                    <div className="mt-4 p-6 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mb-1">Balance</span>
                                            <span className="text-2xl font-black text-white tracking-tighter">${userData?.balance?.toFixed(2) ?? '0.00'} <span className="text-primary text-xs ml-1">USDC</span></span>
                                        </div>
                                        <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/20">
                                            <Sparkles className="text-primary w-6 h-6" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
