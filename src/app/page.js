"use client";

import React from 'react';
import Link from 'next/link';
import Image from "next/image";

import { Plus, Users, AlertCircle, Clock, CheckCircle } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

export default function HomePage() {
  const { friends, isLoading } = useAppContext();

  // Calculate stats for summary cards
  const totalFriends = friends.length;
  const overdueCount = friends.filter(f => f.status === 'overdue').length;
  const almostDueCount = friends.filter(f => f.status === 'almost due').length;
  const onTrackCount = friends.filter(f => f.status === 'on-track').length;

  const getStatusColor = (status) => {
    switch (status) {
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      case 'almost due': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'on-track': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusDot = (status) => {
    switch (status) {
      case 'overdue': return 'bg-red-500';
      case 'almost due': return 'bg-amber-500';
      case 'on-track': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Banner Section */}
      <section className="text-center space-y-6 pt-8 pb-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          Friends to keep close in your life
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the
          relationships that matter most.
        </p>
        <div className="pt-2">
          <button className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-full transition-colors shadow-sm">
            <Plus size={20} />
            <span>Add a Friend</span>
          </button>
        </div>
      </section>

      {/* Summary Cards */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
          <div className="bg-blue-50 p-3 rounded-full mb-3 text-blue-600">
            <Users size={24} />
          </div>
          <h3 className="text-3xl font-bold text-gray-900">{totalFriends}</h3>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mt-1">Total Friends</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
          <div className="bg-red-50 p-3 rounded-full mb-3 text-red-600">
            <AlertCircle size={24} />
          </div>
          <h3 className="text-3xl font-bold text-gray-900">{overdueCount}</h3>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mt-1">Overdue</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
          <div className="bg-amber-50 p-3 rounded-full mb-3 text-amber-600">
            <Clock size={24} />
          </div>
          <h3 className="text-3xl font-bold text-gray-900">{almostDueCount}</h3>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mt-1">Almost Due</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
          <div className="bg-green-50 p-3 rounded-full mb-3 text-green-600">
            <CheckCircle size={24} />
          </div>
          <h3 className="text-3xl font-bold text-gray-900">{onTrackCount}</h3>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mt-1">On Track</p>
        </div>
      </section>

      {/* Friends Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Your Friends</h2>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 translate-z-0">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500 font-medium animate-pulse">Loading amazing people...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {friends.map(friend => (
              <Link
                href={`/friend/${friend.id}`}
                key={friend.id}
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col h-full transform hover:-translate-y-1"
              >
                <div className={`h-2 w-full ${getStatusDot(friend.status)}`}></div>
                <div className="p-5 flex-grow flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <Image
                      src={friend.picture}
                      alt={friend.name}
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-sm"
                    />
                    <div className={`absolute bottom-0 right-0 w-5 h-5 rounded-full border-2 border-white ${getStatusDot(friend.status)}`}></div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{friend.name}</h3>

                  <div className="flex gap-2 flex-wrap justify-center mb-4 mt-2">
                    {friend.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto w-full pt-4 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      {friend.days_since_contact} days ago
                    </span>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-md border ${getStatusColor(friend.status)} capitalize`}>
                      {friend.status}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
