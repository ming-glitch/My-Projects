'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminAddCard() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAdminStatus = async () => {
            try {
                setLoading(true);

                // Get base URL - handle both server and client side
                const baseUrl = typeof window !== 'undefined'
                    ? window.location.origin
                    : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

                // API Cache Busting - add timestamp to prevent caching
                const response = await fetch(`${baseUrl}/api/check-admin?t=${Date.now()}`);

                if (!response.ok) {
                    throw new Error('Failed to check admin status');
                }

                const data = await response.json();
                setIsAdmin(data.isAdmin);

            } catch (error) {
                console.error('Error checking admin status:', error);
                setIsAdmin(false);
            } finally {
                setLoading(false);
            }
        };

        checkAdminStatus();
    }, []);

    // Show loading state - now matches project card dimensions exactly
    if (loading) {
        return (
            <div className="group bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col h-full animate-pulse">
                <div className="flex-grow flex flex-col items-center justify-center gap-4">
                    <div className="bg-gray-200 w-16 h-16 rounded-full"></div>
                    <div className="bg-gray-200 h-4 w-32 rounded"></div>
                </div>
            </div>
        );
    }

    // Show nothing if not admin
    if (!isAdmin) return <></>;

    // Show admin card if admin mode is enabled - now matches project card dimensions
    return (
        <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 p-6 flex flex-col h-full transform hover:-translate-y-1">
            <div
                onClick={() => router.push('/add-card')}
                className="flex flex-col h-full w-full cursor-pointer"
            >
                <div className="flex-grow flex flex-col items-center justify-center gap-4 cursor-pointer transition-colors duration-300 rounded-lg p-4 h-full">
                    <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center transition-all duration-300 group-hover:bg-blue-600 group-hover:scale-110">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                    <span className="text-gray-600 group-hover:text-blue-600 font-medium text-center">
                        Add New Project
                    </span>
                </div>
            </div>
        </div>
    );
}