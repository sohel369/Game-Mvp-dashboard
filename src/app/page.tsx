'use client'

import Link from 'next/link'
import { Trophy, Shield, Zap, ArrowRight, Users, TrendingUp, ChevronRight, PlayCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050507]">
      {/* Dynamic Hero Glow & Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/hero_crypto_betting_bg_1767460740439.png')] bg-cover bg-center opacity-30 mix-blend-screen scale-110 animate-float-slow"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050507]/20 to-[#050507]"></div>
        <div className="hero-glow"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-56 overflow-hidden">
        {/* Enhanced Background Grid */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)]"></div>
        </div>

        {/* Floating Orbs */}
        <div className="absolute top-40 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-60 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center"
          >
            {/* Live Badge with Enhanced Design */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-morphism border border-primary/30 mb-8 sm:mb-12 transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] group"
            >
              <div className="relative">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_15px_#8b5cf6]"></span>
                <span className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
              </div>
              <span className="text-xs sm:text-sm font-black tracking-wider text-white uppercase">Round 52 is Now Live</span>
              <div className="h-4 w-px bg-white/20"></div>
              <span className="text-xs sm:text-sm font-black tracking-wider gradient-text">$10,000 GTD</span>
            </motion.div>

            {/* Main Headline with Dual Gradient */}
            <motion.h1
              variants={itemVariants}
              className="relative text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 sm:mb-12 tracking-[-0.05em] leading-[0.9] sm:leading-[0.85] max-w-6xl"
            >
              <span className="inline-block text-white relative">
                Master the Game.
                <div className="absolute -inset-4 bg-primary/5 blur-3xl -z-10 rounded-full"></div>
              </span>
              <br />
              <span className="inline-block relative mt-2 sm:mt-4">
                <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient">
                  Own the Glory.
                </span>
                <div className="absolute -inset-8 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 blur-3xl -z-10"></div>
              </span>
            </motion.h1>

            {/* Tagline with Enhanced Typography */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl md:text-3xl text-white/60 max-w-4xl mx-auto mb-16 sm:mb-20 leading-relaxed font-medium px-2 sm:px-0"
            >
              The most <span className="text-white font-bold">elite crypto pick'em platform</span> on Base.{' '}
              <span className="text-primary/80 font-semibold">Predict exact scores</span>,{' '}
              <span className="text-secondary/80 font-semibold">win pooled USDC rewards</span>, and{' '}
              <span className="text-white font-bold">climb the leaderboard</span> with zero compromise.
            </motion.p>

            {/* Floating Stats Row */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-6 sm:gap-8 mb-14 w-full"
            >
              {[
                { label: 'Total Prizes', value: '$1.2M+', icon: Trophy },
                { label: 'Active Players', value: '12K+', icon: Users },
                { label: 'Avg Payout', value: '90%', icon: TrendingUp }
              ].map((stat, i) => (
                <div
                  key={i}
                  className="glass-morphism px-6 py-4 sm:px-8 sm:py-4 rounded-2xl border border-white/10 hover:border-primary/30 transition-all hover:scale-105 group flex-1 sm:flex-none min-w-[140px]"
                >
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 text-center sm:text-left">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform mb-2 sm:mb-0">
                      <stat.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-[10px] sm:text-xs text-white/40 font-bold uppercase tracking-wider">{stat.label}</div>
                      <div className="text-xl sm:text-2xl font-black text-white">{stat.value}</div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTAs with Enhanced Effects */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full sm:w-auto px-4 sm:px-0"
            >
              <Link href="/betting" className="relative gradient-bg-alt px-10 py-5 sm:px-12 sm:py-6 rounded-2xl font-black text-xl sm:text-2xl flex items-center justify-center gap-4 hover:shadow-[0_20px_60px_rgba(124,58,237,0.5)] transition-all duration-500 group overflow-hidden w-full sm:w-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                <span className="relative z-10">Play Now</span>
                <PlayCircle className="w-6 h-6 sm:w-7 sm:h-7 group-hover:rotate-12 group-hover:scale-110 transition-transform relative z-10" />
              </Link>
              <Link href="/transparency" className="glass-morphism px-10 py-5 sm:px-12 sm:py-6 rounded-2xl font-black text-xl sm:text-2xl border border-white/20 hover:bg-white/5 hover:border-primary/40 transition-all duration-300 flex items-center justify-center gap-3 group w-full sm:w-auto">
                <span>Transparency Hub</span>
                <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>

            {/* Trust Indicator */}
            <motion.div
              variants={itemVariants}
              className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-3 text-white/30 text-center sm:text-left px-4"
            >
              <div className="flex items-center gap-2 justify-center">
                <Shield className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-widest">Built on Base</span>
              </div>
              <span className="hidden sm:inline">•</span>
              <span className="text-sm font-bold uppercase tracking-widest">Fully Transparent</span>
              <span className="hidden sm:inline">•</span>
              <span className="text-sm font-bold uppercase tracking-widest">Provably Fair</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: Zap, title: "Precision Picks", desc: "Pick 6 exact scores. $10 per ticket. High stakes, high rewards. No fake odds.", color: "text-yellow-400" },
              { icon: Shield, title: "Immutable Ledger", desc: "Built on Base. All bets and payouts are etched in the internal ledger with public transparency.", color: "text-blue-400" },
              { icon: Trophy, title: "Massive Vaults", desc: "90% payout ratio. Progressive jackpots. Automatic credits to your internal wallet.", color: "text-purple-400" }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                className="glass-card p-6 sm:p-10 group"
              >
                <div className={cn("w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500")}>
                  <feature.icon className={cn("w-9 h-9", feature.color)} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black mb-6 group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-white/40 text-base sm:text-lg leading-relaxed font-medium">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vault Premium Overview */}
      <section className="py-24 sm:py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="gradient-border-mask p-1 rounded-[40px]"
          >
            <div className="bg-[#0b0b0e] rounded-[39px] p-6 sm:p-10 md:p-20 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 blur-[100px] rounded-full"></div>
              <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/10 blur-[100px] rounded-full"></div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 relative z-10">
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/20">
                      <Trophy className="text-primary w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight">Weekly Main Vault</h2>
                  </div>

                  <div className="mb-14">
                    <div className="text-white/40 text-sm font-bold mb-4 uppercase tracking-[0.2em]">Current Prize Pool</div>
                    <div className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter gradient-text inline-block mb-6">$10,450.00</div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-10">
                      <div className="flex items-center gap-3 text-white/60">
                        <Users className="w-5 h-5 text-primary" />
                        <span className="font-bold text-lg">1,045 Entries</span>
                      </div>
                      <div className="flex items-center gap-3 text-white/60">
                        <TrendingUp className="w-5 h-5 text-secondary" />
                        <span className="font-bold text-lg">Verified Stats</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {[
                      { tier: "🏆 Perfect 6/6", amount: "$5,225", desc: "50% of pool + Rollover", active: true },
                      { tier: "⭐ Elite 5/6", amount: "$2,090", desc: "20% of pool", active: false },
                      { tier: "🎯 Professional 4/6", amount: "$1,567", desc: "15% of pool", active: false }
                    ].map((tier, i) => (
                      <div key={i} className={cn(
                        "p-6 rounded-[24px] border transition-all hover:translate-x-2 duration-300",
                        tier.active ? "bg-primary/5 border-primary/30 shadow-[0_0_30px_rgba(139,92,246,0.1)]" : "bg-white/2 border-white/5"
                      )}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-black text-lg sm:text-xl">{tier.tier}</span>
                          <span className="text-xl sm:text-2xl font-black text-white">{tier.amount}</span>
                        </div>
                        <p className="text-white/30 text-xs sm:text-sm font-bold uppercase tracking-widest">{tier.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-between">
                  <div className="glass-morphism p-6 sm:p-10 rounded-[32px] border border-white/10">
                    <h3 className="text-2xl font-black mb-10 flex items-center gap-3">
                      <Zap className="text-yellow-400 w-6 h-6" />
                      Live Match Hub
                    </h3>
                    <div className="space-y-4 sm:space-y-5">
                      {[
                        { home: "Arsenal", away: "Liverpool", time: "Jan 5, 21:00", active: true },
                        { home: "Man Utd", away: "Chelsea", time: "Jan 6, 18:30", active: false },
                        { home: "Real Madrid", away: "Barca", time: "Jan 6, 23:00", active: false },
                        { home: "Inter", away: "Juventus", time: "Jan 7, 20:45", active: false }
                      ].map((match, i) => (
                        <div key={i} className={cn(
                          "glass-morphism p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between border border-white/5 transition-all hover:scale-[1.03] gap-3 sm:gap-0",
                          match.active ? "border-primary/20 bg-primary/5" : ""
                        )}>
                          <div className="flex items-center justify-center w-full sm:w-auto gap-3 sm:gap-6 flex-1">
                            <span className="font-black text-sm sm:text-base flex-1 text-right leading-tight">{match.home}</span>
                            <div className="flex flex-col items-center shrink-0">
                              <span className="text-[10px] text-primary font-black uppercase mb-1">vs</span>
                              <div className="w-px h-6 bg-white/10"></div>
                            </div>
                            <span className="font-black text-sm sm:text-base flex-1 text-left leading-tight">{match.away}</span>
                          </div>
                          <div className="text-[10px] sm:text-xs text-white/30 font-black uppercase whitespace-nowrap">{match.time}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-10 sm:mt-14">
                      <Link href="/betting" className="gradient-bg w-full py-4 sm:py-6 rounded-2xl font-black text-xl sm:text-2xl flex items-center justify-center gap-4 hover:shadow-[0_0_50px_rgba(139,92,246,0.3)] transition-all group">
                        Enter Week 52 <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 group-hover:translate-x-2 transition-transform" />
                      </Link>
                      <p className="text-center text-white/20 text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] mt-4 sm:mt-6">
                        Entries close in 4h 12m
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Minimal Footer Info */}
      <footer className="py-20 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center gap-10 mb-10">
            {['Twitter', 'Discord', 'Docs', 'Support'].map((link) => (
              <a key={link} href="#" className="text-white/30 hover:text-white transition-colors font-black text-sm uppercase tracking-widest">{link}</a>
            ))}
          </div>
          <p className="text-white/10 text-xs font-black uppercase tracking-[0.5em]">&copy; 2026 EasyPicks Premium. Build on Base.</p>
        </div>
      </footer>
    </div>
  )
}
