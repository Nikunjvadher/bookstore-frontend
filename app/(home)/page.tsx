import React, { Suspense } from 'react'
import Banner from './components/Banner'
import BookList from './components/BookList'
import SkeletonCard from './components/SkeletonCard'

const page = async () => {
  return (
    <div>
      <Banner />
      <Suspense fallback={
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {Array(6).fill(0).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      }>
        <BookList />
      </Suspense>
    </div>
  )
}

export default page