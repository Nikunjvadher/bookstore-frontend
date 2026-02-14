import { Book } from "@/app/types"
import Card from "./Card"



const BookList = async () => {
  console.log(process.env.API_URL)
  const response = await fetch(`${process.env.API_URL}/books`)

  const books = await response.json();
  console.log(books)

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3 justify-items-center items-stretch auto-rows-fr container mx-auto py-5">
      {
        books.map((book : Book) => {
          return <Card key={book._id} book={book} />
        })
      }</div>
  )
}

export default BookList