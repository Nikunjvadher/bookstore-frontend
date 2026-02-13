export interface Book {
    _id:string;
    title:string;
    description:string;
    coverImage:string;
    bookPdf:string;
    author:Author;
}

export type Author = {
    name:string;
}