import React, { Suspense } from 'react'
import Banner from './components/Banner'
// import Card from './components/Card'
import BookList from './components/BookList'

const page = async () => {


  return (
    <div>
      <Banner />
      {/* <Card /> */}
      <Suspense fallback={<div>Loading...</div>}>

        <BookList />
      </Suspense>
    </div>
  )
}

export default page