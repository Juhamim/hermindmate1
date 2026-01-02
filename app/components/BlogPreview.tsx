'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, Clock, User } from 'lucide-react';

const blogPosts = [
    {
        title: 'Understanding Postpartum Depression',
        excerpt: 'Learn about the signs, symptoms, and support options for new mothers experiencing postpartum depression.',
        category: 'Pregnancy Support',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=600&h=400',
        author: 'Dr. Kavita Reddy'
    },
    {
        title: 'Navigating Adolescent Anxiety',
        excerpt: 'Practical tips for teens and parents to manage exam stress, peer pressure, and social anxiety.',
        category: 'Adolescent Care',
        readTime: '4 min read',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&h=400',
        author: 'Dr. Anjali Mehta'
    },
    {
        title: 'Self-Care Practices for Mental Wellness',
        excerpt: 'Simple daily habits that can significantly improve your mental health and overall well-being.',
        category: 'Wellness',
        readTime: '6 min read',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&h=400',
        author: 'Dr. Priya Sharma'
    }
];

export default function BlogPreview() {
    return (
        <section className="py-24 px-6 bg-[#fff9fa]">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <BookOpen className="text-pink-400" size={32} />
                            <h2 className="text-4xl font-bold text-gray-900">Resources & Insights</h2>
                        </div>
                        <p className="text-gray-600">Expert advice and mental health tips for your journey.</p>
                    </motion.div>

                    <button className="hidden md:block text-pink-500 font-bold hover:underline flex items-center gap-2">
                        View All Articles
                        <ArrowRight size={20} />
                    </button>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                        <motion.article
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group cursor-pointer"
                        >
                            <div className="relative overflow-hidden h-48">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-pink-500">
                                        {post.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-pink-500 transition">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600 mb-4 line-clamp-2">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center justify-between text-sm text-gray-500">
                                    <div className="flex items-center gap-2">
                                        <User size={16} />
                                        <span>{post.author}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock size={16} />
                                        <span>{post.readTime}</span>
                                    </div>
                                </div>

                                <div className="mt-4 flex items-center text-pink-500 font-semibold group-hover:gap-2 transition-all">
                                    Read More
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                <div className="text-center mt-12 md:hidden">
                    <button className="text-pink-500 font-bold hover:underline flex items-center gap-2 mx-auto">
                        View All Articles
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>
        </section>
    );
}
