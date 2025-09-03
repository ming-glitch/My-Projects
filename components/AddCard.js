'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

/**
 * AddCard Component
 * 
 * A form component for adding new projects to the portfolio.
 * Handles both database submission and localStorage fallback
 * for offline capability and database connection issues.
 */
export default function AddCard() {
    const router = useRouter();

    // Form state management
    const [formData, setFormData] = useState({
        title: '',
        liveUrl: '',
        description: '',
        tags: []
    });
    const [tagInput, setTagInput] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    /**
     * Handles input changes and updates form state
     * @param {Object} e - The change event from input fields
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    /**
     * Handles tag input and adds tags to form data
     * @param {Object} e - The keypress event
     */
    const handleTagInput = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const newTag = tagInput.trim();
            if (newTag && !formData.tags.includes(newTag)) {
                setFormData(prev => ({
                    ...prev,
                    tags: [...prev.tags, newTag]
                }));
            }
            setTagInput('');
        }
    };

    /**
     * Removes a tag from the form data
     * @param {number} index - The index of the tag to remove
     */
    const removeTag = (index) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter((_, i) => i !== index)
        }));
    };

    /**
     * Handles form submission
     * Attempts to save project to database first, falls back to localStorage
     * @param {Object} e - The form submit event
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Attempt to save to database via API route
            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: formData.title,
                    liveUrl: formData.liveUrl,
                    description: formData.description,
                    tags: formData.tags,
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
            });

            // Check if response is OK first
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server error: ${response.status}. ${errorText}`);
            }

            // Try to parse JSON response
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
                description: formData.description,
                tags: formData.tags,
                createdAt: new Date().toISOString()
            });
            localStorage.setItem('projects', JSON.stringify(savedProjects));

            // Reset form and redirect to home page
            setFormData({ title: '', liveUrl: '', description: '', tags: [] });
            setTagInput('');
            router.push('/');
            router.refresh();

        } catch (error) {
            console.error('Error:', error);

            // Fallback to localStorage-only saving
            const savedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
            savedProjects.push({
                _id: Date.now().toString(),
                title: formData.title,
                liveUrl: formData.liveUrl,
                description: formData.description,
                tags: formData.tags,
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
            {/* Form Container */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden">
                <form onSubmit={handleSubmit}>

                    {/* Form Fields Section */}
                    <div className="p-4 space-y-4">
                        {/* Project Title Input */}
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

                        {/* Description Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Describe your project..."
                                rows="3"
                            />
                        </div>

                        {/* Technology Tags Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Technology Tags</label>
                            <div className="border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 p-2">
                                {/* Display existing tags */}
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {formData.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full border border-gray-200"
                                        >
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => removeTag(index)}
                                                className="ml-2 text-gray-500 hover:text-gray-700"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>

                                {/* Tag input */}
                                <input
                                    type="text"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={handleTagInput}
                                    className="w-full px-2 py-1 border-0 outline-none bg-transparent"
                                    placeholder="Type a tag and press Enter or comma..."
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                Press Enter or comma to add tags
                            </p>
                        </div>

                        {/* Live URL Input */}
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

                        {/* Form Actions */}
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