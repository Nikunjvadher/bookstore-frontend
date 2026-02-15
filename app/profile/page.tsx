'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BookUpload from '@/app/component/BookUpload';
import { Book} from '@/app/types';

const ProfilePage = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Please login to view your profile');
            setLoading(false);
            return;
        }

        // Fetch user profile from backend
        fetchUserProfile(token);
        fetchUserBooks(token);
    }, []);

    const fetchUserBooks = async (token: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/my-books`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch your books');
            }

            const data = await response.json();
            setBooks(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error fetching books');
        } finally {
            setLoading(false);
        }
    };

    const fetchUserProfile = async (token: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch profile');
            }

            const data = await response.json();
            setUser({ name: data.name || 'User', email: data.email || '' });
        } catch (err) {
            console.error('Error fetching profile:', err);
            // Still allow showing books even if profile fails
            setUser({ name: 'User', email: '' });
        }
    };

    const handleUploadSuccess = () => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchUserBooks(token);
        }
        setShowUploadForm(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-600">Loading your profile...</p>
                </div>
            </div>
        );
    }

    const token = localStorage.getItem('token');
    if (!token) {
        return (
            <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Please Login</h1>
                    <p className="text-gray-600 mb-6">You need to login to view your profile</p>
                    <Link href="/login" className="inline-block px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                        Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100">
            {/* Header */}
            <div className="bg-linear-to-r from-primary-600 via-primary-500 to-primary-400 text-white">
                <div className="container mx-auto px-4 py-12">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        {/* Avatar */}
                        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold">
                            {user?.name?.charAt(0).toUpperCase() || 'U'}
                        </div>

                        {/* User Info */}
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-3xl font-bold mb-2">{user?.name || 'User'}</h1>
                            <p className="text-white/80">{user?.email || 'No email'}</p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowUploadForm(!showUploadForm)}
                                className="px-6 py-3 bg-white text-primary-600 font-semibold rounded-xl hover:bg-white/90 transition-colors"
                            >
                                {showUploadForm ? 'View My Books' : 'Upload Book'}
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-6 py-3 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-12">
                {error && (
                    <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                        <svg className="w-5 h-5 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-red-600 text-sm">{error}</span>
                    </div>
                )}

                {showUploadForm ? (
                    <div className="max-w-2xl mx-auto">
                        <BookUpload onSuccess={handleUploadSuccess} />
                    </div>
                ) : (
                    <>
                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            <div className="bg-white rounded-2xl p-6 shadow-lg">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center">
                                        <svg className="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-3xl font-bold text-gray-800">{books.length}</p>
                                        <p className="text-gray-600">Total Books</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-lg">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center">
                                        <svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-3xl font-bold text-gray-800">
                                            {new Set(books.map(b => b.genre)).size}
                                        </p>
                                        <p className="text-gray-600">Genres</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-lg">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                                        <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-3xl font-bold text-gray-800">
                                            {new Date().getFullYear()}
                                        </p>
                                        <p className="text-gray-600">Member Since</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* My Books Section */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">My Uploaded Books</h2>

                            {books.length === 0 ? (
                                <div className="bg-white rounded-2xl p-12 shadow-lg text-center">
                                    <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No Books Yet</h3>
                                    <p className="text-gray-600 mb-6">Start uploading your books to share with others</p>
                                    <button
                                        onClick={() => setShowUploadForm(true)}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        Upload Your First Book
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {books.map((book) => (
                                        <Link key={book._id} href={`/books/${book._id}`}>
                                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
                                                {/* Cover Image */}
                                                <div className="relative h-48 bg-gray-200">
                                                    <Image
                                                        src={book.coverImage}
                                                        alt={book.title}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                </div>

                                                {/* Book Info */}
                                                <div className="p-4">
                                                    <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1">
                                                        {book.title}
                                                    </h3>
                                                    <p className="text-sm text-gray-600 mb-2">
                                                        by {book.author?.name || 'Unknown'}
                                                    </p>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs px-2 py-1 bg-primary-100 text-primary-600 rounded-full">
                                                            {book.genre || 'General'}
                                                        </span>
                                                        <span className="text-xs text-gray-500">
                                                            {book.createdAt ? new Date(book.createdAt).toLocaleDateString() : ''}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;

