import Image from 'next/image'
import { Book } from '@/app/types'
import Link from 'next/link'


const Card = ({ book }: { book: Book }) => {
  return (
    <div className='flex flex-col sm:flex-row border rounded-lg p-4 md:p-5 shadow-md gap-4 sm:gap-5 h-68'>
      <div className="relative w-full sm:w-40 h-48 sm:h-auto shrink-0">
        <Image
          src={book.coverImage}
          alt={book.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover rounded-md"
          loading='lazy'
        />
      </div>
      <div className="flex flex-col gap-2 grow">
        <h3 className='text-lg md:text-xl text-orange-600 font-bold line-clamp-2'>{book.title}</h3>
        <p className='text-base md:text-lg font-semibold line-clamp-2'>{book.author.name}</p>
        <p className='text-sm text-gray-600 line-clamp-3'>{book.description}</p>
        <Link href={`/books/${book._id}`} className='rounded-md border px-3 py-2 w-fit text-sm md:text-base border-amber-600 hover:bg-amber-600 hover:text-white mt-auto'>Read More</Link>
      </div>
    </div>
  )
}

export default Card

