import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import BookModel from '@/models/Book';
import UserModel from '@/models/User';
import { verifyAuth } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';

// GET all books
export async function GET() {
    try {
        await connectDB();
        const books = await BookModel.find().populate('author', 'name');
        return NextResponse.json(books);
    } catch (error) {
        console.error('List books error:', error);
        return NextResponse.json({ message: 'Error fetching books' }, { status: 500 });
    }
}

// POST new book
export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const userId = await verifyAuth(req);

        if (!userId) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const formData = await req.formData();
        const title = formData.get('title') as string;
        const genre = formData.get('genre') as string;
        const description = formData.get('description') as string;
        const coverImage = formData.get('coverImage') as File;
        const bookPdf = formData.get('bookPdf') as File;

        if (!title || !genre || !description || !coverImage || !bookPdf) {
            return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
        }

        // Upload Cover Image
        const coverBuffer = Buffer.from(await coverImage.arrayBuffer());
        const coverUpload = await uploadToCloudinary(coverBuffer, 'book-covers', 'image');

        // Upload Book PDF
        const pdfBuffer = Buffer.from(await bookPdf.arrayBuffer());
        const pdfUpload = await uploadToCloudinary(pdfBuffer, 'book-pdfs', 'raw');

        const newBook = await BookModel.create({
            title,
            genre,
            description,
            author: userId,
            coverImage: coverUpload.secure_url,
            bookPdf: pdfUpload.secure_url,
        });

        return NextResponse.json(newBook, { status: 201 });
    } catch (error) {
        console.error('Create book error:', error);
        return NextResponse.json({ message: 'Error creating book' }, { status: 500 });
    }
}
