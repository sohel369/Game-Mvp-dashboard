'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Trophy, Twitter, Github, Disc as Discord } from 'lucide-react'

export default function Footer() {
    const pathname = usePathname()
    // Explicitly check for admin route
    const isAdmin = pathname?.startsWith('/admin') ?? false

    if (isAdmin) return null

    return (
        <footer className="bg-[#0a0a0c] border-t border-white/5 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 text-center md:text-left">
                    <div className="col-span-1 md:col-span-2 flex flex-col items-center md:items-start">
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
                                <Trophy className="text-white w-5 h-5" />
                            </div>
                            <span className="text-xl font-bold gradient-text">EasyPicks</span>
                        </Link>
                        <p className="text-white/50 max-w-sm mb-6">
                            The most transparent crypto pick'em platform on Base. Predict exact scores, win big prizes, and track everything on-chain.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-white transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-white transition-colors">
                                <Discord className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-white transition-colors">
                                <Github className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Platform</h4>
                        <ul className="space-y-4">
                            <li><Link href="/betting" className="text-white/50 hover:text-white transition-colors">Play Now</Link></li>
                            <li><Link href="/transparency" className="text-white/50 hover:text-white transition-colors">Transparency Hub</Link></li>
                            <li><Link href="/dashboard" className="text-white/50 hover:text-white transition-colors">My Dashboard</Link></li>
                            <li><Link href="/referral" className="text-white/50 hover:text-white transition-colors">Referral Program</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Support</h4>
                        <ul className="space-y-4">
                            <li><Link href="/about" className="text-white/50 hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/faq" className="text-white/50 hover:text-white transition-colors">FAQ</Link></li>
                            <li><Link href="/terms" className="text-white/50 hover:text-white transition-colors">Terms of Service</Link></li>
                            <li><Link href="/privacy" className="text-white/50 hover:text-white transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/30 text-sm">
                        © 2026 EasyPicks. Built on Base.
                    </p>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-white/30 text-sm font-medium">System Operational</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
