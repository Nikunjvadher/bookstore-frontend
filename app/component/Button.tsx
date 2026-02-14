'use client';
const Button = ({link}: {link: string}) => {
    const handleDownload = () => {
        window.open(link, '_blank');
    }
  return (
    <button onClick={handleDownload} className='cursor-pointer rounded-md border px-2 py-2 w-fit  border-amber-600 hover:bg-amber-600 hover:text-white'>
        Download
    </button>
  )
}

export default Button;