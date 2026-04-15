"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Clock, BarChart2, Shield } from 'lucide-react';

export default function Navbar() {
    const pathname = usePathname();

    const navLinks = [
        { name: 'Home', href: '/', icon: <Home size={18} /> },
        { name: 'Timeline', href: '/timeline', icon: <Clock size={18} /> },
        { name: 'Stats', href: '/stats', icon: <BarChart2 size={18} /> },
    ];

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="bg-blue-600 p-1.5 rounded-lg text-white">
                                <Shield size={24} />
                            </div>
                            <span className="font-bold text-xl text-gray-900 hidden sm:block tracking-tight">KeenKeeper</span>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-1 sm:space-x-4">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));

                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full transition-all duration-200 text-sm font-medium ${isActive
                                            ? 'bg-blue-50 text-blue-700 shadow-sm'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                >
                                    {link.icon}
                                    <span className="hidden sm:inline">{link.name}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </nav>
    );
}
