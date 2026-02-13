import Image from 'next/image'
import { Book } from '@/app/types'
import Link from 'next/link'


const Card = ({ book }: { book: Book }) => {
  return (
    <div className='flex w-120 max-w-fit border rounded-md p-5 shadow-md  gap-5 flex-1'>
      <Image src={book.coverImage} alt={book.title} height={0} width={0} sizes='100vw' style={{width:"12rem" , height:"auto"}} loading='lazy' />
      <div className="flex flex-col gap-2">
        <h3 className='text-xl text-orange-600 font-bold line-clamp-2 '>{book.title}</h3>
        <p className=''>{book.author.name}</p>
        <Link href={`/books/${book._id}`} className='rounded-md border px-2 py-2 w-fit  border-amber-600 hover:bg-amber-600 hover:text-white'>Read More</Link>
      </div>
    </div>
  )
}

export default Card