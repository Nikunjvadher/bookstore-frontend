

import Button from "@/app/component/Button";
import Image from "next/image"

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  console.log(id)
  const response = await fetch(`${process.env.API_URL}/books/${id}`);
  const book = await response.json();
  console.log(book.bookPdf);
  return (

    <div className="container mx-auto flex justify-around px-5 py-10">
      <div className="gap-2 flex flex-col  ">
        <h2 className="text-4xl font-semibold">{book.title}</h2>
        <p className="font-bold ">by {book.author?.name}</p>
        <p>{book.description}</p>
        <Button link={book?.bookPdf}/>
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