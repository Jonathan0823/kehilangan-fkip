import { FaHome, FaHistory, FaSearch, FaBell, FaUser } from "react-icons/fa";
import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="bg-sky-400 fixed bottom-0 w-full flex justify-around items-center py-2">
    <FaHome className="text-black text-2xl" />
    <FaHistory className="text-black text-2xl" />
    <FaSearch className="text-black text-2xl" />
    <FaBell className="text-black text-2xl" />
    <FaUser className="text-black text-2xl" />
  </div>
  );
}

export default Footer;