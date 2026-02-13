import { Book } from "@/app/types"
import Card from "./Card"



const BookList = ({books}: {books: Book[]}) => {

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3 justify-items-center items-stretch auto-rows-fr container mx-auto">
      {
        books.map((book) => {
          return <Card key={book._id} book={book} />
        })
      }</div>
  )
}

export default BookList