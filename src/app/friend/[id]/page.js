"use client";

import React, { use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import toast from 'react-hot-toast';
import {
    ArrowLeft, Phone, MessageSquare, Video,
    Calendar, Clock, Target, CalendarDays,
    BellRing, Archive, Trash2, Edit2
} from 'lucide-react';

export default function FriendDetailsPage({ params }) {
    const router = useRouter();
    const { friends, addTimelineEntry, isLoading } = useAppContext();

    // React.use to unwrap Promise params in Next 15 component
    const { id } = use(params);

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    const friendId = parseInt(id, 10);
    const friend = friends.find(f => f.id === friendId);

    if (!friend) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Friend Not Found</h2>
                <Link href="/" className="text-blue-600 hover:underline">Return to Home</Link>
            </div>
        );
    }

    const handleAction = (type) => {
        addTimelineEntry(friendId, type, `${type} with ${friend.name.split(' ')[0]}`);
        toast.success(`Logged ${type} with ${friend.name}`);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
            case 'almost due': return 'bg-amber-100 text-amber-800 border-amber-200';
            case 'on-track': return 'bg-green-100 text-green-800 border-green-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 transition-colors">
                <ArrowLeft size={16} />
                <span>Back to Directory</span>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column — Friend Info Card */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-24"></div>
                        <div className="px-6 pb-6 relative">
                            <div className="flex justify-center -mt-12 mb-4">
                                <img
                                    src={friend.picture}
                                    alt={friend.name}
                                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md bg-white"
                                />
                            </div>

                            <div className="text-center space-y-1 mb-6">
                                <h1 className="text-2xl font-bold text-gray-900">{friend.name}</h1>
                                <p className="text-gray-500 text-sm">{friend.email}</p>
                                <div className="pt-2">
                                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border capitalize ${getStatusColor(friend.status)}`}>
                                        {friend.status}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Tags</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {friend.tags.map(tag => (
                                            <span key={tag} className="px-2.5 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-md">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Bio</h4>
                                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg leading-relaxed">
                                        {friend.bio}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <button className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white border border-gray-200 rounded-xl text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm">
                            <BellRing size={18} />
                            <span>Snooze 2 Weeks</span>
                        </button>
                        <button className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white border border-gray-200 rounded-xl text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm">
                            <Archive size={18} />
                            <span>Archive</span>
                        </button>
                        <button className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-semibold hover:bg-red-100 transition-colors shadow-sm">
                            <Trash2 size={18} />
                            <span>Delete Friend</span>
                        </button>
                    </div>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-2 space-y-6">

                    {/* ① Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                            <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
                                <Clock size={24} />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase">Last Contact</p>
                                <p className="text-xl font-bold text-gray-900">{friend.days_since_contact} days ago</p>
                            </div>
                        </div>

                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                            <div className="bg-indigo-50 p-3 rounded-xl text-indigo-600">
                                <Target size={24} />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase">Goal</p>
                                <p className="text-xl font-bold text-gray-900">Every {friend.goal} days</p>
                            </div>
                        </div>

                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                            <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600">
                                <CalendarDays size={24} />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase">Next Due</p>
                                <p className="text-xl font-bold text-gray-900">{new Date(friend.next_due_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</p>
                            </div>
                        </div>
                    </div>

                    {/* ② Relationship Goal Card */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="bg-purple-50 p-3 rounded-xl text-purple-600">
                                <Target size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg">Relationship Goal</h3>
                                <p className="text-gray-500 text-sm">Stay in touch every <span className="font-semibold text-gray-700">{friend.goal} days</span></p>
                            </div>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                            <Edit2 size={16} />
                            <span className="hidden sm:inline">Edit Goal</span>
                        </button>
                    </div>

                    {/* ③ Quick Check-In Card */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="mb-6">
                            <h3 className="font-bold text-gray-900 text-lg">Quick Check-In</h3>
                            <p className="text-gray-500 text-sm">Log an interaction to update the timeline and reset your goal.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <button
                                onClick={() => handleAction('Call')}
                                className="group flex flex-col items-center justify-center p-6 border-2 border-transparent bg-blue-50 hover:bg-blue-600 hover:text-white hover:shadow-md rounded-2xl transition-all duration-300"
                            >
                                <Phone size={32} className="mb-3 text-blue-600 group-hover:text-white" />
                                <span className="font-semibold text-blue-900 group-hover:text-white">Log Call</span>
                            </button>

                            <button
                                onClick={() => handleAction('Text')}
                                className="group flex flex-col items-center justify-center p-6 border-2 border-transparent bg-indigo-50 hover:bg-indigo-600 hover:text-white hover:shadow-md rounded-2xl transition-all duration-300"
                            >
                                <MessageSquare size={32} className="mb-3 text-indigo-600 group-hover:text-white" />
                                <span className="font-semibold text-indigo-900 group-hover:text-white">Log Text</span>
                            </button>

                            <button
                                onClick={() => handleAction('Video')}
                                className="group flex flex-col items-center justify-center p-6 border-2 border-transparent bg-purple-50 hover:bg-purple-600 hover:text-white hover:shadow-md rounded-2xl transition-all duration-300"
                            >
                                <Video size={32} className="mb-3 text-purple-600 group-hover:text-white" />
                                <span className="font-semibold text-purple-900 group-hover:text-white">Log Video</span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
