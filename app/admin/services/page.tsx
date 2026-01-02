'use client';

import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, X, Heart, Brain, Baby, Shield, Sparkles } from 'lucide-react';

type Service = {
    id: number;
    title: string;
    description: string;
    icon: string;
    color: string;
};

const iconMap: Record<string, any> = {
    Heart, Brain, Baby, Shield, Sparkles
};

const initialServices: Service[] = [
    {
        id: 1,
        title: "Clinical Psychology",
        description: "Evidence-based therapy for depression, anxiety, and trauma",
        icon: "Brain",
        color: "#FFB7B2"
    },
    {
        id: 2,
        title: "Adolescent Care",
        description: "Specialized support for teens navigating identity and peer pressure",
        icon: "Sparkles",
        color: "#C7CEEA"
    },
    {
        id: 3,
        title: "Pregnancy Support",
        description: "Mental health care during pregnancy and postpartum",
        icon: "Baby",
        color: "#E8D5F2"
    }
];

export default function ServicesPage() {
    const [services, setServices] = useState<Service[]>(initialServices);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [formData, setFormData] = useState({
        title: '', description: '', icon: 'Heart', color: '#FFB7B2'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingService) {
            setServices(services.map(s => s.id === editingService.id ? { ...formData, id: s.id } : s));
        } else {
            setServices([...services, { ...formData, id: Date.now() }]);
        }
        closeModal();
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingService(null);
        setFormData({ title: '', description: '', icon: 'Heart', color: '#FFB7B2' });
    };

    const handleEdit = (service: Service) => {
        setEditingService(service);
        setFormData(service);
        setIsModalOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this service?')) {
            setServices(services.filter(s => s.id !== id));
        }
    };

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Service Management</h1>
                    <p className="text-gray-500">Manage the services offered on the platform</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-pink-500 transition shadow-lg"
                >
                    <Plus size={20} /> Add Service
                </button>
            </div>

            {/* Search */}
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-6 flex items-center gap-3">
                <Search className="text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Search services..."
                    className="flex-1 outline-none text-gray-600"
                />
            </div>

            {/* Services List */}
            <div className="space-y-4">
                {services.map((service) => {
                    const IconComponent = iconMap[service.icon] || Heart;

                    return (
                        <div key={service.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition flex items-center gap-6">
                            <div
                                className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                                style={{ backgroundColor: service.color + '20' }}
                            >
                                <IconComponent size={32} style={{ color: service.color }} />
                            </div>

                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-900 mb-1">{service.title}</h3>
                                <p className="text-gray-600">{service.description}</p>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(service)}
                                    className="p-3 hover:bg-gray-100 rounded-lg text-gray-600"
                                >
                                    <Edit2 size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(service.id)}
                                    className="p-3 hover:bg-red-50 rounded-lg text-gray-600 hover:text-red-500"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-xl font-bold">{editingService ? 'Edit' : 'Add'} Service</h2>
                            <button onClick={closeModal}><X className="text-gray-400 hover:text-red-500" /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Service Title *</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-pink-300"
                                    placeholder="Clinical Psychology"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Short Description *</label>
                                <textarea
                                    required
                                    rows={3}
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-pink-300"
                                    placeholder="Brief description of the service..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Icon</label>
                                    <select
                                        value={formData.icon}
                                        onChange={e => setFormData({ ...formData, icon: e.target.value })}
                                        className="w-full p-4 rounded-xl border border-gray-200 outline-none bg-white"
                                    >
                                        <option value="Heart">Heart</option>
                                        <option value="Brain">Brain</option>
                                        <option value="Baby">Baby</option>
                                        <option value="Shield">Shield</option>
                                        <option value="Sparkles">Sparkles</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Color Theme</label>
                                    <input
                                        type="color"
                                        value={formData.color}
                                        onChange={e => setFormData({ ...formData, color: e.target.value })}
                                        className="w-full h-14 rounded-xl border border-gray-200 cursor-pointer"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4 border-t border-gray-100">
                                <button type="button" onClick={closeModal} className="flex-1 py-3 font-bold text-gray-500 hover:bg-gray-50 rounded-xl transition">
                                    Cancel
                                </button>
                                <button type="submit" className="flex-1 bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-pink-500 transition shadow-lg">
                                    {editingService ? 'Update' : 'Add'} Service
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
