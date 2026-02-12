import Image from 'next/image'
import React from 'react'
import Book from '@/public/book.jpeg'


const Card = () => {
  return (
    <div className='flex justify-between w-80 border rounded-md py-4 px-2 items-center gap-2'>
        <div className="">
            <Image src={Book} alt='Book' height={0} width={0} loading='lazy'/>
        </div>
        <div className="flex flex-col  gap-2">
            <h3 className='text-2xl text-orange-600 font-bold'>Title</h3>
            <p className=''>Author</p>
            <button className='rounded-md border px-2 py-2  border-amber-600 hover:bg-amber-600'>Read More</button>
        </div>
    </div>
  )
}

export default Card