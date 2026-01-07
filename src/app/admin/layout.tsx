'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
    LayoutDashboard,
    Trophy,
    Users,
    Settings,
    LogOut,
    CreditCard,
    FileText,
    Target,
    Menu,
    X
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()
    const [mobileOpen, setMobileOpen] = useState(false)
    const [activePath, setActivePath] = useState('/admin/dashboard')

    useEffect(() => {
        const auth = localStorage.getItem('admin_auth')
        if (!auth) {
            router.push('/admin')
        }
    }, [router])

    useEffect(() => {
        setMobileOpen(false)
    }, [activePath])

    const menuItems = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Rounds & Matches', href: '/admin/rounds', icon: Target },
        { name: 'Results Entry', href: '/admin/results', icon: FileText },
        { name: 'Withdrawals', href: '/admin/withdrawals', icon: CreditCard },
        { name: 'Users & Referrals', href: '/admin/users', icon: Users },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
    ]

    const handleLogout = () => {
        localStorage.removeItem('admin_auth')
        router.push('/admin')
    }

    return (
        <div className="min-h-screen bg-[#0a0a0c] flex">
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#0f0f12] border-b border-white/5 flex items-center justify-between px-4 z-40">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
                        <Trophy className="text-white w-4 h-4" />
                    </div>
                    <span className="font-bold text-white">EasyPicks Admin</span>
                </div>
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="p-2 text-white/70 hover:text-white"
                >
                    {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Sidebar */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 bg-[#0f0f12] border-r border-white/5 transform transition-transform duration-300 lg:translate-x-0 flex flex-col",
                mobileOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="p-6 border-b border-white/5 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
                            <Trophy className="text-white w-6 h-6" />
                        </div>
                        <div>
                            <div className="font-bold text-lg">EasyPicks</div>
                            <div className="text-xs text-white/50 uppercase tracking-wider">Admin Panel</div>
                        </div>
                    </div>
                    {/* Mobile Close Button */}
                    <button onClick={() => setMobileOpen(false)} className="lg:hidden p-2 text-white/50 hover:text-white">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setActivePath(item.href)}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium",
                                activePath === item.href
                                    ? "bg-primary/10 text-primary border border-primary/20"
                                    : "text-white/50 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 w-full transition-all font-medium"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Backdrop */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="flex-1 lg:ml-64 p-4 lg:p-8 pt-20 lg:pt-8 w-full overflow-hidden">
                {children}

                <footer className="mt-12 pt-8 border-t border-white/5 text-center text-white/30 text-sm">
                    <p>&copy; {new Date().getFullYear()} EasyPicks Admin Panel. System v1.0.0</p>
                </footer>
            </main>
        </div>
    )
}
