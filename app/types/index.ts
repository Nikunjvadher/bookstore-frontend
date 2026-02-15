export interface Book {
    _id: string;
    title: string;
    description: string;
    coverImage: string;
    bookPdf: string;
    author: Author;
    genre?: string;
    createdAt?: string;
    updatedAt?: string;
}

export type Author = {
    _id?: string;
    name: string;
}

export interface User {
    _id: string;
    name: string;
    email: string;
}
