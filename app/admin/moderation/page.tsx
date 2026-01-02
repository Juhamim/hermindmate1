'use client';

import React, { useState } from 'react';
import { AlertTriangle, Ban, CheckCircle, Search } from 'lucide-react';

type Report = {
    id: number;
    message: string;
    reportedBy: string;
    reason: string;
    timestamp: string;
    severity: 'Low' | 'Medium' | 'High';
};

const initialReports: Report[] = [
    {
        id: 1,
        message: "I'm feeling really anxious about my upcoming exams...",
        reportedBy: "Anonymous User #4521",
        reason: "Spam/Inappropriate Content",
        timestamp: "2 hours ago",
        severity: "Low"
    },
    {
        id: 2,
        message: "Can someone help me with relationship advice?",
        reportedBy: "Anonymous User #7834",
        reason: "Off-topic discussion",
        timestamp: "5 hours ago",
        severity: "Medium"
    },
    {
        id: 3,
        message: "Feeling hopeless and don't know what to do...",
        reportedBy: "Anonymous User #2341",
        reason: "Potential self-harm risk",
        timestamp: "1 day ago",
        severity: "High"
    }
];

export default function ModerationPage() {
    const [reports, setReports] = useState<Report[]>(initialReports);

    const handleDismiss = (id: number) => {
        if (confirm('Are you sure you want to dismiss this report?')) {
            setReports(reports.filter(r => r.id !== id));
        }
    };

    const handleBan = (id: number) => {
        if (confirm('Are you sure you want to ban this user? This action cannot be undone.')) {
            setReports(reports.filter(r => r.id !== id));
            alert('User has been banned from the platform.');
        }
    };

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'High': return 'bg-red-100 text-red-600';
            case 'Medium': return 'bg-orange-100 text-orange-600';
            case 'Low': return 'bg-yellow-100 text-yellow-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Community Moderation</h1>
                <p className="text-gray-500">Review and manage reported content from the anonymous chat</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-red-100 p-2 rounded-lg">
                            <AlertTriangle className="text-red-600" size={20} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">{reports.length}</h3>
                    </div>
                    <p className="text-sm text-gray-500">Pending Reports</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-green-100 p-2 rounded-lg">
                            <CheckCircle className="text-green-600" size={20} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">24</h3>
                    </div>
                    <p className="text-sm text-gray-500">Resolved Today</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-gray-100 p-2 rounded-lg">
                            <Ban className="text-gray-600" size={20} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">3</h3>
                    </div>
                    <p className="text-sm text-gray-500">Users Banned</p>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-6 flex items-center gap-3">
                <Search className="text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Search reports..."
                    className="flex-1 outline-none text-gray-600"
                />
            </div>

            {/* Reports Feed */}
            <div className="space-y-4">
                {reports.map((report) => (
                    <div key={report.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getSeverityColor(report.severity)}`}>
                                        {report.severity} Priority
                                    </span>
                                    <span className="text-sm text-gray-500">{report.timestamp}</span>
                                </div>
                                <p className="text-gray-900 font-medium mb-2">{report.message}</p>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <span>Reported by: <strong>{report.reportedBy}</strong></span>
                                    <span>•</span>
                                    <span>Reason: <strong>{report.reason}</strong></span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4 border-t border-gray-100">
                            <button
                                onClick={() => handleDismiss(report.id)}
                                className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-gray-700 transition"
                            >
                                Dismiss Report
                            </button>
                            <button
                                onClick={() => handleBan(report.id)}
                                className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition flex items-center justify-center gap-2"
                            >
                                <Ban size={16} />
                                Ban User
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {reports.length === 0 && (
                <div className="bg-white p-12 rounded-2xl border border-gray-100 shadow-sm text-center">
                    <CheckCircle className="mx-auto mb-4 text-green-500" size={48} />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">All Clear!</h3>
                    <p className="text-gray-500">No pending reports at the moment.</p>
                </div>
            )}
        </div>
    );
}
