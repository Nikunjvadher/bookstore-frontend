import { Book } from "@/app/types"
import Card from "./Card"



const BookList = async () => {
  // Check if API URL is defined
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  if (!apiUrl) {
    console.error('NEXT_PUBLIC_API_URL is not defined')
    return (
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 text-center">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md mx-auto">
          <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="text-lg font-semibold text-red-800 mb-2">Configuration Error</h3>
          <p className="text-red-600">API URL is not configured. Please check your environment variables.</p>
        </div>
      </div>
    )
  }

  try {
    const response = await fetch(`${apiUrl}/books`, {
      // Add cache control for static generation
      next: { revalidate: 60 }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch books: ${response.status}`)
    }

    const books = await response.json();

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

    return (
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {
          books.map((book: Book) => {
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
