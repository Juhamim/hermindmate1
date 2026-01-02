'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Mail, Phone, Star, ArrowRight } from 'lucide-react';
import BookingModal from '../components/BookingModal';

type Doctor = {
    id: string;
    name: string;
    role: string;
    bio: string;
    fee: number;
    photo: string;
    status: string;
};

export default function TeamPage() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await fetch('/api/doctors');
            const data = await response.json();
            setDoctors(data.doctors || []);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBookAppointment = (doctorName: string) => {
        setSelectedDoctor(doctorName);
        setIsBookingOpen(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50">
            {/* Header */}
            <div className="bg-white shadow-sm sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <a href="/" className="flex items-center gap-3">
                        <img
                            src="/hermindmate-logo.png"
                            alt="HerMindmate"
                            className="h-8 w-auto"
                        />
                    </a>
                    <a
                        href="/"
                        className="text-gray-600 hover:text-pink-500 transition font-medium"
                    >
                        ← Back to Home
                    </a>
                </div>
            </div>

            {/* Hero Section */}
            <div className="py-16 px-6 text-center">
                <h1 className="text-5xl font-bold text-gray-900 mb-4">
                    Meet Our Team
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Compassionate experts dedicated to your mental wellbeing. Choose your specialist and book an appointment today.
                </p>
            </div>

            {/* Team Grid */}
            <div className="max-w-7xl mx-auto px-6 pb-20">
                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
                        <p className="mt-4 text-gray-600">Loading our team...</p>
                    </div>
                ) : doctors.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-lg">
                        <p className="text-xl text-gray-600">No specialists available at the moment.</p>
                        <p className="text-gray-500 mt-2">Please check back soon!</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {doctors.map((doctor) => (
                            <div
                                key={doctor.id}
                                className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                            >
                                {/* Doctor Photo */}
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={doctor.photo}
                                        alt={doctor.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-4 right-4">
                                        <span
                                            className={`px-4 py-2 rounded-full text-xs font-bold ${doctor.status === 'Active'
                                                    ? 'bg-green-500 text-white'
                                                    : 'bg-orange-500 text-white'
                                                }`}
                                        >
                                            {doctor.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Doctor Info */}
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                        {doctor.name}
                                    </h3>
                                    <p className="text-pink-500 font-semibold mb-3">
                                        {doctor.role}
                                    </p>
                                    <p className="text-gray-600 mb-4 line-clamp-3">
                                        {doctor.bio}
                                    </p>

                                    {/* Fee */}
                                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                                        <span className="text-sm text-gray-500">Consultation Fee</span>
                                        <span className="text-2xl font-bold text-gray-900">
                                            ₹{doctor.fee}
                                        </span>
                                    </div>

                                    {/* Rating */}
                                    <div className="flex items-center gap-1 mb-4">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                size={16}
                                                className="fill-yellow-400 text-yellow-400"
                                            />
                                        ))}
                                        <span className="text-sm text-gray-500 ml-2">(4.9/5)</span>
                                    </div>

                                    {/* Book Button */}
                                    <button
                                        onClick={() => handleBookAppointment(doctor.name)}
                                        disabled={doctor.status !== 'Active'}
                                        className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition ${doctor.status === 'Active'
                                                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:shadow-lg hover:scale-105'
                                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            }`}
                                    >
                                        <Calendar size={20} />
                                        {doctor.status === 'Active' ? 'Book Appointment' : 'Currently Unavailable'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Why Choose Us Section */}
            <div className="bg-white py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Choose HerMindmate?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Star className="text-pink-500" size={32} />
                            </div>
                            <h3 className="font-bold text-xl mb-2">Expert Professionals</h3>
                            <p className="text-gray-600">Licensed and experienced specialists in women's mental health</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Calendar className="text-purple-500" size={32} />
                            </div>
                            <h3 className="font-bold text-xl mb-2">Flexible Scheduling</h3>
                            <p className="text-gray-600">Book appointments at your convenience, online or in-person</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Mail className="text-pink-500" size={32} />
                            </div>
                            <h3 className="font-bold text-xl mb-2">Confidential Care</h3>
                            <p className="text-gray-600">Your privacy and comfort are our top priorities</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Modal */}
            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => {
                    setIsBookingOpen(false);
                    setSelectedDoctor(null);
                }}
                preSelectedTherapist={selectedDoctor || undefined}
            />
        </div>
    );
}
