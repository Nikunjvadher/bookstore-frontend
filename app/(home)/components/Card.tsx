import Image from 'next/image'
import { Book } from '@/app/types'
import Link from 'next/link'


const Card = ({ book }: { book: Book }) => {
  return (
    <div className='flex flex-col sm:flex-row border rounded-lg p-3 md:p-5 shadow-md gap-3 sm:gap-5 h-auto sm:h-68'>
      <div className="relative w-full sm:w-40 h-56 sm:h-48 shrink-0 rounded-md overflow-hidden">
        <Image
          src={book.coverImage}
          alt={book.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          loading='lazy'
        />
      </div>
      <div className="flex flex-col gap-1.5 sm:gap-2 grow">
        <h3 className='text-base md:text-lg lg:text-xl text-orange-600 font-bold line-clamp-2'>{book.title}</h3>
        <p className='text-sm md:text-base font-semibold line-clamp-1'>{book.author.name}</p>
        <p className='text-xs md:text-sm text-gray-600 line-clamp-2 sm:line-clamp-3'>{book.description}</p>
        <Link href={`/books/${book._id}`} className='rounded-md border px-2 py-1.5 sm:px-3 sm:py-2 w-fit text-xs sm:text-sm border-amber-600 hover:bg-amber-600 hover:text-white mt-2 sm:mt-auto'>Read More</Link>
      </div>
    </div>
  )
}

export default Card

