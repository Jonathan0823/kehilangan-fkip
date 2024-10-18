"use client";
import { FaSearch } from "react-icons/fa";
import { AvatarDropdown } from "./AvatarDropdown";
import React from "react";
import NotificationDropdown from "./notif";


interface User {
  image: string; 
  name: string;  
}

interface NavbarProps {
  user: User | null; 
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const profilepic = user?.image || "";

  console.log(user); 

  return (
    <div className= "sticky top-0 z-50 p-4 md:min-w-full w-full md:h-20 h-14 bg-white shadow-sm py-6 px-4 flex items-center justify-between">
      <div className="flex items-center">
        <AvatarDropdown image={profilepic} name={user?.name || ""} />
      </div>

      <div className="flex-grow text-center">
        <h1 className="text-lg font-semibold">Beranda</h1>
      </div>
      <div className="flex items-center space-x-4">
        <FaSearch className="h-6 w-6 text-gray-700" />
        <NotificationDropdown/>
      </div>
    </div>
  );
}

export default Navbar;
