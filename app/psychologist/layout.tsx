'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard, Calendar, Users, Clock,
    DollarSign, User, Menu, X, LogOut
} from 'lucide-react';

const navItems = [
    { name: 'Dashboard', href: '/psychologist', icon: LayoutDashboard },
    { name: 'Appointments', href: '/psychologist/appointments', icon: Calendar },
    { name: 'Patients', href: '/psychologist/patients', icon: Users },
    { name: 'Schedule', href: '/psychologist/schedule', icon: Clock },
    { name: 'Earnings', href: '/psychologist/earnings', icon: DollarSign },
    { name: 'Profile', href: '/psychologist/profile', icon: User },
];

export default function PsychologistLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        window.location.href = '/login';
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-white border-r border-gray-200
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">H</span>
                                </div>
                                <div>
                                    <h1 className="font-bold text-gray-900">HerMindmate</h1>
                                    <p className="text-xs text-gray-500">Psychologist Portal</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="lg:hidden text-gray-400 hover:text-gray-600"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition
                    ${isActive
                                            ? 'bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600'
                                            : 'text-gray-600 hover:bg-gray-50'
                                        }
                  `}
                                >
                                    <Icon size={20} />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Profile */}
                    <div className="p-4 border-t border-gray-200">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold">P</span>
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-gray-900 text-sm">Dr. Priya Kumar</p>
                                <p className="text-xs text-gray-500">Psychologist</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition"
                        >
                            <LogOut size={16} />
                            Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Bar */}
                <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden text-gray-600 hover:text-gray-900"
                    >
                        <Menu size={24} />
                    </button>
                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-gray-900">
                            {navItems.find(item => item.href === pathname)?.name || 'Psychologist'}
                        </h2>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
