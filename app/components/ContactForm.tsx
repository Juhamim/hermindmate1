'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
}

export default function ContactForm() {
    const [submitted, setSubmitted] = React.useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();

    const onSubmit = async (data: ContactFormData) => {
        try {
            const response = await fetch('/api/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to submit contact form');
            }

            const result = await response.json();
            console.log('Contact form submitted:', result);

            setSubmitted(true);
            reset();
            setTimeout(() => setSubmitted(false), 5000);
        } catch (error) {
            console.error('Contact form error:', error);
            alert('Failed to submit form. Please try again.');
        }
    };

    return (
        <section className="py-24 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-16 items-start">
                    {/* Left: Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold mb-6 text-gray-900">Get in Touch</h2>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Have questions or need support? We're here to help. Reach out to us and we'll get back to you as soon as possible.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                                    <Mail className="text-pink-500" size={24} />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 mb-1">Email Us</p>
                                    <a href="mailto:help@hermindmate.com" className="text-gray-600 hover:text-pink-500 transition">
                                        help@hermindmate.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                                    <Phone className="text-purple-500" size={24} />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 mb-1">Call Us</p>
                                    <a href="tel:+919876543210" className="text-gray-600 hover:text-pink-500 transition">
                                        +91 98765 43210
                                    </a>
                                    <p className="text-sm text-gray-500 mt-1">Mon-Sat, 9 AM - 6 PM IST</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                    <MapPin className="text-green-500" size={24} />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 mb-1">Visit Us</p>
                                    <p className="text-gray-600">
                                        Kerala, India
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 p-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl">
                            <p className="font-semibold text-gray-900 mb-2">Crisis Support</p>
                            <p className="text-sm text-gray-600 mb-3">
                                If you're experiencing a mental health emergency, please contact:
                            </p>
                            <p className="text-pink-600 font-bold">National Mental Health Helpline: 1800-599-0019</p>
                        </div>
                    </motion.div>

                    {/* Right: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-3xl">
                            {submitted ? (
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-center py-12"
                                >
                                    <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                                    <p className="text-gray-600">We'll get back to you within 24 hours.</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            {...register('name', { required: 'Name is required' })}
                                            className="w-full p-4 bg-white border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none transition"
                                            placeholder="Your name"
                                        />
                                        {errors.name && (
                                            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            {...register('email', {
                                                required: 'Email is required',
                                                pattern: {
                                                    value: /^\S+@\S+$/i,
                                                    message: 'Invalid email address'
                                                }
                                            })}
                                            className="w-full p-4 bg-white border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none transition"
                                            placeholder="your@email.com"
                                        />
                                        {errors.email && (
                                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            {...register('phone')}
                                            className="w-full p-4 bg-white border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none transition"
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Service Interested In
                                        </label>
                                        <select
                                            {...register('service')}
                                            className="w-full p-4 bg-white border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none transition"
                                        >
                                            <option value="">Select a service</option>
                                            <option value="clinical">Clinical Psychology</option>
                                            <option value="adolescent">Adolescent Care</option>
                                            <option value="pregnancy">Pregnancy Support</option>
                                            <option value="queer">Queer Affirmative</option>
                                            <option value="sexual">Sexual Health</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Message *
                                        </label>
                                        <textarea
                                            {...register('message', { required: 'Message is required' })}
                                            rows={4}
                                            className="w-full p-4 bg-white border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none transition resize-none"
                                            placeholder="Tell us how we can help..."
                                        />
                                        {errors.message && (
                                            <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full px-8 py-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-xl font-bold hover:shadow-lg transition flex items-center justify-center gap-2"
                                    >
                                        Send Message
                                        <Send size={20} />
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
