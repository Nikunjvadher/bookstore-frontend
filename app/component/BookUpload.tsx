'use client';

import { useState, useRef } from 'react';
import Button from '@/app/component/Button';

interface BookUploadProps {
    onSuccess?: () => void;
}

const BookUpload: React.FC<BookUploadProps> = ({ onSuccess }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [bookPdf, setBookPdf] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const coverImageRef = useRef<HTMLInputElement>(null);
    const bookPdfRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        if (!coverImage || !bookPdf) {
            setError('Please select both cover image and PDF file');
            setIsLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('genre', genre);
        formData.append('description', description);
        formData.append('coverImage', coverImage);
        formData.append('bookPdf', bookPdf);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Please login to upload a book');
                setIsLoading(false);
                return;
            }

            const response = await fetch(`/api/books`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to upload book');
            }

            const data = await response.json();
            setSuccess('Book uploaded successfully!');

            // Reset form
            setTitle('');
            setAuthor('');
            setGenre('');
            setDescription('');
            setCoverImage(null);
            setBookPdf(null);
            if (coverImageRef.current) coverImageRef.current.value = '';
            if (bookPdfRef.current) bookPdfRef.current.value = '';

            if (onSuccess) {
                onSuccess();
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to upload book');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Upload New Book</h2>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                    <svg className="w-5 h-5 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-red-600 text-sm">{error}</span>
                </div>
            )}

            {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-green-600 text-sm">{success}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Title */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                        Book Title *
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        placeholder="Enter book title"
                    />
                </div>

                {/* Author */}
                <div>
                    <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                        Author Name *
                    </label>
                    <input
                        type="text"
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        placeholder="Enter author name"
                    />
                </div>

                {/* Genre */}
                <div>
                    <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-2">
                        Genre *
                    </label>
                    <input
                        type="text"
                        id="genre"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        placeholder="e.g., Fiction, Self-help, Technology"
                    />
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                        Description *
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                        placeholder="Enter book description"
                    />
                </div>

                {/* Cover Image */}
                <div>
                    <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-2">
                        Cover Image *
                    </label>
                    <input
                        type="file"
                        id="coverImage"
                        ref={coverImageRef}
                        accept="image/*"
                        onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                    {coverImage && (
                        <p className="mt-2 text-sm text-green-600">Selected: {coverImage.name}</p>
                    )}
                </div>

                {/* Book PDF */}
                <div>
                    <label htmlFor="bookPdf" className="block text-sm font-medium text-gray-700 mb-2">
                        Book PDF *
                    </label>
                    <input
                        type="file"
                        id="bookPdf"
                        ref={bookPdfRef}
                        accept=".pdf"
                        onChange={(e) => setBookPdf(e.target.files?.[0] || null)}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                    {bookPdf && (
                        <p className="mt-2 text-sm text-green-600">Selected: {bookPdf.name}</p>
                    )}
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full justify-center"
                >
                    {isLoading ? (
                        <span className="inline-flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Uploading...
                        </span>
                    ) : (
                        'Upload Book'
                    )}
                </Button>
            </form>
        </div>
    );
};

export default BookUpload;

