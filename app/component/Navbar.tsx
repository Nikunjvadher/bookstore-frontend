import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <nav className='border-b border-primary-500 bg-white/80 backdrop-blur-md sticky top-0 z-50'>
            <div className='container mx-auto flex justify-between items-center py-3 px-4'>
                <div className="">
                    <Link href='/'>
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <Hexagon />
                                <BookIcon />
                            </div>
                            <span className="flex items-center text-xl uppercase text-primary-500 font-bold">CodersBook</span>
                        </div>
                    </Link>
                </div>
                <div className="flex gap-3 items-center">
                    <Link href='/login' className='h-10 rounded-lg border border-primary-500 px-5 py-2 text-primary-500 font-medium hover:bg-primary-500 hover:text-white transition-all duration-300'>
                        Sign In
                    </Link>
                    <Link href='/signup' className='h-10 rounded-lg bg-linear-to-br from-primary-500 to-primary-600 px-5 py-2 text-white font-medium hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-md hover:shadow-lg'>
                        Sign Up
                    </Link>
                </div>
            </div>
        </nav>

    )
}

export default Navbar;



const Hexagon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="45"
        height="45"
        viewBox="0 0 24 24"
        fill="#0DD4F2"
        stroke="#0DD4F2"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-hexagon">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    </svg>
);

const BookIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="#fff"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="#0DD4F2"
        className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 transform">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
        />
    </svg>
);

