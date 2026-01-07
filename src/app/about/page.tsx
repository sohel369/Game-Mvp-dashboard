'use client'

import { motion } from 'framer-motion'
import { Shield, Eye, Zap, Users, Globe, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function AboutPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            {/* Hero Section */}
            <div className="text-center mb-12 md:mb-20">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-5xl lg:text-7xl font-extrabold mb-6 md:mb-8 tracking-tight"
                >
                    About <span className="gradient-text">EasyPicks</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-base md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed px-4"
                >
                    We are building the future of sports prediction. A platform where transparency isn't just a promise—it's built into the code.
                </motion.p>
            </div>

            {/* Mission Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-20 md:mb-32">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="glass p-6 md:p-10 rounded-[32px] md:rounded-[40px] border border-white/10 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[80px] rounded-full -z-10"></div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Mission</h2>
                    <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6">
                        Traditional sports betting is opaque. You never really know the true odds, the total pool, or if the winners are real.
                    </p>
                    <p className="text-white/70 text-base md:text-lg leading-relaxed">
                        EasyPicks changes that. By building on the Base blockchain, we ensure that every ticket purchased, every score recorded, and every prize distributed is publicly verifiable. We believe in a fair game for everyone.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 gap-4 md:gap-6">
                    {[
                        { icon: Eye, title: "Radical Transparency", desc: "View every single bet and transaction on our Transparency Hub." },
                        { icon: Shield, title: "Community Security", desc: "Funds are held in a public multisig wallet, verifiable by anyone." },
                        { icon: Zap, title: "Instant Trust", desc: "No black boxes. The rules are clear, and the execution is visible." }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-4 p-5 md:p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                        >
                            <div className="p-3 rounded-xl bg-primary/20 text-primary shrink-0">
                                <item.icon className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <div>
                                <h3 className="text-base md:text-lg font-bold mb-2">{item.title}</h3>
                                <p className="text-sm md:text-base text-white/50">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Roadmap Section */}
            <div className="mb-20 md:mb-32">
                <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center">Roadmap</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {[
                        {
                            quarter: "Q1 2026",
                            title: "MVP Launch",
                            items: ["Weekly Football Vault", "Base Chain Integration", "USDC Support", "Transparency Hub"],
                            status: "current"
                        },
                        {
                            quarter: "Q2 2026",
                            title: "Expansion",
                            items: ["Multi-Sport Vaults (NBA, NFL)", "Mobile App Beta", "Automated Smart Contracts", "Enhanced Analytics"],
                            status: "upcoming"
                        },
                        {
                            quarter: "Q3 2026",
                            title: "DAO Governance",
                            items: ["Community Voting", "Protocol Token", "Decentralized Oracle Integration", "Global Partnerships"],
                            status: "future"
                        }
                    ].map((phase, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={cn(
                                "p-6 md:p-8 rounded-[32px] border relative overflow-hidden",
                                phase.status === 'current'
                                    ? "glass border-primary/50"
                                    : "bg-white/5 border-white/5"
                            )}
                        >
                            {phase.status === 'current' && (
                                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary text-white text-xs font-bold">
                                    Current Phase
                                </div>
                            )}
                            <div className="text-sm font-bold text-white/40 mb-2">{phase.quarter}</div>
                            <h3 className="text-xl md:text-2xl font-bold mb-6">{phase.title}</h3>
                            <ul className="space-y-3">
                                {phase.items.map((item, j) => (
                                    <li key={j} className="flex items-center gap-3 text-white/70 text-sm md:text-base">
                                        <div className={cn(
                                            "w-1.5 h-1.5 rounded-full shrink-0",
                                            phase.status === 'current' ? "bg-primary" : "bg-white/20"
                                        )}></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Team/DAO Section */}
            <div className="glass rounded-[32px] md:rounded-[40px] border border-white/10 p-8 md:p-12 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-50"></div>
                <div className="relative z-10">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6">Join the DAO</h2>
                    <p className="text-base md:text-xl text-white/60 max-w-2xl mx-auto mb-8">
                        EasyPicks is built by a distributed team of crypto natives and sports fans. We are moving towards full decentralization.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button className="gradient-bg px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:shadow-xl hover:shadow-primary/20 transition-all">
                            <Users className="w-5 h-5" />
                            Join Community
                        </button>
                        <button className="glass px-8 py-4 rounded-2xl font-bold border border-white/10 hover:bg-white/5 transition-all flex items-center gap-2">
                            <Globe className="w-5 h-5" />
                            Read Whitepaper
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
