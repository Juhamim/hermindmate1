'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Users, TrendingUp, Clock, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

type Booking = {
    id: string;
    service: string;
    date: string;
    time: string;
    name: string;
    email: string;
    phone: string;
    status: string;
    notes?: string;
};

export default function PsychologistDashboard() {
    const [stats, setStats] = useState({
        todayAppointments: 0,
        totalPatients: 0,
        monthlyEarnings: 0,
        completedSessions: 0,
    });
    const [upcomingAppointments, setUpcomingAppointments] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            // Fetch all bookings for this psychologist
            const response = await fetch('/api/psychologist/dashboard');
            const data = await response.json();

            if (data.stats) {
                setStats(data.stats);
            }
            if (data.upcomingAppointments) {
                setUpcomingAppointments(data.upcomingAppointments);
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        { label: 'Today\'s Appointments', value: stats.todayAppointments, icon: Calendar, color: 'blue' },
        { label: 'Total Patients', value: stats.totalPatients, icon: Users, color: 'purple' },
        { label: 'This Month\'s Earnings', value: `₹${stats.monthlyEarnings.toLocaleString()}`, icon: TrendingUp, color: 'green' },
        { label: 'Completed Sessions', value: stats.completedSessions, icon: CheckCircle, color: 'pink' },
    ];

    return (
        <div className="p-8">
            {/* Welcome Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Dr. Priya! 👋</h1>
                <p className="text-gray-600">Here's what's happening with your practice today.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.label} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-xl bg-${stat.color}-100`}>
                                    <Icon className={`text-${stat.color}-600`} size={24} />
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                            <p className="text-sm text-gray-500">{stat.label}</p>
                        </div>
                    );
                })}
            </div>

            {/* Upcoming Appointments */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Upcoming Appointments</h2>
                    <Link
                        href="/psychologist/appointments"
                        className="text-sm font-medium text-purple-600 hover:text-purple-700"
                    >
                        View All
                    </Link>
                </div>

                {loading ? (
                    <div className="text-center py-8 text-gray-500">Loading...</div>
                ) : upcomingAppointments.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        <Calendar className="mx-auto mb-3 text-gray-400" size={48} />
                        <p>No upcoming appointments</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {upcomingAppointments.map((appointment) => (
                            <div
                                key={appointment.id}
                                className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition"
                            >
                                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex flex-col items-center justify-center">
                                    <span className="text-2xl font-bold text-purple-600">
                                        {new Date(appointment.date).getDate()}
                                    </span>
                                    <span className="text-xs text-purple-600">
                                        {new Date(appointment.date).toLocaleDateString('en-US', { month: 'short' })}
                                    </span>
                                </div>

                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-900">{appointment.name}</h3>
                                    <p className="text-sm text-gray-600">{appointment.service}</p>
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className="text-xs text-gray-500 flex items-center gap-1">
                                            <Clock size={12} />
                                            {appointment.time}
                                        </span>
                                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${appointment.status === 'confirmed'
                                            ? 'bg-green-100 text-green-600'
                                            : appointment.status === 'pending'
                                                ? 'bg-yellow-100 text-yellow-600'
                                                : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {appointment.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button className="p-2 hover:bg-green-50 rounded-lg text-green-600 transition">
                                        <CheckCircle size={20} />
                                    </button>
                                    <button className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition">
                                        <XCircle size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <Link
                    href="/psychologist/appointments"
                    className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100 hover:shadow-md transition"
                >
                    <Calendar className="text-purple-600 mb-3" size={32} />
                    <h3 className="font-bold text-gray-900 mb-1">Manage Appointments</h3>
                    <p className="text-sm text-gray-600">View and manage your schedule</p>
                </Link>

                <Link
                    href="/psychologist/patients"
                    className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-100 hover:shadow-md transition"
                >
                    <Users className="text-blue-600 mb-3" size={32} />
                    <h3 className="font-bold text-gray-900 mb-1">Patient Records</h3>
                    <p className="text-sm text-gray-600">Access patient history and notes</p>
                </Link>

                <Link
                    href="/psychologist/profile"
                    className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100 hover:shadow-md transition"
                >
                    <TrendingUp className="text-green-600 mb-3" size={32} />
                    <h3 className="font-bold text-gray-900 mb-1">Update Profile</h3>
                    <p className="text-sm text-gray-600">Manage your professional profile</p>
                </Link>
            </div>
        </div>
    );
}
