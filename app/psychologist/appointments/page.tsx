'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Search, Filter, Plus, FileText, CheckCircle, XCircle } from 'lucide-react';

type Booking = {
    id: string;
    service: string;
    date: string;
    time: string;
    name: string;
    email: string;
    phone: string;
    status: string;
    notes?: string | null;
};

export default function AppointmentsPage() {
    const [appointments, setAppointments] = useState<Booking[]>([]);
    const [filteredAppointments, setFilteredAppointments] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAppointment, setSelectedAppointment] = useState<Booking | null>(null);
    const [noteModalOpen, setNoteModalOpen] = useState(false);
    const [sessionNote, setSessionNote] = useState('');

    useEffect(() => {
        fetchAppointments();
    }, []);

    useEffect(() => {
        filterAppointments();
    }, [appointments, statusFilter, searchTerm]);

    const fetchAppointments = async () => {
        try {
            const response = await fetch('/api/psychologist/appointments');
            const data = await response.json();
            if (data.appointments) {
                setAppointments(data.appointments);
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterAppointments = () => {
        let filtered = appointments;

        if (statusFilter !== 'all') {
            filtered = filtered.filter((apt) => apt.status === statusFilter);
        }

        if (searchTerm) {
            filtered = filtered.filter(
                (apt) =>
                    apt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    apt.service.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredAppointments(filtered);
    };

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            await fetch(`/api/bookings/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            fetchAppointments();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const openNoteModal = (appointment: Booking) => {
        setSelectedAppointment(appointment);
        setNoteModalOpen(true);
    };

    const saveNote = async () => {
        if (!selectedAppointment || !sessionNote) return;

        try {
            await fetch('/api/session-notes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    bookingId: selectedAppointment.id,
                    notes: sessionNote,
                }),
            });
            setNoteModalOpen(false);
            setSessionNote('');
            alert('Session note saved successfully!');
        } catch (error) {
            console.error('Error saving note:', error);
            alert('Failed to save note');
        }
    };

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
                    <p className="text-gray-500">Manage your schedule and sessions</p>
                </div>
                <div className="text-2xl font-bold text-purple-600">
                    {filteredAppointments.length} Total
                </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row gap-4">
                <div className="flex-1 flex items-center gap-3">
                    <Search className="text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by patient name or service..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 outline-none text-gray-600"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="text-gray-400" size={20} />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 rounded-lg border border-gray-200 outline-none bg-white"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            {/* Appointments List */}
            {loading ? (
                <div className="text-center py-12 text-gray-500">Loading appointments...</div>
            ) : filteredAppointments.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
                    <Calendar className="mx-auto mb-4 text-gray-400" size={64} />
                    <p className="text-gray-500">No appointments found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {filteredAppointments.map((appointment) => (
                        <div
                            key={appointment.id}
                            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition"
                        >
                            <div className="flex flex-col md:flex-row gap-4">
                                {/* Date Badge */}
                                <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex flex-col items-center justify-center">
                                    <span className="text-2xl font-bold text-purple-600">
                                        {new Date(appointment.date).getDate()}
                                    </span>
                                    <span className="text-xs text-purple-600">
                                        {new Date(appointment.date).toLocaleDateString('en-US', { month: 'short' })}
                                    </span>
                                </div>

                                {/* Details */}
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">{appointment.name}</h3>
                                            <p className="text-sm text-gray-600">{appointment.service}</p>
                                        </div>
                                        <span
                                            className={`text-xs font-bold px-3 py-1 rounded-full ${appointment.status === 'confirmed'
                                                ? 'bg-green-100 text-green-600'
                                                : appointment.status === 'pending'
                                                    ? 'bg-yellow-100 text-yellow-600'
                                                    : appointment.status === 'completed'
                                                        ? 'bg-blue-100 text-blue-600'
                                                        : 'bg-gray-100 text-gray-600'
                                                }`}
                                        >
                                            {appointment.status}
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                                        <span className="flex items-center gap-1">
                                            <Clock size={16} />
                                            {appointment.time}
                                        </span>
                                        <span>{appointment.phone}</span>
                                        <span>{appointment.email}</span>
                                    </div>

                                    {appointment.notes && (
                                        <p className="text-sm text-gray-500 italic mb-3">
                                            Note: {appointment.notes}
                                        </p>
                                    )}

                                    {/* Actions */}
                                    <div className="flex flex-wrap gap-2">
                                        {appointment.status === 'pending' && (
                                            <button
                                                onClick={() => updateStatus(appointment.id, 'confirmed')}
                                                className="flex items-center gap-2 px-4 py-2 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg text-sm font-medium transition"
                                            >
                                                <CheckCircle size={16} />
                                                Confirm
                                            </button>
                                        )}
                                        {appointment.status === 'confirmed' && (
                                            <button
                                                onClick={() => updateStatus(appointment.id, 'completed')}
                                                className="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-sm font-medium transition"
                                            >
                                                <CheckCircle size={16} />
                                                Mark Complete
                                            </button>
                                        )}
                                        <button
                                            onClick={() => openNoteModal(appointment)}
                                            className="flex items-center gap-2 px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-600 rounded-lg text-sm font-medium transition"
                                        >
                                            <FileText size={16} />
                                            Add Note
                                        </button>
                                        {appointment.status !== 'cancelled' && (
                                            <button
                                                onClick={() => updateStatus(appointment.id, 'cancelled')}
                                                className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-medium transition"
                                            >
                                                <XCircle size={16} />
                                                Cancel
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Add Note Modal */}
            {noteModalOpen && selectedAppointment && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold">Add Session Note</h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Patient: {selectedAppointment.name}
                            </p>
                        </div>

                        <div className="p-8">
                            <textarea
                                value={sessionNote}
                                onChange={(e) => setSessionNote(e.target.value)}
                                rows={8}
                                className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-purple-300"
                                placeholder="Enter your session notes here..."
                            />
                        </div>

                        <div className="p-6 border-t border-gray-100 flex gap-4">
                            <button
                                onClick={() => {
                                    setNoteModalOpen(false);
                                    setSessionNote('');
                                }}
                                className="flex-1 py-3 font-bold text-gray-500 hover:bg-gray-50 rounded-xl transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={saveNote}
                                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-bold hover:from-purple-600 hover:to-pink-600 transition shadow-lg"
                            >
                                Save Note
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
