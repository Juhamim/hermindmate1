'use client';

import React, { useState, useEffect } from 'react';
import { User, Mail, Briefcase, DollarSign, Save, Eye, EyeOff } from 'lucide-react';

export default function ProfilePage() {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        role: '',
        bio: '',
        fee: 0,
        photo: '',
        status: 'Active',
    });
    const [password, setPassword] = useState({
        current: '',
        new: '',
        confirm: '',
    });
    const [loading, setLoading] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await fetch('/api/psychologist/profile');
            const data = await response.json();
            if (data.profile) {
                setProfile(data.profile);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/psychologist/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profile),
            });

            if (response.ok) {
                setMessage('Profile updated successfully!');
                setTimeout(() => setMessage(''), 3000);
            } else {
                setMessage('Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage('Error updating profile');
        }
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password.new !== password.confirm) {
            setMessage('New passwords do not match');
            return;
        }

        try {
            const response = await fetch('/api/psychologist/change-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    currentPassword: password.current,
                    newPassword: password.new,
                }),
            });

            if (response.ok) {
                setMessage('Password changed successfully!');
                setPassword({ current: '', new: '', confirm: '' });
                setTimeout(() => setMessage(''), 3000);
            } else {
                setMessage('Failed to change password');
            }
        } catch (error) {
            console.error('Error changing password:', error);
            setMessage('Error changing password');
        }
    };

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading...</div>;
    }

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
                <p className="text-gray-500">Manage your professional profile and account settings</p>
            </div>

            {message && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-600">
                    {message}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Profile Information */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <User size={24} />
                        Professional Information
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={profile.name}
                                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-purple-300"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={profile.email}
                                disabled
                                className="w-full p-4 rounded-xl border border-gray-200 outline-none bg-gray-50 text-gray-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Specialization
                            </label>
                            <input
                                type="text"
                                value={profile.role}
                                onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                                className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-purple-300"
                                placeholder="Clinical Psychologist"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Professional Bio
                            </label>
                            <textarea
                                rows={4}
                                value={profile.bio}
                                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-purple-300"
                                placeholder="Brief description of your expertise and approach..."
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Consultation Fee (₹)
                            </label>
                            <input
                                type="number"
                                value={profile.fee}
                                onChange={(e) => setProfile({ ...profile, fee: Number(e.target.value) })}
                                className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-purple-300"
                                min="0"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-bold hover:from-purple-600 hover:to-pink-600 transition shadow-lg flex items-center justify-center gap-2"
                        >
                            <Save size={20} />
                            Save Changes
                        </button>
                    </form>
                </div>

                {/* Password Change */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Mail size={24} />
                        Change Password
                    </h2>

                    <form onSubmit={handlePasswordChange} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Current Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password.current}
                                    onChange={(e) => setPassword({ ...password, current: e.target.value })}
                                    className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-purple-300"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                New Password
                            </label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password.new}
                                onChange={(e) => setPassword({ ...password, new: e.target.value })}
                                className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-purple-300"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Confirm New Password
                            </label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password.confirm}
                                onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
                                className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-purple-300"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition shadow-lg"
                        >
                            Change Password
                        </button>
                    </form>

                    {/* Account Status */}
                    <div className="mt-8 p-4 bg-gray-50 rounded-xl">
                        <h3 className="font-bold text-gray-900 mb-2">Account Status</h3>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Availability</span>
                            <span
                                className={`px-3 py-1 rounded-full text-sm font-bold ${profile.status === 'Active'
                                    ? 'bg-green-100 text-green-600'
                                    : 'bg-gray-100 text-gray-600'
                                    }`}
                            >
                                {profile.status}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
