import { Book } from "@/app/types"
import Card from "./Card"



const BookList = async () => {
  console.log(process.env.API_URL)
  const response = await fetch(`${process.env.API_URL}/books`)

  const books = await response.json();
  console.log(books)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4 md:gap-6 container mx-auto px-4 py-8">
      {
        books.map((book: Book) => {
          return <Card key={book._id} book={book} />
        })
      }
    </div>
  )
}

export default BookList