'use client';
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import AdminAddCard from '@/components/AdminAddCard';

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [isExpanded, setIsExpanded] = useState({});
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(null);

  // Fetch all projects without pagination
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/projects?limit=100`); // Increased limit to get all projects

      if (!res.ok) {
        throw new Error('Failed to fetch projects');
      }

      const { data } = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("Fetch error:", error);
      // Fallback to localStorage if API fails
      const saved = localStorage.getItem('projects');
      if (saved) setProjects(JSON.parse(saved));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await fetch('/api/projects', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id })
        });
        setProjects(prev => prev.filter(p => p._id !== id));
      } catch (error) {
        console.error("Delete error:", error);
      }
    }
  };

  const toggleExpand = (id) => {
    setIsExpanded(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <main className="bg-purple-100">
      <Navbar />

      {/* About Me - completely unchanged */}
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
        {/* heading - unchanged */}
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

        {/* Cards - structure unchanged, only dynamic rendering added */}
        <section className="container mx-auto pt-10 px-4 md:px-22 p-16">

          {/* Loading state */}
          {loading && (
            <div className="text-center py-8">Loading projects...</div>
          )}

          {/* Dynamically rendered projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project._id}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 p-6 flex flex-col transform hover:-translate-y-1"
              >
                <div className="flex-grow">
                  <h3 className="font-semibold text-xl text-gray-800 mb-3">
                    {project.title}
                  </h3>

                  {project.description && (
                    <p className="text-gray-600 mb-6">
                      {project.description}
                    </p>
                  )}
                </div>

                <div className="flex justify-between items-center mt-4">
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 group-hover:underline"
                  >
                    Visit Live Site
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
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

                  <div className="flex space-x-2">
                    {project.tags && project.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
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