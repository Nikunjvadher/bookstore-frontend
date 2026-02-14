import Image from "next/image"
import Link from "next/link"

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  console.log(id)
  const response = await fetch(`${process.env.API_URL}/books/${id}`);
  const book = await response.json();
  console.log(book);
  return (

    <div className="container mx-auto flex justify-around px-5 py-10">
      <div className="gap-2 flex flex-col  ">
        <h2 className="text-4xl font-semibold">{book.title}</h2>
        <p className="font-bold ">by {book.author?.name}</p>
        <p>{book.description}</p>
        {/* <Link href={book?.filePdf} className="py-2 px-3 border rounded-md border-primary-500  hover:bg-primary-500 hover:text-black w-fit">Download Book</Link> */}
      </div>

      <div className="flex justify-end">
        <Image
          src={book.coverImage}
          alt='Book'
          className=''
          height={100}
          width={180}
          loading='lazy'
        />
      </div>
    </div>
  )
}

export default page