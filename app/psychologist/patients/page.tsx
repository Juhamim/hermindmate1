'use client';

import React, { useState, useEffect } from 'react';
import { Users, Search, FileText, Mail, Phone } from 'lucide-react';

type Patient = {
    name: string;
    email: string;
    phone: string;
    totalSessions: number;
    lastSession: string;
};

export default function PatientsPage() {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [patientNotes, setPatientNotes] = useState<any[]>([]);

    useEffect(() => {
        fetchPatients();
    }, []);

    useEffect(() => {
        filterPatients();
    }, [patients, searchTerm]);

    const fetchPatients = async () => {
        try {
            const response = await fetch('/api/psychologist/patients');
            const data = await response.json();
            if (data.patients) {
                setPatients(data.patients);
            }
        } catch (error) {
            console.error('Error fetching patients:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterPatients = () => {
        if (!searchTerm) {
            setFilteredPatients(patients);
            return;
        }

        const filtered = patients.filter(
            (patient) =>
                patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                patient.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPatients(filtered);
    };

    const viewPatientNotes = async (patient: Patient) => {
        setSelectedPatient(patient);
        // Fetch notes for this patient
        try {
            const response = await fetch(`/api/session-notes?email=${encodeURIComponent(patient.email)}`);
            const data = await response.json();
            setPatientNotes(data.sessionNotes || []);
        } catch (error) {
            console.error('Error fetching patient notes:', error);
        }
    };

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Patient Records</h1>
                    <p className="text-gray-500">View patient history and session notes</p>
                </div>
                <div className="text-2xl font-bold text-purple-600">
                    {filteredPatients.length} Patients
                </div>
            </div>

            {/* Search */}
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-6 flex items-center gap-3">
                <Search className="text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Search patients by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 outline-none text-gray-600"
                />
            </div>

            {/* Patients List */}
            {loading ? (
                <div className="text-center py-12 text-gray-500">Loading patients...</div>
            ) : filteredPatients.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
                    <Users className="mx-auto mb-4 text-gray-400" size={64} />
                    <p className="text-gray-500">No patients found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPatients.map((patient, idx) => (
                        <div
                            key={idx}
                            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition cursor-pointer"
                            onClick={() => viewPatientNotes(patient)}
                        >
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                                    <span className="text-purple-600 font-bold text-lg">
                                        {patient.name.charAt(0)}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-900">{patient.name}</h3>
                                    <p className="text-sm text-gray-500">{patient.totalSessions} sessions</p>
                                </div>
                            </div>

                            <div className="space-y-2 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <Mail size={14} />
                                    <span className="truncate">{patient.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone size={14} />
                                    <span>{patient.phone}</span>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
                                Last session: {new Date(patient.lastSession).toLocaleDateString()}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Patient Details Modal */}
            {selectedPatient && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-start">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{selectedPatient.name}</h2>
                                <p className="text-gray-500 mt-1">{selectedPatient.email}</p>
                                <p className="text-sm text-gray-500">{selectedPatient.phone}</p>
                            </div>
                            <button
                                onClick={() => setSelectedPatient(null)}
                                className="text-gray-400 hover:text-red-500 text-2xl"
                            >
                                ×
                            </button>
                        </div>

                        <div className="p-6">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <FileText size={20} />
                                Session History ({selectedPatient.totalSessions} sessions)
                            </h3>

                            {patientNotes.length === 0 ? (
                                <p className="text-gray-500 text-center py-8">No session notes available</p>
                            ) : (
                                <div className="space-y-4">
                                    {patientNotes.map((note) => (
                                        <div
                                            key={note.id}
                                            className="bg-gray-50 p-4 rounded-xl border border-gray-200"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-bold text-gray-700">
                                                    {new Date(note.createdAt).toLocaleDateString()}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    {new Date(note.createdAt).toLocaleTimeString()}
                                                </span>
                                            </div>
                                            <p className="text-gray-700">{note.notes}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
