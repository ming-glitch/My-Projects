// Updated Footer component with WhatsApp and Email links
'use client'
import React from 'react';

const Footer = () => {
    // Function to handle WhatsApp click
    const handleWhatsAppClick = () => {
        window.open(`https://wa.me/9779707492060`, '_blank');
    };

    // Function to handle Email click
    const handleEmailClick = () => {
        window.open(`mailto:minglama882@gmail.com`, '_blank');
    };

    return (
        <footer id="contact-footer" className='w-full bg-gray-900 text-white'>
            <div className='container mx-auto pt-[80px] px-4 sm:px-8 md:px-12 lg:px-18'>
                <div className='flex flex-wrap -mx-4'>

                    {/* Blog Column - Full width on mobile, 1/3 on larger screens */}
                    <div className='w-full md:w-1/3 px-4 pt-8 flex flex-col gap-3'>
                        <div className='text-sm text-white font-bold uppercase mb-[10px]'>
                            MY CREATIVE SPACE
                        </div>
                        <p className='text-sm'>
                            A showcase of my personal journey, projects, and insights as an emerging developer. This blog reflects my growth and passion for web development.
                        </p>

                        <div className='text-sm text-white font-bold uppercase'>
                            CONTACT
                        </div>

                        <li
                            className='text-sm list-none cursor-pointer hover:text-blue-300 transition-colors'
                            onClick={handleWhatsAppClick}
                        >
                            <svg
                                className="select-none inline-block w-[1em] h-[1em] fill-current text-[1.5rem] transition-[fill] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] flex-shrink-0 align-middle mr-2"
                                focusable="false"
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                data-testid="PhoneOutlinedIcon">
                                <path d="M6.54 5c.06.89.21 1.76.45 2.59l-1.2 1.2c-.41-1.2-.67-2.47-.76-3.79zm9.86 12.02c.85.24 1.72.39 2.6.45v1.49c-1.32-.09-2.59-.35-3.8-.75zM7.5 3H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.49c0-.55-.45-1-1-1-1.24 0-2.45-.2-3.57-.57-.1-.04-.21-.05-.31-.05-.26 0-.51.1-.71.29l-2.2 2.2c-2.83-1.45-5.15-3.76-6.59-6.59l2.2-2.2c.28-.28.36-.67.25-1.02C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1"></path>
                            </svg>
                            +977-9707492060
                        </li>

                        <li
                            className='text-sm list-none cursor-pointer hover:text-blue-300 transition-colors'
                            onClick={handleEmailClick}
                        >
                            <svg
                                className="select-none inline-block w-[1em] h-[1em] fill-current text-[1.5rem] transition-[fill] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] flex-shrink-0 align-middle mr-2"
                                focusable="false"
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                data-testid="EmailOutlinedIcon">
                                <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zm-2 0-8 5-8-5zm0 12H4V8l8 5 8-5z"></path>
                            </svg>
                            minglama882@gmail.com
                        </li>
                    </div>

                    {/* Quick Links - Full width on mobile, 25% on larger screens */}
                    <div className='w-full md:w-[25%] px-4 pt-8 pb-2'>
                        <h4 className='text-[1rem] font-bold uppercase mb-[10px]'>Quick Links</h4>
                        <ul className='p-0 m-0 mb-[1rem]'>
                            <li className='text-sm py-[3px] list-none'>
                                <a
                                    href="https://www.facebook.com/share/16sVmCZXzG/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-blue-300 transition-colors"
                                >
                                    Facebook
                                </a>
                            </li>
                            <li className='text-sm py-[3px] list-none'>
                                <a
                                    href="https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fming-lama-11b649378%3Futm_source%3Dshare%26utm_campaign%3Dshare_via%26utm_content%3Dprofile%26utm_medium%3Dandroid_app%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExdVJPTkhPMGxocUI5bFRBTgEe1DjrYVHeaEsV-fXJUA19R8KXQXCjQS7hNCcx-zvgOlYNwat33YFr-yT84rs_aem_y7QvNOkVODXubHJhaI76hA&h=AT34wxrrUfSyrfSw3iTHO0LbrokNdYMP30fb8C8QQPHQBRxtNMA35BY-9K77suCz2Xg2whmHBRUVJ-2vu3BtOqeCy53CqlOK3jsB4O6Mq-_9DOdfilcTMeCHwwiqYPp8FO4wvQ"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-blue-300 transition-colors"
                                >
                                    LinkedIn
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter - Full width on mobile, 25% on larger screens */}
                    <div className='w-full md:w-[25%] px-4 pt-8 pb-2'>
                        <h4 className="text-sm text-white font-bold uppercase mb-[10px]">Newsletter</h4>
                        <div className="relative flex flex-wrap items-center w-full mb-3 mt-3">
                            <div className="flex w-full">
                                <input
                                    type="text"
                                    className="block w-full py-1.5 px-3 text-sm font-normal leading-normal text-gray-900 bg-white border border-gray-300 rounded-l-lg transition-all duration-150 ease-in-out focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="Your email address"
                                />
                                <button
                                    className="flex items-center justify-center bg-green-400 hover:bg-green-600 text-white text-sm font-normal py-2 px-4 sm:px-6 border border-green-400 rounded-r-lg transition-colors duration-150 ease-in-out -ml-px z-10"
                                    type="button"
                                >
                                    <svg
                                        className="w-5 h-5 fill-current transition-transform duration-200 ease-in-out group-hover:translate-x-0.5"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-full py-5 mt-[70px] bg-black'>
                <div className='container mx-auto px-4 sm:px-8 md:px-12 lg:px-18'>
                    <p className="m-0 text-sm text-white">
                        &copy; 2022-{new Date().getFullYear()} Ming Lama. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;