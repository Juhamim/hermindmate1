'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
    {
        category: 'General',
        questions: [
            {
                q: 'What is HerMindmate?',
                a: 'HerMindmate is a comprehensive mental health platform dedicated to supporting women across all life stages, from adolescence to elderly years, with culturally sensitive and compassionate care.'
            },
            {
                q: 'Who can use HerMindmate services?',
                a: 'Our services are designed for all women, including adolescents, homemakers, working professionals, pregnant women, new mothers, and elderly women. We also provide queer-affirmative support.'
            },
            {
                q: 'Is my information confidential?',
                a: 'Absolutely. We maintain strict confidentiality protocols. All sessions and personal information are protected under professional ethics and privacy laws.'
            }
        ]
    },
    {
        category: 'Services',
        questions: [
            {
                q: 'What types of therapy do you offer?',
                a: 'We offer clinical psychology, adolescent counseling, pregnancy support, queer-affirmative therapy, sexual health counseling, and specialized care for trauma and personality disorders.'
            },
            {
                q: 'How long is each session?',
                a: 'Sessions typically last 45-60 minutes, depending on the type of service. Your therapist will discuss the session structure during your first appointment.'
            },
            {
                q: 'Can I choose my therapist?',
                a: 'Yes! You can browse our team of specialists and select a therapist based on their expertise, approach, and availability.'
            }
        ]
    },
    {
        category: 'Booking & Payment',
        questions: [
            {
                q: 'How do I book an appointment?',
                a: 'Click the "Book Session" button, select your preferred service and therapist, choose a date and time, and complete the booking form. You\'ll receive a confirmation email.'
            },
            {
                q: 'Do you accept insurance?',
                a: 'We are working on insurance partnerships. Currently, we provide detailed receipts that you can submit to your insurance provider for potential reimbursement.'
            },
            {
                q: 'What are your session fees?',
                a: 'Fees vary by service type and therapist. We also offer sliding scale options for those who need financial assistance. Contact us for specific pricing.'
            },
            {
                q: 'Can I reschedule or cancel?',
                a: 'Yes, you can reschedule or cancel up to 24 hours before your appointment without any charges. Please contact us as soon as possible.'
            }
        ]
    },
    {
        category: 'Privacy & Safety',
        questions: [
            {
                q: 'How do you ensure my safety?',
                a: 'All our therapists are licensed professionals. We follow strict ethical guidelines, maintain confidentiality, and provide a judgment-free, safe space for all clients.'
            },
            {
                q: 'Are online sessions secure?',
                a: 'Yes, we use encrypted, HIPAA-compliant platforms for all virtual sessions to ensure your privacy and security.'
            }
        ]
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<string | null>(null);

    const toggleFAQ = (index: string) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-24 px-6 bg-white">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <HelpCircle className="mx-auto mb-4 text-pink-400" size={48} />
                        <h2 className="text-4xl font-bold mb-4 text-gray-900">Frequently Asked Questions</h2>
                        <p className="text-gray-600">
                            Everything you need to know about our services and how we can support you.
                        </p>
                    </motion.div>
                </div>

                <div className="space-y-8">
                    {faqs.map((category, catIndex) => (
                        <div key={catIndex}>
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="w-1 h-6 bg-gradient-to-b from-pink-400 to-purple-400 rounded-full" />
                                {category.category}
                            </h3>

                            <div className="space-y-3">
                                {category.questions.map((faq, qIndex) => {
                                    const faqId = `${catIndex}-${qIndex}`;
                                    const isOpen = openIndex === faqId;

                                    return (
                                        <motion.div
                                            key={qIndex}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: qIndex * 0.1 }}
                                            className="border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-pink-200 transition"
                                        >
                                            <button
                                                onClick={() => toggleFAQ(faqId)}
                                                className="w-full p-5 flex justify-between items-center text-left hover:bg-gray-50 transition"
                                            >
                                                <span className="font-semibold text-gray-800 pr-4">{faq.q}</span>
                                                <motion.div
                                                    animate={{ rotate: isOpen ? 180 : 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <ChevronDown className="text-pink-400 flex-shrink-0" size={24} />
                                                </motion.div>
                                            </button>

                                            <AnimatePresence>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        <div className="px-5 pb-5 text-gray-600 leading-relaxed">
                                                            {faq.a}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 p-8 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl text-center">
                    <p className="text-gray-700 mb-4">Still have questions?</p>
                    <button className="px-8 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full font-semibold hover:shadow-lg transition">
                        Contact Us
                    </button>
                </div>
            </div>
        </section>
    );
}
