'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Heart, Users, Baby, Brain, Shield, Sparkles,
    ArrowRight, Calendar, Star, Menu, X, CheckCircle
} from 'lucide-react';

// Import new components
import BookingModal from './components/BookingModal';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import BlogPreview from './components/BlogPreview';
import ContactForm from './components/ContactForm';
import AnimatedBackground from './components/AnimatedBackground';

/* --- DATA FROM PPT --- */
const stats = [
    "49% of India's population are Women",
    "253 Million Adolescents in India",
    "1 in 7 Indians affected by mental health issues",
    "6.8% Adolescent Pregnancy Rate",
    "16% Elderly Women face abuse"
];

const services = [
    {
        title: "Clinical Psychology",
        desc: "Diagnosis & therapy for anxiety, depression, and trauma.",
        icon: <Brain className="text-white" size={24} />,
        color: "bg-pink-400"
    },
    {
        title: "Adolescent Care",
        desc: "Support for exam stress, body image, and peer pressure.",
        icon: <Users className="text-white" size={24} />,
        color: "bg-purple-400"
    },
    {
        title: "Pregnancy Support",
        desc: "Emotional care for postpartum depression & bonding.",
        icon: <Baby className="text-white" size={24} />,
        color: "bg-yellow-400"
    },
    {
        title: "Queer Affirmative",
        desc: "Stigma-free support for gender identity & exploration.",
        icon: <Star className="text-white" size={24} />,
        color: "bg-indigo-400"
    },
    {
        title: "Sexual Health",
        desc: "Awareness on intimate hygiene and reproductive health.",
        icon: <Heart className="text-white" size={24} />,
        color: "bg-red-400"
    }
];

const team = [
    { role: "Psychiatrist", focus: "Medical Management & Diagnosis", color: "bg-pink-50" },
    { role: "Clinical Psychologist", focus: "Trauma & Personality Disorders", color: "bg-purple-50" },
    { role: "School Counsellor", focus: "Adolescent Behavioral Issues", color: "bg-yellow-50" },
    { role: "Gynecologist", focus: "Reproductive & Sexual Health", color: "bg-green-50" },
];

/* --- COMPONENTS --- */

