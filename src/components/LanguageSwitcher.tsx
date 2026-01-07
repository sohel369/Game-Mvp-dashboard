'use client'

import { useState } from 'react'
import { Globe, ChevronDown, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const LANGUAGES = [
    { code: 'en', name: 'English', flag: '🇬🇧', enabled: true },
    { code: 'es', name: 'Español', flag: '🇪🇸', enabled: false },
    { code: 'fr', name: 'Français', flag: '🇫🇷', enabled: false },
]

export default function LanguageSwitcher() {
    const [isOpen, setIsOpen] = useState(false)
    const [selected, setSelected] = useState(LANGUAGES[0])

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
            >
                <Globe className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                <span className="text-sm font-bold text-white/80 uppercase tracking-wider">
                    {selected.code}
                </span>
                <ChevronDown className={cn(
                    "w-4 h-4 text-white/40 transition-transform duration-300",
                    isOpen && "rotate-180"
                )} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Dropdown */}
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute top-20 right-0 mt-3 w-64 glass-morphism bg-black/20 rounded-2xl border border-white/10 shadow-2xl z-50 flex flex-col"
                        >
                            <div className="p-2">
                                {LANGUAGES.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => {
                                            if (lang.enabled) {
                                                setSelected(lang)
                                                setIsOpen(false)
                                            }
                                        }}
                                        disabled={!lang.enabled}
                                        className={cn(
                                            "w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group",
                                            lang.enabled
                                                ? "hover:bg-white/10 cursor-pointer"
                                                : "opacity-40 cursor-not-allowed",
                                            selected.code === lang.code && "bg-primary/10 border border-primary/20"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">{lang.flag}</span>
                                            <div className="text-left">
                                                <div className={cn(
                                                    "text-sm font-bold",
                                                    lang.enabled ? "text-white" : "text-white/40"
                                                )}>
                                                    {lang.name}
                                                </div>
                                                {!lang.enabled && (
                                                    <div className="text-xs text-white/30 font-medium">
                                                        Coming soon
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        {selected.code === lang.code && (
                                            <Check className="w-5 h-5 text-primary" />
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Footer Note */}
                            <div className="px-4 py-3 border-t border-white/5 bg-white/5 flex-shrink-0">
                                <p className="text-xs text-white/40 font-medium text-center">
                                    More languages coming soon
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}
