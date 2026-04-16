"use client";

import React, { useState } from 'react';
import { Phone, MessageSquare, Video, Filter, Clock } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

export default function TimelinePage() {
    const { timeline, friends } = useAppContext();
    const [filter, setFilter] = useState('All'); // 'All', 'Call', 'Text', 'Video'

    const filteredTimeline = timeline.filter(entry =>
        filter === 'All' ? true : entry.type === filter
    );

    // Optional Requirement: Sort by date (newest first). Already handle in context push, but let's be explicit
    const sortedTimeline = [...filteredTimeline].sort((a, b) => new Date(b.date) - new Date(a.date));

    const getIcon = (type) => {
        switch (type) {
            case 'Call': return <Phone size={20} />;
            case 'Text': return <MessageSquare size={20} />;
            case 'Video': return <Video size={20} />;
            default: return <Clock size={20} />;
        }
    };

    const getColorClass = (type) => {
        switch (type) {
            case 'Call': return 'bg-blue-100 text-blue-600 border-blue-200';
            case 'Text': return 'bg-indigo-100 text-indigo-600 border-indigo-200';
            case 'Video': return 'bg-purple-100 text-purple-600 border-purple-200';
            default: return 'bg-gray-100 text-gray-600 border-gray-200';
        }
    };

    const getFriendImage = (friendId) => {
        const friend = friends.find(f => f.id === friendId);
        return friend ? friend.picture : null;
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-6 border-b border-gray-200">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">Timeline</h1>
                    <p className="text-gray-500">History of all your interactions.</p>
                </div>

                {/* Timeline Filter (Challenge C2) */}
                <div className="mt-4 sm:mt-0 flex items-center bg-gray-100 p-1 rounded-xl shadow-inner">
                    <div className="px-3 py-1 flex items-center text-gray-400">
                        <Filter size={16} />
                    </div>
                    {['All', 'Call', 'Text', 'Video'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${filter === f
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="relative">
                {/* Vertical line through the timeline */}
                <div className="absolute top-0 bottom-0 left-8 md:left-24 w-0.5 bg-gray-200"></div>

                <div className="space-y-8">
                    {sortedTimeline.length === 0 ? (
                        <div className="text-center py-12 pl-8 md:pl-24 bg-white rounded-2xl shadow-sm border border-gray-100 mt-8">
                            <span className="text-gray-400">No interactions found for {filter !== 'All' ? filter : 'any'} type.</span>
                        </div>
                    ) : (
                        sortedTimeline.map((entry, index) => {
                            const picture = getFriendImage(entry.friendId);
                            const isToday = new Date(entry.date).toDateString() === new Date().toDateString();

                            return (
                                <div key={entry.id} className="relative flex items-start group">
                                    {/* Date label on the left (md and up) */}
                                    <div className="hidden md:block w-24 pt-2 pr-6 text-right">
                                        <span className="text-sm font-semibold text-gray-500">
                                            {isToday ? 'Today' : new Date(entry.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                        </span>
                                        <div className="text-xs text-gray-400">
                                            {new Date(entry.date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>

                                    {/* Icon Node */}
                                    <div className={`absolute left-8 md:left-24 -ml-4 mt-1 w-8 h-8 rounded-full border-2 border-white flex items-center justify-center shadow-sm z-10 transition-transform group-hover:scale-110 ${getColorClass(entry.type)}`}>
                                        {getIcon(entry.type)}
                                    </div>

                                    {/* Content Card */}
                                    <div className="ml-16 md:ml-32 bg-white p-4 sm:p-5 flex-grow rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-3">
                                                {picture && (
                                                    <img src={picture} alt="Avatar" className="w-8 h-8 rounded-full shadow-sm" />
                                                )}
                                                <h3 className="font-bold text-gray-900 text-lg">{entry.title}</h3>
                                            </div>
                                            <span className={`px-2.5 py-1 text-xs font-semibold rounded-md border ${getColorClass(entry.type)}`}>
                                                {entry.type}
                                            </span>
                                        </div>

                                        {/* Date label for small screens */}
                                        <div className="md:hidden mt-2 text-xs text-gray-500 flex items-center gap-1">
                                            <Clock size={12} />
                                            <span>{new Date(entry.date).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}
