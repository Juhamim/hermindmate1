'use client';

import React from 'react';
import { Calendar, Clock } from 'lucide-react';

export default function SchedulePage() {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const timeSlots = [
        '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'
    ];

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Schedule Management</h1>
                <p className="text-gray-500">Set your availability and manage your working hours</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
                    {daysOfWeek.map((day) => (
                        <div key={day} className="border border-gray-200 rounded-xl p-4">
                            <h3 className="font-bold text-gray-900 mb-3">{day}</h3>
                            <div className="space-y-2">
                                {timeSlots.map((time) => (
                                    <div
                                        key={time}
                                        className="p-2 text-sm text-gray-600 border border-gray-100 rounded-lg hover:bg-purple-50 hover:border-purple-200 cursor-pointer transition"
                                    >
                                        <Clock className="inline mr-1" size={14} />
                                        {time}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex gap-4">
                    <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold hover:from-purple-600 hover:to-pink-600 transition shadow-lg">
                        Save Schedule
                    </button>
                    <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition">
                        Reset
                    </button>
                </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100 p-6">
                    <Calendar className="text-purple-600 mb-3" size={32} />
                    <h3 className="font-bold text-gray-900 mb-2">Quick Stats</h3>
                    <p className="text-gray-600 mb-4">This week you have 12 available slots</p>
                    <div className="flex gap-2">
                        <span className="px-3 py-1 bg-white rounded-full text-sm font-bold text-gray-700">
                            8 Booked
                        </span>
                        <span className="px-3 py-1 bg-white rounded-full text-sm font-bold text-green-600">
                            4 Available
                        </span>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 p-6">
                    <Clock className="text-blue-600 mb-3" size={32} />
                    <h3 className="font-bold text-gray-900 mb-2">Working Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                    <p className="text-gray-500 text-sm mt-2">Closed on Sundays</p>
                </div>
            </div>
        </div>
    );
}
