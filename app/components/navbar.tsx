"use client";
import { FaBell, FaSearch } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { AvatarDropdown } from "./AvatarDropdown";

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <div className="w-full fixed bg-white shadow-sm py-6 px-4 flex items-center justify-between">
      <div className="flex items-center">
      {session && <p className="text-xs text-black">Halo, {session.user?.name}</p>}
        <AvatarDropdown />
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
