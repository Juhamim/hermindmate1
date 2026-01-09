'use client';

import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, Calendar, CheckCircle } from 'lucide-react';

export default function EarningsPage() {
    const [earnings, setEarnings] = useState({
        thisMonth: 0,
        lastMonth: 0,
        thisYear: 0,
        completedSessions: 0,
        monthlyBreakdown: [] as any[],
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEarnings();
    }, []);

    const fetchEarnings = async () => {
        try {
            const response = await fetch('/api/psychologist/earnings');
            const data = await response.json();
            if (data.earnings) {
                setEarnings(data.earnings);
            }
        } catch (error) {
            console.error('Error fetching earnings:', error);
        } finally {
            setLoading(false);
        }
    };

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Earnings & Analytics</h1>
                <p className="text-gray-500">Track your income and session statistics</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 rounded-xl bg-green-100">
                            <DollarSign className="text-green-600" size={24} />
                        </div>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-1">
                        ₹{earnings.thisMonth.toLocaleString()}
                    </h3>
                    <p className="text-sm text-gray-500">This Month</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 rounded-xl bg-blue-100">
                            <TrendingUp className="text-blue-600" size={24} />
                        </div>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-1">
                        ₹{earnings.lastMonth.toLocaleString()}
                    </h3>
                    <p className="text-sm text-gray-500">Last Month</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 rounded-xl bg-purple-100">
                            <Calendar className="text-purple-600" size={24} />
                        </div>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-1">
                        ₹{earnings.thisYear.toLocaleString()}
                    </h3>
                    <p className="text-sm text-gray-500">This Year</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 rounded-xl bg-pink-100">
                            <CheckCircle className="text-pink-600" size={24} />
                        </div>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-1">{earnings.completedSessions}</h3>
                    <p className="text-sm text-gray-500">Total Sessions</p>
                </div>
            </div>

            {/* Monthly Earnings Chart */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Monthly Earnings</h2>
                <div className="h-64 flex items-end justify-between gap-2">
                    {months.map((month, i) => {
                        const monthData = earnings.monthlyBreakdown.find((m: any) => m.month === i) || { earnings: 0 };
                        const maxEarnings = Math.max(...earnings.monthlyBreakdown.map((m: any) => m.earnings), 1);
                        const height = (monthData.earnings / maxEarnings) * 100;

                        return (
                            <div key={month} className="flex-1 flex flex-col items-center gap-2">
                                <div
                                    className="w-full bg-gradient-to-t from-purple-400 to-pink-400 rounded-t-lg transition-all hover:opacity-80 relative group"
                                    style={{ height: `${height}%` }}
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                                        ₹{monthData.earnings.toLocaleString()}
                                    </div>
                                </div>
                                <span className="text-xs text-gray-500">{month}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Payment History */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Payments</h2>
                <div className="space-y-4">
                    {[
                        { date: '2026-01-10', amount: 2000, patient: 'Priya Reddy', status: 'Completed' },
                        { date: '2026-01-08', amount: 2000, patient: 'Ananya Sharma', status: 'Completed' },
                        { date: '2026-01-05', amount: 2000, patient: 'Ravi Patel', status: 'Completed' },
                    ].map((payment, idx) => (
                        <div
                            key={idx}
                            className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center">
                                    <DollarSign className="text-green-600" size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{payment.patient}</h3>
                                    <p className="text-sm text-gray-500">
                                        {new Date(payment.date).toLocaleDateString('en-US', {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold text-gray-900">₹{payment.amount.toLocaleString()}</p>
                                <span className="text-xs font-bold px-2 py-1 bg-green-100 text-green-600 rounded-full">
                                    {payment.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
