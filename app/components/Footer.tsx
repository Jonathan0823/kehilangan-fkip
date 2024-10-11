import { FaHome, FaHistory, FaSearch, FaBell, FaUser } from "react-icons/fa";
import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <div className="bg-sky-400 fixed bottom-0 w-full h-14 flex justify-around items-center py-2">
      <Link href="/">
        <FaHome className="text-black text-2xl" />
      </Link>
      <Link href="/history">
        <FaHistory className="text-black text-2xl" />
      </Link>
      <Link href="/search">
        <FaSearch className="text-black text-2xl" />
      </Link>
      <Link href="/notif">
      <FaBell className="text-black text-2xl" />
      </Link>
      <Link href="/profile">
      <FaUser className="text-black text-2xl" />
      </Link>
     
    </div>
  );
};

export default Footer;
