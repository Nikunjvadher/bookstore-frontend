import { Book } from "@/app/types"
import Card from "./Card"



const BookList = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`)

  const books = await response.json();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 md:gap-6 container mx-auto px-4 py-8">
      {
        books.map((book: Book) => {
          return <Card key={book._id} book={book} />
        })
      }
    </div>
  )
}

export default BookList