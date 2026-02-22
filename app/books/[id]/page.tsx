'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/app/component/Button';

// Types
interface Author {
  name: string;
  bio?: string;
  avatar?: string;
}

interface Book {
  _id: string;
  title: string;
  description: string;
  coverImage: string;
  bookPdf: string;
  author: Author;
  publisher?: string;
  publishedYear?: number;
  pages?: number;
  isbn?: string;
  category?: string;
}

// Skeleton Loader Component
const BookDetailSkeleton = () => (
  <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100">
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cover Image Skeleton */}
        <div className="w-full lg:w-1/3 flex justify-center">
          <div className="w-64 h-96 bg-linear-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse rounded-2xl shadow-2xl"></div>
        </div>

        {/* Details Skeleton */}
        <div className="w-full lg:w-2/3 space-y-6">
          <div className="h-12 bg-linear-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse rounded-lg w-3/4"></div>
          <div className="h-to-r from-gray-6 bg-gradient-200 via-gray-100 to-gray-200 animate-pulse rounded-lg w-1/4"></div>
          <div className="h-4 bg-linear-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse rounded-lg w-full"></div>
          <div className="h-4 bg-linear-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse rounded-lg w-5/6"></div>
          <div className="h-4 bg-linear-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse rounded-lg w-4/6"></div>
          <div className="flex gap-4 pt-6">
            <div className="h-12 w-36 bg-linear-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse rounded-xl"></div>
            <div className="h-12 w-36 bg-linear-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse rounded-xl"></div>
            <div className="h-12 w-36 bg-linear-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Error Component
const ErrorState = ({ message, onRetry }: { message: string; onRetry: () => void }) => (
  <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
    <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md">
      <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
        <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
      <p className="text-gray-600 mb-6">{message}</p>
      <Button onClick={onRetry} variant="primary">
        Try Again
      </Button>
    </div>
  </div>
);

// Icons
const DownloadIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const HeartIcon = ({ filled }: { filled?: boolean }) => (
  <svg className="w-5 h-5" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const ShareIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
  </svg>
);

const BookIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const PageIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const CategoryIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
  </svg>
);

// Main Component
const BookDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const fetchBook = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      // Check if API URL is defined

      const response = await fetch(`/api/books/${id}`);

      if (!response.ok) {
        throw new Error('Failed to fetch book details. Please try again.');
      }

      const data = await response.json();
      setBook(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getParams = async () => {
      const { id } = await params;
      fetchBook(id);
    };
    getParams();
  }, [params]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: book?.title,
          text: `Check out "${book?.title}" by ${book?.author.name}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) return <BookDetailSkeleton />;

  if (error) return <ErrorState message={error} onRetry={() => book ? fetchBook(book._id) : window.location.reload()} />;

  if (!book) return <ErrorState message="Book not found" onRetry={() => window.location.reload()} />;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section with Pattern Background */}
      <div className="relative bg-gradient-to-br from-primary-800 via-primary-600 to-primary-500 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.6) 1.5px, transparent 1.5px)`,
            backgroundSize: '32px 32px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/80 text-sm mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/" className="hover:text-white transition-colors">Books</Link>
            <span>/</span>
            <span className="text-white">{book.title}</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Book Cover */}
            <div className="w-full lg:w-1/3 flex justify-center lg:justify-start">
              <div className="relative group">
                {/* Subtle Premium Shadow Layers */}
                <div className="absolute -inset-4 bg-white/10 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                <div className="absolute -inset-2 bg-amber-400/20 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>

                {/* Floating Accent Elements */}
                <div className="absolute -top-3 -right-3 w-16 h-16 bg-amber-400/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -bottom-3 -left-3 w-12 h-12 bg-primary-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative">
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    width={280}
                    height={420}
                    className="rounded-2xl shadow-2xl object-cover transform group-hover:scale-[1.02] transition-transform duration-500"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Book Details */}
            <div className="w-full lg:w-2/3 text-white">
              {/* Category Badge */}
              {book.category && (
                <span className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
                  {book.category}
                </span>
              )}

              <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                {book.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 mb-6 text-white/90">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <UserIcon />
                  </div>
                  <span className="font-medium">{book.author.name}</span>
                </div>

                {book.publisher && (
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <BookIcon />
                    </div>
                    <span>{book.publisher}</span>
                  </div>
                )}

                {book.publishedYear && (
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <CalendarIcon />
                    </div>
                    <span>{book.publishedYear}</span>
                  </div>
                )}

                {book.pages && (
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <PageIcon />
                    </div>
                    <span>{book.pages} pages</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Button
                  link={book.bookPdf}
                  variant="secondary"
                  size="lg"
                >
                  <DownloadIcon />
                  Download PDF
                </Button>

                <Button
                  onClick={() => setIsFavorite(!isFavorite)}
                  variant="outline"
                  size="lg"
                  className="border-white! text-white! hover:bg-white! hover:text-primary-600!"
                >
                  <HeartIcon filled={isFavorite} />
                  {isFavorite ? 'Saved' : 'Add to Favorites'}
                </Button>

                <Button
                  onClick={handleShare}
                  variant="ghost"
                  size="lg"
                  className="text-white! hover:bg-white/20!"
                >
                  <ShareIcon />
                  Share
                </Button>
              </div>

              {/* ISBN */}
              {book.isbn && (
                <div className="mt-6 pt-6 border-t border-white/20">
                  <span className="text-white/70">ISBN: </span>
                  <span className="font-mono text-white/90">{book.isbn}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            <section className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="w-1 h-8 bg-primary-500 rounded-full"></span>
                About this Book
              </h2>
              <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
                <p>{book.description}</p>
              </div>
            </section>

            {/* Author Section */}
            <section className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="w-1 h-8 bg-primary-500 rounded-full"></span>
                About the Author
              </h2>
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-linear-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white text-2xl font-bold shrink-0">
                  {book.author.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{book.author.name}</h3>
                  <p className="text-gray-600">{book.author.bio || `Passionate writer and author of "${book.title}".`}</p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Book Info Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Book Information</h3>
              <div className="space-y-4">
                {book.category && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 flex items-center gap-2">
                      <CategoryIcon />
                      Category
                    </span>
                    <span className="font-medium text-gray-800">{book.category}</span>
                  </div>
                )}
                {book.publisher && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 flex items-center gap-2">
                      <BookIcon />
                      Publisher
                    </span>
                    <span className="font-medium text-gray-800">{book.publisher}</span>
                  </div>
                )}
                {book.publishedYear && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 flex items-center gap-2">
                      <CalendarIcon />
                      Year
                    </span>
                    <span className="font-medium text-gray-800">{book.publishedYear}</span>
                  </div>
                )}
                {book.pages && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 flex items-center gap-2">
                      <PageIcon />
                      Pages
                    </span>
                    <span className="font-medium text-gray-800">{book.pages}</span>
                  </div>
                )}
                {book.isbn && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 flex items-center gap-2">
                      ISBN
                    </span>
                    <span className="font-mono text-sm text-gray-800">{book.isbn}</span>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <Button link={book.bookPdf} variant="primary" className="w-full justify-center">
                  <DownloadIcon />
                  Download Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
