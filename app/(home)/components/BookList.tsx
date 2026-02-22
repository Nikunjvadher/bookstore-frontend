import connectDB from "@/lib/db"
import BookModel from "@/models/Book"
import UserModel from "@/models/User"
import Card from "./Card"

const BookList = async () => {
  try {
    await connectDB();
    const books = await BookModel.find().populate('author', 'name').lean();

    if (!Array.isArray(books) || books.length === 0) {
      return (
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 text-center">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 max-w-md mx-auto">
            <svg className="w-12 h-12 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">No Books Available</h3>
            <p className="text-slate-600">Check back later for our collection.</p>
          </div>
        </div>
      )
    }

    // Convert _id to string for serialization
    const serializedBooks = JSON.parse(JSON.stringify(books));

    return (
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {
          serializedBooks.map((book: any) => {
            return <Card key={book._id} book={book} />
          })
        }
      </div>
    )
  } catch (error) {
    console.error('Error fetching books:', error)
    return (
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 text-center">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-8 max-w-md mx-auto">
          <svg className="w-12 h-12 text-amber-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-semibold text-amber-800 mb-2">Unable to Load Books</h3>
          <p className="text-amber-700">Please try again later.</p>
        </div>
      </div>
    )
  }
}

export default BookList
