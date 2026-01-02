'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Upload, X, ToggleLeft, ToggleRight } from 'lucide-react';

type Doctor = {
    id: string;
    name: string;
    role: string;
    bio: string;
    fee: number;
    photo: string;
    status: 'Active' | 'On Leave';
};

const fallbackDoctors: Doctor[] = [
    {
        id: '1',
        name: "Dr. Lakshmi Nair",
        role: "Clinical Psychologist",
        bio: "Specializing in postpartum depression and women's mental health",
        fee: 1500,
        photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=100",
        status: "Active"
    },
    {
        id: '2',
        name: "Dr. Priya Kumar",
        role: "Psychiatrist",
        bio: "Expert in adolescent mental health and anxiety disorders",
        fee: 2000,
        photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100",
        status: "Active"
    }
];

export default function DoctorsPage() {
    const [doctors, setDoctors] = useState<Doctor[]>(fallbackDoctors);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
    const [formData, setFormData] = useState({
        name: '', role: '', bio: '', fee: 1500, photo: '', status: 'Active' as 'Active' | 'On Leave'
    });
    const [loading, setLoading] = useState(true);

    // Fetch doctors from database
    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/doctors');
            const data = await response.json();
            if (data.doctors && data.doctors.length > 0) {
                setDoctors(data.doctors);
            }
        } catch (error) {
            console.error('Error fetching doctors:', error);
            // Keep fallback data if API fails
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingDoctor) {
                // Update existing doctor
                await fetch('/api/doctors', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...formData, id: editingDoctor.id }),
                });
            } else {
                // Create new doctor
                await fetch('/api/doctors', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
            }
            fetchDoctors(); // Refresh list
            closeModal();
        } catch (error) {
            console.error('Error saving doctor:', error);
            alert('Failed to save doctor. Please try again.');
        }
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setEditingDoctor(null);
        setFormData({ name: '', role: '', bio: '', fee: 1500, photo: '', status: 'Active' });
    };

    const handleEdit = (doctor: Doctor) => {
        setEditingDoctor(doctor);
        setFormData(doctor);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this specialist?')) {
            try {
                await fetch(`/api/doctors?id=${id}`, {
                    method: 'DELETE',
                });
                fetchDoctors(); // Refresh list
            } catch (error) {
                console.error('Error deleting doctor:', error);
                alert('Failed to delete doctor. Please try again.');
            }
        }
    };

    const toggleStatus = async (doctor: Doctor) => {
        try {
            const newStatus = doctor.status === 'Active' ? 'On Leave' : 'Active';
            await fetch('/api/doctors', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...doctor, status: newStatus }),
            });
            fetchDoctors(); // Refresh list
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status. Please try again.');
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setFormData({ ...formData, photo: URL.createObjectURL(e.target.files[0]) });
        }
    };

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Specialist Management</h1>
                    <p className="text-gray-500">Manage therapists and counselors on the platform</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-pink-500 transition shadow-lg"
                >
                    <Plus size={20} /> Add Specialist
                </button>
            </div>

            {/* Search */}
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-6 flex items-center gap-3">
                <Search className="text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Search specialists..."
                    className="flex-1 outline-none text-gray-600"
                />
            </div>

            {/* Doctors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.map((doctor) => (
                    <div key={doctor.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
                        <div className="flex items-start gap-4 mb-4">
                            <img
                                src={doctor.photo}
                                alt={doctor.name}
                                className="w-16 h-16 rounded-full object-cover"
                            />
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-900">{doctor.name}</h3>
                                <p className="text-sm text-gray-500">{doctor.role}</p>
                                <span className={`inline-flex items-center gap-1 mt-1 text-xs font-bold ${doctor.status === 'Active' ? 'text-green-600' : 'text-orange-500'
                                    }`}>
                                    <span className={`w-2 h-2 rounded-full ${doctor.status === 'Active' ? 'bg-green-500' : 'bg-orange-500'
                                        }`} />
                                    {doctor.status}
                                </span>
                            </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{doctor.bio}</p>

                        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                            <span className="text-sm text-gray-500">Consultation Fee</span>
                            <span className="text-lg font-bold text-gray-900">₹{doctor.fee}</span>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => toggleStatus(doctor)}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-700 transition"
                            >
                                {doctor.status === 'Active' ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                                Toggle Status
                            </button>
                            <button
                                onClick={() => handleEdit(doctor)}
                                className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                            >
                                <Edit2 size={16} />
                            </button>
                            <button
                                onClick={() => handleDelete(doctor.id)}
                                className="p-2 hover:bg-red-50 rounded-lg text-gray-600 hover:text-red-500"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                            <h2 className="text-xl font-bold">{editingDoctor ? 'Edit' : 'Add'} Specialist</h2>
                            <button onClick={closeModal}><X className="text-gray-400 hover:text-red-500" /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            {/* Photo Upload */}
                            <div className="flex justify-center">
                                <div className="relative">
                                    <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                                        {formData.photo ? (
                                            <img src={formData.photo} className="w-full h-full object-cover" alt="Preview" />
                                        ) : (
                                            <Upload className="text-gray-400" size={32} />
                                        )}
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Full Name *</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-pink-300"
                                    placeholder="Dr. Priya Sharma"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Role *</label>
                                <select
                                    required
                                    value={formData.role}
                                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                                    className="w-full p-4 rounded-xl border border-gray-200 outline-none bg-white"
                                >
                                    <option value="">Select role</option>
                                    <option>Clinical Psychologist</option>
                                    <option>Psychiatrist</option>
                                    <option>Counselor</option>
                                    <option>Therapist</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Bio *</label>
                                <textarea
                                    required
                                    rows={3}
                                    value={formData.bio}
                                    onChange={e => setFormData({ ...formData, bio: e.target.value })}
                                    className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-pink-300"
                                    placeholder="Brief description of expertise..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Consultation Fee (₹) *</label>
                                <input
                                    required
                                    type="number"
                                    value={formData.fee}
                                    onChange={e => setFormData({ ...formData, fee: Number(e.target.value) })}
                                    className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-pink-300"
                                    placeholder="1500"
                                />
                            </div>

                            <div className="flex gap-4 pt-4 border-t border-gray-100">
                                <button type="button" onClick={closeModal} className="flex-1 py-3 font-bold text-gray-500 hover:bg-gray-50 rounded-xl transition">
                                    Cancel
                                </button>
                                <button type="submit" className="flex-1 bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-pink-500 transition shadow-lg">
                                    {editingDoctor ? 'Update' : 'Add'} Specialist
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