const Navbar = ({ onBookingClick }: { onBookingClick: () => void }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className="fixed w-full z-50 px-6 py-4 top-0">
            <div className={`max-w-7xl mx-auto rounded-full px-6 py-3 flex justify-between items-center transition-all backdrop-blur-md bg-white/30 border border-white/40 ${scrolled ? 'shadow-lg bg-white/40' : 'shadow-sm'}`}>
                <div className="flex items-center gap-3">
                    <img
                        src="/hermindmate-logo.png"
                        alt="HerMindmate"
                        className="h-8 w-auto"
                    />
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
                    <a href="#mission" className="hover:text-pink-500 transition">Our Mission</a>
                    <a href="#services" className="hover:text-pink-500 transition">Services</a>
                    <a href="/team" className="hover:text-pink-500 transition">Meet Our Team</a>
                    <a href="#faq" className="hover:text-pink-500 transition">FAQ</a>
                    <a href="#contact" className="hover:text-pink-500 transition">Contact</a>
                    <a href="/admin" className="hover:text-pink-500 transition font-bold">Admin</a>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={onBookingClick}
                        className="bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:scale-105 transition"
                    >
                        Book Session
                    </button>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 hover:bg-gray-100 rounded-full transition"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden mt-4 rounded-3xl p-6 max-w-7xl mx-auto backdrop-blur-md bg-white/30 border border-white/40"
                    >
                        <div className="flex flex-col gap-4">
                            <a href="#mission" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 font-medium hover:text-pink-500 transition py-2">Our Mission</a>
                            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 font-medium hover:text-pink-500 transition py-2">Services</a>
                            <a href="/team" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 font-medium hover:text-pink-500 transition py-2">Meet Our Team</a>
                            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 font-medium hover:text-pink-500 transition py-2">FAQ</a>
                            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 font-medium hover:text-pink-500 transition py-2">Contact</a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

const Hero = ({ onBookingClick }: { onBookingClick: () => void }) => (
    <section className="section-mint pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto split-layout">
            {/* Left: Text Content */}
            <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-pink-100 shadow-sm mb-6">
                    <Sparkles size={16} className="text-pink-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Rebuilding Strength & Grace</span>
                </div>

                <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 text-gray-900">
                    Space to figure things out
                </h1>

                <p className="text-lg text-gray-600 mb-8 max-w-xl leading-relaxed">
                    From adolescents to elders, we provide compassionate, accessible, and culturally sensitive support.
                    Because when a woman thrives, a community grows stronger.
                </p>

                <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-3">
                        <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                        <span className="text-gray-600">Convenient access anytime, anywhere</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                        <span className="text-gray-600">Professional support from licensed therapists</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                        <span className="text-gray-600">Flexible options tailored to your needs</span>
                    </li>
                </ul>

                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={onBookingClick}
                        className="bg-gray-900 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
                    >
                        Find Your Therapist
                    </button>
                    <a
                        href="#services"
                        className="px-8 py-4 rounded-full font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition inline-flex items-center justify-center"
                    >
                        Explore Services
                    </a>
                </div>
            </div>

            {/* Right: Image */}
            <div>
                <img
                    src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=800&h=600"
                    alt="Woman smiling"
                    className="rounded-image shadow-2xl"
                />
            </div>
        </div>
    </section>
);

const HowItWorks = () => {
    const steps = [
        {
            number: "1",
            title: "Check eligibility",
            description: "We're in-network with most major plans, and you can check your coverage in minutes. You can also pay out-of-pocket."
        },
        {
            number: "2",
            title: "Get matched with a therapist",
            description: "Answer a few questions online and we'll match you with a licensed provider who understands your unique needs."
        },
        {
            number: "3",
            title: "Start therapy",
            description: "Communicate with your therapist through live sessions, messaging, or both - whatever works best for you."
        },
        {
            number: "4",
            title: "Switch providers any time",
            description: "If your first therapist isn&apos;t a fit, it&apos;s easy to select a new one, at no additional cost."
        }
    ];

    return (
        <section className="section-white container-spacing">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">How HerMindmate works</h2>
                    <p className="text-gray-600 text-lg">Get started in four simple steps</p>
                </div>

                <div className="space-y-20">
                    {steps.map((step, index) => (
                        <div key={index} className={`split-layout ${index % 2 === 1 ? 'reverse' : ''}`}>
                            <div className="flex items-start gap-6">
                                <div className="step-number">{step.number}</div>
                                <div className="pt-4">
                                    <h3 className="text-2xl md:text-3xl font-bold mb-4">{step.title}</h3>
                                    <p className="text-gray-600 text-lg leading-relaxed max-w-md">{step.description}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-center">
                                <div className="w-full h-64 bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl flex items-center justify-center">
                                    <div className="text-gray-400 text-sm">Step {step.number} Illustration</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const StatsTicker = () => (
    <div className="bg-gray-900 py-4 overflow-hidden whitespace-nowrap relative">
        <div className="animate-marquee inline-block">
            {stats.map((stat, i) => (
                <span key={i} className="text-gray-300 mx-8 font-medium text-lg">
                    • {stat}
                </span>
            ))}
            {/* Duplicate for seamless loop */}
            {stats.map((stat, i) => (
                <span key={`dup-${i}`} className="text-gray-300 mx-8 font-medium text-lg">
                    • {stat}
                </span>
            ))}
        </div>
        <style jsx>{`
      @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      .animate-marquee { animation: marquee 20s linear infinite; }
    `}</style>
    </div>
);

const Services = () => (
    <section id="services" className="section-yellow container-spacing">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">What HerMindmate offers</h2>
                <p className="text-gray-600 text-lg">Holistic care guided by equity over equality</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {services.map((service, i) => (
                    <div
                        key={i}
                        className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-lg transition-all"
                    >
                        <div className={`w-16 h-16 rounded-2xl ${service.color} flex items-center justify-center mb-6 shadow-md`}>
                            {service.icon}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">{service.title}</h3>
                        <p className="text-gray-600 text-lg leading-relaxed mb-6">{service.desc}</p>
                        <button className="bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition">
                            Learn More
                        </button>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const MissionSection = () => (
    <section id="mission" className="section-pink container-spacing">
        <div className="max-w-7xl mx-auto split-layout">
            <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Vision</h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    At HerMindmate, we envision a world where every woman is <span className="text-pink-600 font-bold">safe, heard, and emotionally strong</span>.
                    When a woman thrives, a home finds stability, children find security, and communities grow stronger.
                </p>
                <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                        <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                        <span className="text-gray-600">Empowering women from adolescents to elders</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                        <span className="text-gray-600">Including homemakers, professionals, and queer communities</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                        <span className="text-gray-600">Advocating equity over one-size-fits-all solutions</span>
                    </li>
                </ul>
            </div>
            <div>
                <img
                    src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800"
                    alt="Diverse women"
                    className="rounded-image shadow-2xl w-full object-cover h-[500px]"
                />
            </div>
        </div>
    </section>
);

const TeamSection = () => (
    <section id="team" className="section-purple container-spacing">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Meet Our Team</h2>
                <p className="text-gray-600 text-lg">Compassionate experts dedicated to your wellbeing</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
                {team.map((member, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition">
                        <div className={`w-full h-40 ${member.color} rounded-xl mb-6 flex items-center justify-center`}>
                            <Users className="opacity-20 text-gray-600" size={40} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{member.role}</h3>
                        <p className="text-sm text-gray-600 mt-2">{member.focus}</p>
                        <button className="w-full mt-6 py-3 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition">
                            Book Appointment
                        </button>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const Footer = () => (
    <footer className="bg-gray-900 text-white pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400 mb-4">HerMindmate</h2>
                <p className="text-gray-400 max-w-sm">
                    A support system, not just a service. Rebuilding strength, resilience, and grace for every woman.
                </p>
            </div>
            <div>
                <h4 className="font-bold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                    <li><a href="#" className="hover:text-pink-400">Services</a></li>
                    <li><a href="#" className="hover:text-pink-400">For Adolescents</a></li>
                    <li><a href="#" className="hover:text-pink-400">Pregnancy Support</a></li>
                    <li><a href="#" className="hover:text-pink-400">Queer Support</a></li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold mb-4">Contact</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                    <li>help@hermindmate.com</li>
                    <li>+91 98765 43210</li>
                    <li>Kerala, India</li>
                </ul>
            </div>
        </div>
        <div className="text-center border-t border-gray-800 pt-8 text-sm text-gray-500">
            &copy; 2025 HerMindmate. All rights reserved.
        </div>
    </footer>
);

/* --- MAIN LAYOUT --- */
export default function HerMindmatePage() {
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    const handleBookingClick = () => setIsBookingOpen(true);

    return (
        <main>
            <AnimatedBackground />
            <Navbar onBookingClick={handleBookingClick} />
            <Hero onBookingClick={handleBookingClick} />
            <HowItWorks />
            <StatsTicker />
            <MissionSection />
            <Services />
            <Testimonials />
            <TeamSection />
            <BlogPreview />
            <div id="faq">
                <FAQ />
            </div>
            <div id="contact">
                <ContactForm />
            </div>
            <Footer />

            {/* Booking Modal */}
            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
            />
        </main>
    );
}
