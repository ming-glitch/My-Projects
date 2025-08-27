'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AddCard() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        liveUrl: '' // Only needed fields
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: formData.title,
                    liveUrl: formData.liveUrl,
                    description: '',
                    tags: [],
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
            });

            // Check if response is OK first
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server error: ${response.status}. ${errorText}`);
            }

            // Try to parse JSON
            const text = await response.text();
            const data = text ? JSON.parse(text) : {};

            if (data.error) {
                throw new Error(data.error);
            }

            // Success - also save to localStorage as backup
            const savedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
            savedProjects.push({
                _id: data.insertedId || Date.now().toString(),
                title: formData.title,
                liveUrl: formData.liveUrl,
                description: '',
                tags: [],
                createdAt: new Date().toISOString()
            });
            localStorage.setItem('projects', JSON.stringify(savedProjects));

            setFormData({ title: '', liveUrl: '' });
            router.push('/');
            router.refresh();

        } catch (error) {
            console.error('Error:', error);

            // Fallback to localStorage
            const savedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
            savedProjects.push({
                _id: Date.now().toString(),
                title: formData.title,
                liveUrl: formData.liveUrl,
                description: '',
                tags: [],
                createdAt: new Date().toISOString()
            });
            localStorage.setItem('projects', JSON.stringify(savedProjects));

            alert('Project saved locally. Database connection may be down.');
            router.push('/');
            router.refresh();
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden">
                <form onSubmit={handleSubmit}>

                    {/* Form Fields */}
                    <div className="p-4 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Project Title*</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Weather App"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Live URL*</label>
                            <input
                                type="url"
                                name="liveUrl"
                                value={formData.liveUrl}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="https://your-project.vercel.app"
                                required
                            />
                        </div>

                        <div className="flex justify-end space-x-3 pt-2">
                            <Link
                                href="/"
                                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Adding Project...' : 'Add Project'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}