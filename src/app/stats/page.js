"use client";

import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useAppContext } from '@/context/AppContext';
import { BarChart2 } from 'lucide-react';

export default function StatsPage() {
    const { timeline } = useAppContext();
    const [mounted, setMounted] = useState(false);

    // Prevent recharts hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    const counts = timeline.reduce((acc, curr) => {
        acc[curr.type] = (acc[curr.type] || 0) + 1;
        return acc;
    }, { Call: 0, Text: 0, Video: 0 });

    const data = [
        { name: 'Call', value: counts.Call, color: '#3B82F6' }, // blue-500
        { name: 'Text', value: counts.Text, color: '#4F46E5' }, // indigo-600
        { name: 'Video', value: counts.Video, color: '#9333EA' }, // purple-600
    ].filter(item => item.value > 0);

    const totalInteractions = data.reduce((sum, item) => sum + item.value, 0);

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 border border-gray-100 shadow-lg rounded-xl">
                    <p className="font-semibold text-gray-900">{payload[0].name}</p>
                    <p className="text-sm text-gray-600">
                        {payload[0].value} interaction{payload[0].value !== 1 ? 's' : ''}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-200">
                <div className="bg-blue-100 p-2.5 rounded-xl text-blue-600">
                    <BarChart2 size={24} />
                </div>
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Friendship Analytics</h1>
                    <p className="text-gray-500 mt-1">Insights into how you communicate with your friends.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Interaction Breakdown Card */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Interaction Breakdown</h2>
                        <p className="text-sm text-gray-500">Distribution of your check-in methods.</p>
                    </div>

                    <div className="flex-grow flex items-center justify-center min-h-[300px]">
                        {mounted && timeline.length > 0 ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={data}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend
                                        verticalAlign="bottom"
                                        height={36}
                                        iconType="circle"
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : mounted && timeline.length === 0 ? (
                            <div className="text-center text-gray-400">
                                <p>No interactions logged yet.</p>
                            </div>
                        ) : (
                            <div className="w-12 h-12 border-4 border-gray-100 border-t-blue-500 rounded-full animate-spin"></div>
                        )}
                    </div>
                </div>

                {/* Summary Stats Card */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl shadow-md text-white">
                        <h3 className="text-blue-100 font-medium mb-2 uppercase tracking-wide text-sm">Total Interactions</h3>
                        <div className="text-5xl font-extrabold mb-4">{totalInteractions}</div>
                        <p className="text-blue-100 text-sm">Keep up the great work nurturing your relationships!</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                            <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Top Method</span>
                            <span className="block text-xl font-bold text-gray-900">
                                {totalInteractions > 0
                                    ? [...data].sort((a, b) => b.value - a.value)[0].name
                                    : 'N/A'}
                            </span>
                        </div>
                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                            <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Active Friends</span>
                            <span className="block text-xl font-bold text-gray-900">
                                {new Set(timeline.map(t => t.friendId)).size}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
