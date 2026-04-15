import { Home } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const NotFoundPage = () => {
    return (
        <div className="min-h-[80vh] flex flex-col justify-center items-center px-4 text-center">
            <h1 className="text-9xl font-extrabold text-blue-100 tracking-tight">404</h1>
            <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-2">Page Not Found</h2>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
                Oops! The page you were looking for doesn't exist or has been moved.
            </p>

            <Link
                href="/"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full transition-colors shadow-sm"
            ><Home size={18} />
                <span>Return to Dashboard</span>
            </Link>
        </div>
                
    );
};

export default NotFoundPage;