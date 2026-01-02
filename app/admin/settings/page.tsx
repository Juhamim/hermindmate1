'use client';

import React, { useState } from 'react';
import { Save, Bell, Lock, Globe, Palette, Mail } from 'lucide-react';

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        siteName: 'HerMindmate',
        siteEmail: 'admin@hermindmate.com',
        notificationsEnabled: true,
        emailNotifications: true,
        maintenanceMode: false,
        allowRegistration: true,
    });

    const handleSave = () => {
        alert('Settings saved successfully!');
    };

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-500">Manage platform configuration and preferences</p>
            </div>

            <div className="max-w-4xl space-y-6">
                {/* General Settings */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-purple-100 p-2 rounded-lg">
                            <Globe className="text-purple-600" size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">General Settings</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Site Name</label>
                            <input
                                type="text"
                                value={settings.siteName}
                                onChange={e => setSettings({ ...settings, siteName: e.target.value })}
                                className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:border-pink-300"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Admin Email</label>
                            <input
                                type="email"
                                value={settings.siteEmail}
                                onChange={e => setSettings({ ...settings, siteEmail: e.target.value })}
                                className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:border-pink-300"
                            />
                        </div>
                    </div>
                </div>

                {/* Notifications */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-blue-100 p-2 rounded-lg">
                            <Bell className="text-blue-600" size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div>
                                <p className="font-medium text-gray-900">Push Notifications</p>
                                <p className="text-sm text-gray-500">Receive notifications for new bookings</p>
                            </div>
                            <button
                                onClick={() => setSettings({ ...settings, notificationsEnabled: !settings.notificationsEnabled })}
                                className={`relative w-14 h-8 rounded-full transition ${settings.notificationsEnabled ? 'bg-pink-500' : 'bg-gray-300'
                                    }`}
                            >
                                <span className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition transform ${settings.notificationsEnabled ? 'translate-x-6' : ''
                                    }`} />
                            </button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div>
                                <p className="font-medium text-gray-900">Email Notifications</p>
                                <p className="text-sm text-gray-500">Receive email alerts for important events</p>
                            </div>
                            <button
                                onClick={() => setSettings({ ...settings, emailNotifications: !settings.emailNotifications })}
                                className={`relative w-14 h-8 rounded-full transition ${settings.emailNotifications ? 'bg-pink-500' : 'bg-gray-300'
                                    }`}
                            >
                                <span className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition transform ${settings.emailNotifications ? 'translate-x-6' : ''
                                    }`} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Security */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-red-100 p-2 rounded-lg">
                            <Lock className="text-red-600" size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">Security & Access</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div>
                                <p className="font-medium text-gray-900">Maintenance Mode</p>
                                <p className="text-sm text-gray-500">Temporarily disable public access</p>
                            </div>
                            <button
                                onClick={() => setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })}
                                className={`relative w-14 h-8 rounded-full transition ${settings.maintenanceMode ? 'bg-red-500' : 'bg-gray-300'
                                    }`}
                            >
                                <span className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition transform ${settings.maintenanceMode ? 'translate-x-6' : ''
                                    }`} />
                            </button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div>
                                <p className="font-medium text-gray-900">Allow User Registration</p>
                                <p className="text-sm text-gray-500">Enable new users to create accounts</p>
                            </div>
                            <button
                                onClick={() => setSettings({ ...settings, allowRegistration: !settings.allowRegistration })}
                                className={`relative w-14 h-8 rounded-full transition ${settings.allowRegistration ? 'bg-green-500' : 'bg-gray-300'
                                    }`}
                            >
                                <span className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition transform ${settings.allowRegistration ? 'translate-x-6' : ''
                                    }`} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <button
                    onClick={handleSave}
                    className="w-full bg-gray-900 text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-pink-500 transition shadow-lg"
                >
                    <Save size={20} />
                    Save All Settings
                </button>
            </div>
        </div>
    );
}
