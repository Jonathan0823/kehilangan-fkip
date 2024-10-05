
import Image from 'next/image';
import { FaBell, FaSearch } from "react-icons/fa";


export default function Navbar() {
  return (
    <div className="w-full fixed bg-white shadow-sm py-6 px-4 flex items-center justify-between">
      <div className="flex items-center">
        <Image
          src="/111233.png"
          alt="Profile"
          width={30}
            height={30}
            className="w-10 h-10 rounded-full object-cover" 
        />
      </div>

      <div className="flex-grow text-center">
        <h1 className="text-lg font-semibold">Beranda</h1>
      </div>

  
      <div className="flex items-center space-x-4">
        <FaSearch className="h-6 w-6 text-gray-700" />
        <FaBell className="h-6 w-6 text-gray-700" />
      </div>
    </div>
  );
}
