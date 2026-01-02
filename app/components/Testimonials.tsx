'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        name: 'Ananya R.',
        age: 28,
        service: 'Clinical Psychology',
        rating: 5,
        text: 'The support I received helped me navigate through my anxiety. The therapist was compassionate and truly understood my struggles.',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150'
    },
    {
        name: 'Priya M.',
        age: 16,
        service: 'Adolescent Care',
        rating: 5,
        text: 'Finally found someone who gets what teens go through. Helped me deal with exam stress and peer pressure without judgment.',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150'
    },
    {
        name: 'Divya K.',
        age: 32,
        service: 'Pregnancy Support',
        rating: 5,
        text: 'Postpartum depression felt overwhelming, but the care I received here was life-changing. I feel like myself again.',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150'
    },
    {
        name: 'Riya S.',
        age: 24,
        service: 'Queer Affirmative',
        rating: 5,
        text: 'A truly safe space to explore my identity. No stigma, just genuine support and understanding.',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150'
    }
];

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-24 px-6 bg-gradient-to-br from-pink-50 to-purple-50 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold mb-4 text-gray-900">Stories of Healing</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Real experiences from women who found strength, support, and growth with HerMindmate.
                        </p>
                    </motion.div>
                </div>

                {/* Testimonial Carousel */}
                <div className="relative max-w-4xl mx-auto">
                    <div className="relative h-[400px] md:h-[300px]">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{
                                    opacity: index === currentIndex ? 1 : 0,
                                    x: index === currentIndex ? 0 : 100,
                                    display: index === currentIndex ? 'block' : 'none'
                                }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0"
                            >
                                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl relative">
                                    <Quote className="absolute top-8 right-8 text-pink-200" size={60} />

                                    <div className="flex flex-col md:flex-row gap-6 items-start">
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="w-20 h-20 rounded-full object-cover border-4 border-pink-100"
                                        />

                                        <div className="flex-1">
                                            <div className="flex gap-1 mb-3">
                                                {[...Array(testimonial.rating)].map((_, i) => (
                                                    <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />
                                                ))}
                                            </div>

                                            <p className="text-lg text-gray-700 mb-6 leading-relaxed italic">
                                                "{testimonial.text}"
                                            </p>

                                            <div>
                                                <p className="font-bold text-gray-900">{testimonial.name}</p>
                                                <p className="text-sm text-gray-500">{testimonial.service}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Dots Navigation */}
                    <div className="flex justify-center gap-2 mt-8">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all ${index === currentIndex
                                        ? 'bg-pink-400 w-8'
                                        : 'bg-gray-300 hover:bg-gray-400'
                                    }`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Stats */}
                <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto">
                    <div className="text-center">
                        <p className="text-4xl font-bold text-pink-500 mb-2">500+</p>
                        <p className="text-gray-600">Women Supported</p>
                    </div>
                    <div className="text-center">
                        <p className="text-4xl font-bold text-purple-500 mb-2">4.9/5</p>
                        <p className="text-gray-600">Average Rating</p>
                    </div>
                    <div className="text-center">
                        <p className="text-4xl font-bold text-pink-500 mb-2">95%</p>
                        <p className="text-gray-600">Would Recommend</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
