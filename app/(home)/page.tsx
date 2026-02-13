import React from 'react'
import Banner from './components/Banner'
// import Card from './components/Card'
import BookList from './components/BookList'

const page = async () => {

  console.log(process.env.API_URL)
  const response = await fetch(`${process.env.API_URL}/books`)

  const books = await response.json();
  console.log(books)

  return (
    <div>
      <Banner />
      {/* <Card /> */}
      <BookList books={books} />
    </div>
  )
}

export default page