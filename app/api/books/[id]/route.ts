import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import BookModel from '@/models/Book';
import UserModel from '@/models/User';
import { verifyAuth } from '@/lib/auth';
import cloudinary from '@/lib/cloudinary';

// GET single book
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params;
        const book = await BookModel.findById(id).populate('author', 'name');
        if (!book) {
            return NextResponse.json({ message: 'Book not found' }, { status: 404 });
        }
        return NextResponse.json(book);
    } catch (error) {
        console.error('Get book error:', error);
        return NextResponse.json({ message: 'Error fetching book' }, { status: 500 });
    }
}

// DELETE book
export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const userId = await verifyAuth(req);
        if (!userId) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const book = await BookModel.findById(id);
        if (!book) {
            return NextResponse.json({ message: 'Book not found' }, { status: 404 });
        }

        if (book.author.toString() !== userId) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
        }

        // Delete from Cloudinary
        const coverPublicId = book.coverImage.split('/').pop()?.split('.')[0];
        const pdfPublicId = book.bookPdf.split('/').pop();

        if (coverPublicId) {
            await cloudinary.uploader.destroy(`book-covers/${coverPublicId}`);
        }
        if (pdfPublicId) {
            await cloudinary.uploader.destroy(`book-pdfs/${pdfPublicId}`, { resource_type: 'raw' });
        }

        await BookModel.findByIdAndDelete(id);
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error('Delete book error:', error);
        return NextResponse.json({ message: 'Error deleting book' }, { status: 500 });
    }
}

// PATCH update book (Implementation simplified, can be expanded for partial uploads)
export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const userId = await verifyAuth(req);
        if (!userId) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const book = await BookModel.findById(id);
        if (!book) {
            return NextResponse.json({ message: 'Book not found' }, { status: 404 });
        }

        if (book.author.toString() !== userId) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
        }

        const formData = await req.formData();
        const updateFields: any = {};

        if (formData.has('title')) updateFields.title = formData.get('title');
        if (formData.has('genre')) updateFields.genre = formData.get('genre');
        if (formData.has('description')) updateFields.description = formData.get('description');

        // Note: For coverImage and bookPdf updates, logic similar to POST would be needed here.
        // For brevity and based on original code, I'll focus on these fields first.

        const updatedBook = await BookModel.findByIdAndUpdate(id, updateFields, { new: true });
        return NextResponse.json(updatedBook);
    } catch (error) {
        console.error('Update book error:', error);
        return NextResponse.json({ message: 'Error updating book' }, { status: 500 });
    }
}
