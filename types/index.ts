export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Book {
    _id: string;
    title: string;
    author: User | string;
    genre: string;
    description: string;
    coverImage: string;
    bookPdf: string;
    createdAt?: Date;
    updatedAt?: Date;
}
