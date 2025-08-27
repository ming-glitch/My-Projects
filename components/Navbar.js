// Update your Navbar component
'use client'
import Link from "next/link";
import Image from 'next/image';
import { usePathname } from "next/navigation";

const Navbar = () => {
    const pathname = usePathname();

    // Function to handle smooth scrolling to About section
    const scrollToAbout = (e) => {
        // Only execute if we're on the homepage
        if (pathname === '/') {
            e.preventDefault();
            const aboutSection = document.getElementById('about-me');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    };

    // Function to handle smooth scrolling to Footer/Contact section
    const scrollToContact = (e) => {
        // Only execute if we're on the homepage
        if (pathname === '/') {
            e.preventDefault();
            const footerSection = document.getElementById('contact-footer');
            if (footerSection) {
                footerSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    };

    return (
        <div className="relative bg-gray-900">
            {/* Navbar */}
            <nav className="relative h-20 w-full">
                <div className="flex justify-between items-center h-full px-4 lg:px-15 text-white">
                    <Link
                        href="/"
                        className="text-xl font-bold cursor-pointer"
                        aria-label="Home"
                    >
                        MY BLOG
                    </Link>

                    {/* Navigation Links */}
                    <ul className="flex gap-2 md:gap-8 items-center">
                        <li>
                            <Link
                                href="/"
                                className="hover:text-gray-300 transition-colors"
                                aria-label="Home"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/#about-me"
                                onClick={scrollToAbout}
                                className="hover:text-gray-300 transition-colors"
                                aria-label="About"
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/#contact-footer"
                                onClick={scrollToContact}
                                className="hover:text-gray-300 transition-colors"
                                aria-label="Contact"
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative pt-20 px-4 lg:px-15 text-white container mx-auto flex flex-col lg:flex-row items-center gap-8">
                {/* Text Content */}
                <div className="p-8 flex-1">
                    <h1 className="text-4xl font-bold mb-4">Welcome to My Personal Blog Portfolio</h1>
                    <p className="text-lg mb-6">
                        This platform showcases my journey as a developer, featuring both my latest projects and earlier work that document my growth and experience in the field.
                    </p>

                    <div className="flex gap-4">
                        <Link
                            href="/#about-me"
                            onClick={scrollToAbout}
                            className="uppercase px-6 py-2 bg-white text-black hover:bg-gray-200 transition-colors inline-block"
                            aria-label="Learn more about me"
                        >
                            About Me
                        </Link>
                    </div>
                </div>

                {/* Profile Image */}
                <div className="flex-1 flex justify-center p-4 md:p-8">
                    <div className="w-64 h-64 md:w-100 md:h-100 rounded-full bg-gray-400 bg-opacity-30 border-2 border-white flex items-center justify-center overflow-hidden">
                        <Image
                            src="/Profile.jpg"
                            alt="Ming Lama's profile picture"
                            width={400}
                            height={400}
                            className="w-full h-full object-cover"
                            priority
                            onError={(e) => {
                                e.currentTarget.src = 'https://via.placeholder.com/400';
                                e.currentTarget.alt = 'Default placeholder image';
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;