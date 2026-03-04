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

        const { searchParams } = new URL(req.url);
        const search = searchParams.get('search');

        let query: any = { author: userId };
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { genre: { $regex: search, $options: 'i' } },
            ];
        }

        const books = await BookModel.find(query).populate('author', 'name');
        return NextResponse.json(books);
    } catch (error) {
        console.error('Fetch my books error:', error);
        return NextResponse.json({ message: 'Error fetching books' }, { status: 500 });
    }
}
