'use client';

import React from 'react';
import { TrendingUp, Users, Eye, AlertTriangle, ArrowUp, ArrowDown } from 'lucide-react';

const kpiData = [
    { label: 'Total Revenue', value: '₹2,45,000', change: '+12%', trend: 'up', icon: TrendingUp, color: 'green' },
    { label: 'Active Doctors', value: '24', change: '+3', trend: 'up', icon: Users, color: 'blue' },
    { label: 'Total Blog Views', value: '45.2K', change: '+18%', trend: 'up', icon: Eye, color: 'purple' },
    { label: 'Critical Alerts', value: '3', change: '-2', trend: 'down', icon: AlertTriangle, color: 'red' },
];

export default function AdminDashboard() {
    return (
        <div className="p-8">
            {/* Welcome Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Admin! 👋</h1>
                <p className="text-gray-600">Here's what's happening with HerMindmate today.</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {kpiData.map((kpi) => {
                    const Icon = kpi.icon;
                    const TrendIcon = kpi.trend === 'up' ? ArrowUp : ArrowDown;

                    return (
                        <div key={kpi.label} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-xl bg-${kpi.color}-100`}>
                                    <Icon className={`text-${kpi.color}-600`} size={24} />
                                </div>
                                <span className={`flex items-center gap-1 text-sm font-bold ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                    <TrendIcon size={16} />
                                    {kpi.change}
                                </span>
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-1">{kpi.value}</h3>
                            <p className="text-sm text-gray-500">{kpi.label}</p>
                        </div>
                    );
                })}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Traffic Chart */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Website Traffic</h3>
                    <div className="h-64 flex items-end justify-between gap-2">
                        {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                <div
                                    className="w-full bg-gradient-to-t from-pink-400 to-purple-400 rounded-t-lg transition-all hover:opacity-80"
                                    style={{ height: `${height}%` }}
                                />
                                <span className="text-xs text-gray-500">
                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Demographics Pie Chart */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">User Demographics</h3>
                    <div className="flex items-center justify-center h-64">
                        <div className="relative w-48 h-48">
                            <svg viewBox="0 0 100 100" className="transform -rotate-90">
                                <circle cx="50" cy="50" r="40" fill="none" stroke="#FFB7B2" strokeWidth="20" strokeDasharray="75 25" />
                                <circle cx="50" cy="50" r="40" fill="none" stroke="#C7CEEA" strokeWidth="20" strokeDasharray="15 85" strokeDashoffset="-75" />
                                <circle cx="50" cy="50" r="40" fill="none" stroke="#E8D5F2" strokeWidth="20" strokeDasharray="10 90" strokeDashoffset="-90" />
                            </svg>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                        <div className="text-center">
                            <div className="w-3 h-3 bg-[#FFB7B2] rounded-full mx-auto mb-1" />
                            <p className="text-xs text-gray-500">18-25</p>
                            <p className="font-bold text-gray-900">45%</p>
                        </div>
                        <div className="text-center">
                            <div className="w-3 h-3 bg-[#C7CEEA] rounded-full mx-auto mb-1" />
                            <p className="text-xs text-gray-500">26-40</p>
                            <p className="font-bold text-gray-900">35%</p>
                        </div>
                        <div className="text-center">
                            <div className="w-3 h-3 bg-[#E8D5F2] rounded-full mx-auto mb-1" />
                            <p className="text-xs text-gray-500">40+</p>
                            <p className="font-bold text-gray-900">20%</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                    {[
                        { action: 'New booking', user: 'Priya Sharma', time: '5 minutes ago', type: 'booking' },
                        { action: 'Article published', user: 'Dr. Lakshmi', time: '1 hour ago', type: 'content' },
                        { action: 'New doctor added', user: 'Admin', time: '3 hours ago', type: 'doctor' },
                        { action: 'Service updated', user: 'Admin', time: '5 hours ago', type: 'service' },
                    ].map((activity, i) => (
                        <div key={i} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.type === 'booking' ? 'bg-green-100 text-green-600' :
                                    activity.type === 'content' ? 'bg-purple-100 text-purple-600' :
                                        activity.type === 'doctor' ? 'bg-blue-100 text-blue-600' :
                                            'bg-orange-100 text-orange-600'
                                }`}>
                                {activity.user[0]}
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-gray-900">{activity.action}</p>
                                <p className="text-sm text-gray-500">by {activity.user}</p>
                            </div>
                            <span className="text-xs text-gray-400">{activity.time}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
