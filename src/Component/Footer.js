import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex flex-col items-center md:items-start">
                        <span className="font-bold text-lg text-gray-900 tracking-tight">KeenKeeper</span>
                        <p className="text-sm text-gray-500 mt-1">Keep Your Friendships Alive</p>
                    </div>

                    <div className="text-sm text-gray-500 text-center md:text-right">
                        &copy; {new Date().getFullYear()} KeenKeeper. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}
