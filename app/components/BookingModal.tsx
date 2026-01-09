'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, User, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    preSelectedTherapist?: string;
}

interface BookingFormData {
    service: string;
    therapist: string;
    date: string;
    time: string;
    name: string;
    email: string;
    phone: string;
    notes: string;
}

interface Doctor {
    id: string;
    name: string;
    role: string;
    status: string;
}

const services = [
    { id: 'clinical', name: 'Clinical Psychology', duration: '50 min' },
    { id: 'adolescent', name: 'Adolescent Care', duration: '45 min' },
    { id: 'pregnancy', name: 'Pregnancy Support', duration: '60 min' },
    { id: 'queer', name: 'Queer Affirmative', duration: '50 min' },
    { id: 'sexual', name: 'Sexual Health', duration: '45 min' },
];

const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
];

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
    const [step, setStep] = useState(1);
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loadingDoctors, setLoadingDoctors] = useState(true);
    const { register, handleSubmit, watch, formState: { errors } } = useForm<BookingFormData>();

    const selectedService = watch('service');
    const selectedTherapist = watch('therapist');
    const selectedDate = watch('date');
    const selectedTime = watch('time');

    useEffect(() => {
        if (isOpen) {
            fetchDoctors();
        }
    }, [isOpen]);

    const fetchDoctors = async () => {
        try {
            const response = await fetch('/api/doctors');
            const data = await response.json();
            if (data.doctors) {
                setDoctors(data.doctors.filter((d: Doctor) => d.status === 'Active'));
            }
        } catch (error) {
            console.error('Error fetching doctors:', error);
        } finally {
            setLoadingDoctors(false);
        }
    };

    const onSubmit = async (data: BookingFormData) => {
        try {
            // Find the selected doctor to get their name and ID
            const selectedDoctor = doctors.find(d => d.id === data.therapist);
            if (!selectedDoctor) {
                alert('Please select a therapist');
                return;
            }

            const bookingData = {
                service: data.service,
                therapist: selectedDoctor.name,
                doctorId: selectedDoctor.id,
                date: data.date,
                time: data.time,
                name: data.name,
                email: data.email,
                phone: data.phone,
                notes: data.notes || '',
            };

            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });

            if (!response.ok) {
                throw new Error('Failed to create booking');
            }

            const result = await response.json();
            console.log('Booking created:', result);

            setBookingSuccess(true);
            setTimeout(() => {
                setBookingSuccess(false);
                setStep(1);
                onClose();
            }, 3000);
        } catch (error) {
            console.error('Booking error:', error);
            alert('Failed to create booking. Please try again.');
        }
    };

    const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition z-10"
                    >
                        <X size={24} className="text-gray-600" />
                    </button>

                    {bookingSuccess ? (
                        <div className="p-12 text-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', duration: 0.5 }}
                            >
                                <CheckCircle size={80} className="text-green-500 mx-auto mb-6" />
                            </motion.div>
                            <h2 className="text-3xl font-bold mb-4 text-gray-900">Booking Confirmed!</h2>
                            <p className="text-gray-600 mb-2">Your appointment has been scheduled.</p>
                            <p className="text-sm text-gray-500">Check your email for confirmation details.</p>
                        </div>
                    ) : (
                        <div className="p-8">
                            {/* Header */}
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold mb-2 text-gray-900">Book Your Session</h2>
                                <p className="text-gray-600">Step {step} of 4</p>

                                {/* Progress Bar */}
                                <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-pink-400 to-purple-400"
                                        initial={{ width: '0%' }}
                                        animate={{ width: `${(step / 4) * 100}%` }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </div>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                {/* Step 1: Select Service */}
                                {step === 1 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <h3 className="text-xl font-bold mb-4">Select a Service</h3>
                                        <div className="space-y-3">
                                            {services.map((service) => (
                                                <label
                                                    key={service.id}
                                                    className={`block p-4 border-2 rounded-xl cursor-pointer transition ${selectedService === service.id
                                                        ? 'border-pink-400 bg-pink-50'
                                                        : 'border-gray-200 hover:border-pink-200'
                                                        }`}
                                                >
                                                    <input
                                                        type="radio"
                                                        value={service.id}
                                                        {...register('service', { required: true })}
                                                        className="sr-only"
                                                    />
                                                    <div className="flex justify-between items-center">
                                                        <span className="font-semibold text-gray-800">{service.name}</span>
                                                        <span className="text-sm text-gray-500">{service.duration}</span>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 2: Select Therapist */}
                                {step === 2 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <h3 className="text-xl font-bold mb-4">Choose Your Therapist</h3>
                                        {loadingDoctors ? (
                                            <div className="text-center py-8 text-gray-500">Loading therapists...</div>
                                        ) : doctors.length === 0 ? (
                                            <div className="text-center py-8 text-gray-500">No therapists available</div>
                                        ) : (
                                            <div className="space-y-3">
                                                {doctors.map((doctor) => (
                                                    <label
                                                        key={doctor.id}
                                                        className={`block p-4 border-2 rounded-xl cursor-pointer transition ${selectedTherapist === doctor.id
                                                            ? 'border-pink-400 bg-pink-50'
                                                            : 'border-gray-200 hover:border-pink-200'
                                                            }`}
                                                    >
                                                        <input
                                                            type="radio"
                                                            value={doctor.id}
                                                            {...register('therapist', { required: true })}
                                                            className="sr-only"
                                                        />
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-300 to-purple-300 flex items-center justify-center text-white font-bold">
                                                                {doctor.name.charAt(0)}
                                                            </div>
                                                            <div className="flex-1">
                                                                <p className="font-semibold text-gray-800">{doctor.name}</p>
                                                                <p className="text-sm text-gray-500">{doctor.role}</p>
                                                            </div>
                                                        </div>
                                                    </label>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                )}

                                {/* Step 3: Select Date & Time */}
                                {step === 3 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <h3 className="text-xl font-bold mb-4">Pick Date & Time</h3>

                                        <div className="mb-6">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                <Calendar className="inline mr-2" size={16} />
                                                Select Date
                                            </label>
                                            <input
                                                type="date"
                                                {...register('date', { required: true })}
                                                min={new Date().toISOString().split('T')[0]}
                                                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                <Clock className="inline mr-2" size={16} />
                                                Select Time
                                            </label>
                                            <div className="grid grid-cols-3 gap-2">
                                                {timeSlots.map((time) => (
                                                    <label
                                                        key={time}
                                                        className={`p-3 border-2 rounded-xl cursor-pointer text-center transition ${selectedTime === time
                                                            ? 'border-pink-400 bg-pink-50 font-semibold'
                                                            : 'border-gray-200 hover:border-pink-200'
                                                            }`}
                                                    >
                                                        <input
                                                            type="radio"
                                                            value={time}
                                                            {...register('time', { required: true })}
                                                            className="sr-only"
                                                        />
                                                        {time}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 4: Contact Details */}
                                {step === 4 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <h3 className="text-xl font-bold mb-4">Your Details</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                                                <input
                                                    type="text"
                                                    {...register('name', { required: true })}
                                                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none"
                                                    placeholder="Enter your name"
                                                />
                                                {errors.name && <p className="text-red-500 text-sm mt-1">Name is required</p>}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                                                <input
                                                    type="email"
                                                    {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                                                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none"
                                                    placeholder="your@email.com"
                                                />
                                                {errors.email && <p className="text-red-500 text-sm mt-1">Valid email is required</p>}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                                                <input
                                                    type="tel"
                                                    {...register('phone', { required: true })}
                                                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none"
                                                    placeholder="+91 98765 43210"
                                                />
                                                {errors.phone && <p className="text-red-500 text-sm mt-1">Phone is required</p>}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes (Optional)</label>
                                                <textarea
                                                    {...register('notes')}
                                                    rows={3}
                                                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none resize-none"
                                                    placeholder="Any specific concerns or questions..."
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Navigation Buttons */}
                                <div className="flex gap-3 mt-8">
                                    {step > 1 && (
                                        <button
                                            type="button"
                                            onClick={prevStep}
                                            className="flex-1 px-6 py-3 border-2 border-gray-200 rounded-full font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2"
                                        >
                                            <ArrowLeft size={20} />
                                            Back
                                        </button>
                                    )}

                                    {step < 4 ? (
                                        <button
                                            type="button"
                                            onClick={nextStep}
                                            disabled={
                                                (step === 1 && !selectedService) ||
                                                (step === 2 && !selectedTherapist) ||
                                                (step === 3 && (!selectedDate || !selectedTime))
                                            }
                                            className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            Next
                                            <ArrowRight size={20} />
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full font-semibold hover:shadow-lg transition flex items-center justify-center gap-2"
                                        >
                                            Confirm Booking
                                            <CheckCircle size={20} />
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
