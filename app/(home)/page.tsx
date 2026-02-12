import React from 'react'
import Banner from './components/Banner'
// import Card from './components/Card'
import BookList from './components/BookList'

const page = async () => {

  const response = await fetch(`${process.env.API_URL}/books`)
  const book = response.json();
  console.log(response)
  console.log(book)


  return (
    <div>
      <Banner />
      {/* <Card /> */}
      <BookList />
    </div>
  )
}

export default page