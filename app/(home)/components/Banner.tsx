import Image from 'next/image'
import book from '@/public/book.jpeg'

const Banner = () => {
    return (
        <div className='container mx-auto py-5'>
            <div className="relative ">
                <div className="h-50 bg-linear-to-r from-cyan-500 to-blue-500 w-full">

                </div>

                <div className="absolute right-5 bottom-8 inset-0 h-full w-full " />
                <Image src={book} alt='Book'
                    className='absolute bottom-0 right-5'
                    height={0}
                    width={0}
                    loading='lazy'
                />

                <h3 className='absolute left-10 top-1/2 font-semibold tracking-tight text-white text-5xl'>
                    Connect Share and Trade your Favorites Books
                </h3>

            </div>
        </div>
    )
}

export default Banner