import Link from "next/link";

const Laporan = () => {
  return (
<div className='bg-sky-300 flex flex-col items-center pb-20 justify-center min-h-screen'>
    <div className='flex flex-col space-y-4 text-center'>
        <Link href={"/"} className='bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'>
            Laporkan Fasilitas Buruk
        </Link>
        <Link href={"/"} className='bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'>
            Laporkan Kehilangan Barang
        </Link>
        <Link href={"/"} className='bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'>
            Laporkan Penemuan Barang
        </Link>
        <Link href={"/"} className='bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'>
            Laporan Fasilitas Buruk
        </Link>
    </div>
</div>

  );
};

export default Laporan;
