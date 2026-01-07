'use client'

import { useState } from 'react'
import { Save } from 'lucide-react'

export default function AdminSettings() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Platform Settings</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Scoring Rules */}
                <div className="glass p-8 rounded-[32px] border border-white/10">
                    <h2 className="text-xl font-bold mb-6">Scoring Rules</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-white/50 mb-2">Exact Score Points</label>
                            <input type="number" defaultValue={10} className="w-full p-3 rounded-xl bg-white/5 border border-white/10" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white/50 mb-2">Correct Winner Points</label>
                            <input type="number" defaultValue={5} className="w-full p-3 rounded-xl bg-white/5 border border-white/10" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white/50 mb-2">Goal Diff Bonus</label>
                            <input type="number" defaultValue={2} className="w-full p-3 rounded-xl bg-white/5 border border-white/10" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white/50 mb-2">Draw Points</label>
                            <input type="number" defaultValue={5} className="w-full p-3 rounded-xl bg-white/5 border border-white/10" />
                        </div>
                    </div>
                </div>

                {/* Prize Structure */}
                <div className="glass p-8 rounded-[32px] border border-white/10">
                    <h2 className="text-xl font-bold mb-6">Prize Structure</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-white/50 mb-2">Rake Percentage (%)</label>
                            <input type="number" defaultValue={10} className="w-full p-3 rounded-xl bg-white/5 border border-white/10" />
                        </div>
                        <div className="pt-4 border-t border-white/5">
                            <h3 className="font-bold mb-4">Tier Distribution</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-4">
                                    <span className="w-32 text-sm">60 Points</span>
                                    <input type="number" defaultValue={50} className="flex-1 p-2 rounded-lg bg-white/5 border border-white/10" />
                                    <span className="text-white/50">%</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="w-32 text-sm">45-59 Points</span>
                                    <input type="number" defaultValue={20} className="flex-1 p-2 rounded-lg bg-white/5 border border-white/10" />
                                    <span className="text-white/50">%</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="w-32 text-sm">30-44 Points</span>
                                    <input type="number" defaultValue={15} className="flex-1 p-2 rounded-lg bg-white/5 border border-white/10" />
                                    <span className="text-white/50">%</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="w-32 text-sm">20-29 Points</span>
                                    <input type="number" defaultValue={5} className="flex-1 p-2 rounded-lg bg-white/5 border border-white/10" />
                                    <span className="text-white/50">%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Referral Settings */}
                <div className="glass p-8 rounded-[32px] border border-white/10">
                    <h2 className="text-xl font-bold mb-6">Referral Program</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-white/50 mb-2">Referrer Bonus ($)</label>
                            <input type="number" defaultValue={5} className="w-full p-3 rounded-xl bg-white/5 border border-white/10" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white/50 mb-2">Referred User Bonus ($)</label>
                            <input type="number" defaultValue={5} className="w-full p-3 rounded-xl bg-white/5 border border-white/10" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white/50 mb-2">Min Qualifying Bet ($)</label>
                            <input type="number" defaultValue={10} className="w-full p-3 rounded-xl bg-white/5 border border-white/10" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white/50 mb-2">Monthly Limit (Referrals)</label>
                            <input type="number" defaultValue={40} className="w-full p-3 rounded-xl bg-white/5 border border-white/10" />
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="lg:col-span-2 flex justify-end">
                    <button className="gradient-bg px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 hover:shadow-xl hover:shadow-primary/20 transition-all">
                        <Save className="w-5 h-5" />
                        Save All Settings
                    </button>
                </div>
            </div>
        </div>
    )
}
