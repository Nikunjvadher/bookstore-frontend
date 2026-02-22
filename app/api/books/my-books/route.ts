import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import BookModel from '@/models/Book';
import { verifyAuth } from '@/lib/auth';

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const userId = await verifyAuth(req);

        if (!userId) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const books = await BookModel.find({ author: userId }).populate('author', 'name');
        return NextResponse.json(books);
    } catch (error) {
        console.error('Fetch my books error:', error);
        return NextResponse.json({ message: 'Error fetching books' }, { status: 500 });
    }
}
