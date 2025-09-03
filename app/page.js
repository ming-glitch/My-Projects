'use client';
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import AdminAddCard from '@/components/AdminAddCard';

// Sample data for fallback
const sampleProjects = [
  {
    _id: '1',
    title: 'Weather App',
    description: 'A responsive weather application that displays current weather and forecasts.',
    liveUrl: 'https://weatherapp.example.com',
    tags: ['React', 'API', 'CSS'],
  },
  {
    _id: '2',
    title: 'E-commerce Site',
    description: 'A fully functional e-commerce website with product filtering and cart functionality.',
    liveUrl: 'https://ecommerce.example.com',
    tags: ['Next.js', 'Node.js', 'MongoDB'],
  },
  {
    _id: '3',
    title: 'Task Manager',
    description: 'A productivity app for managing daily tasks with drag-and-drop functionality.',
    liveUrl: 'https://taskmanager.example.com',
    tags: ['JavaScript', 'LocalStorage', 'UI/UX'],
  }
];

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dbError, setDbError] = useState(null);

  // Replace your fetchProjects function with this:
  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      setDbError(null);

      const res = await fetch('/api/projects?limit=100');

      // First check if response is OK
      if (!res.ok) {
        throw new Error(`Server returned ${res.status} ${res.statusText}`);
      }

      // Get response as text first to handle empty responses
      const responseText = await res.text();
      console.log('API response text:', responseText);

      let responseData;
      try {
        responseData = responseText ? JSON.parse(responseText) : { data: [] };
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        throw new Error('Invalid JSON response from server');
      }

      console.log('API response data:', responseData);

      if (responseData.data) {
        setProjects(responseData.data);
        if (responseData.error) {
          setDbError(responseData.error);
        }
      } else {
        // Use sample data if no data field
        setProjects(sampleProjects);
        setDbError('No projects data received, using sample data');
      }

    } catch (error) {
      console.error("Fetch error:", error);
      setError(error.message);
      setProjects(sampleProjects);
      setDbError('Using sample data due to: ' + error.message);

      // Fallback to localStorage
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('projects');
        if (saved) {
          try {
            const parsedProjects = JSON.parse(saved);
            setProjects(parsedProjects);
            setDbError('Using projects from local storage');
          } catch (e) {
            console.error("Error parsing saved projects:", e);
          }
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <main className="bg-purple-100">
      <Navbar />

      {/* About Me */}
      <div id="about-me" className="bg-white py-12">
        <section className="container mx-auto pt-10 px-4 md:px-22">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Text Content */}
            <div className="flex flex-col gap-4">
              <h2 className="font-medium text-3xl">About Me</h2>
              <p className="font-medium">
                As an aspiring web developer with three months of hands-on experience, I&apos;ve already built several personal projects that demonstrate my growing skills in this field.
              </p>
              <p>
                My name is Ming Lama, a passionate beginner in web development dedicated to continuous learning. I specialize in front-end technologies and enjoy transforming ideas into functional, user-friendly websites. Through my journey so far, I&apos;ve developed a strong foundation in HTML, CSS, JavaScript, and modern frameworks while constantly expanding my knowledge through practice and experimentation.
              </p>
            </div>

            {/* Regular Image (Not Circular) */}
            <div className="flex justify-center md:justify-end">
              <div className="relative w-full h-full min-h-[300px] max-w-[400px]">
                <Image
                  src="/office.avif"
                  alt="Office image"
                  fill
                  className="object-cover"
                  quality={90}
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Projects */}
      <div className="pt-16">
        {/* heading */}
        <div className="flex flex-col gap-6 justify-center items-center text-center">
          <h2 className="font-medium text-2xl">
            Explore My <span className="relative inline-block">
              Projects
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-current"></span>
            </span> Below
          </h2>
          <p className="w-full max-w-[600px] px-4">
            You can browse through my portfolio of web development projects, each representing milestones in my learning journey. These works showcase my growing expertise in front-end technologies and problem-solving abilities.
          </p>
        </div>

        {/* Cards */}
        <section className="container mx-auto pt-10 px-4 md:px-22 p-16">

          {/* Error message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              <p className="font-bold">Error: Could not load projects from server</p>
              <p>{error}</p>
            </div>
          )}

          {/* Database connection warning */}
          {dbError && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
              <p className="font-bold">Database Connection Issue</p>
              <p>{dbError}</p>
              <p className="text-sm mt-2">
                Please check your MongoDB connection string in the .env.local file
              </p>
            </div>
          )}

          {/* Loading state */}
          {loading && (
            <div className="text-center py-8">Loading projects...</div>
          )}

          {/* Dynamically rendered projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project._id}
                className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                {/* Card Content */}
                <div className="p-6 flex-grow">
                  {/* Project Title */}
                  <h3 className="font-semibold text-xl text-gray-800 mb-3">
                    {project.title}
                  </h3>

                  {/* Project Description */}
                  {project.description && (
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                  )}
                </div>

                {/* Fixed bottom section for button and tags */}
                <div className="p-6 pt-0 mt-auto">
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center flex-wrap gap-2">
                      {/* Visit Live Site Button */}
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 whitespace-nowrap text-sm sm:text-base"
                      >
                        Visit Live Site
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="ml-2 h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Link>

                      {/* Technology Tags - Made smaller for all screens */}
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {project.tags.slice(0, 2).map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full border border-gray-200 whitespace-nowrap"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <AdminAddCard />
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}