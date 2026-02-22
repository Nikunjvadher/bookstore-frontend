import mongoose from 'mongoose';
import { Book } from '../types';
import './User';

const bookSchema = new mongoose.Schema<Book>(
    {
        title: { type: String, required: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        genre: { type: String, required: true },
        description: { type: String, required: true },
        coverImage: { type: String, required: true },
        bookPdf: { type: String, required: true },
    },
    { timestamps: true }
);

const BookModel = mongoose.models.Book || mongoose.model<Book>('Book', bookSchema);

export default BookModel;
