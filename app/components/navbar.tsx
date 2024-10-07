"use client";
import { FaBell, FaSearch } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { AvatarDropdown } from "./AvatarDropdown";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Navbar() {

  const [loading , setLoading] = useState(true);
  interface User {
    id: string;
    name: string;
    email: string;
    image: string;
  }

  const [user, setUser] = useState<User | null>(null);
  const { data: session } = useSession();
  
  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.id) {
        const result = await axios.post(`/api/userData/`, { id: session.user.id });
        setUser(result.data);
        setLoading(false);
      }
    };
    fetchData();
  }, [session]);



  const profilepic = loading ? "" : user?.image || "";

  
  return (
    <div className="w-full h-20 fixed bg-white shadow-sm py-6 px-4 flex items-center justify-between">
      <div className="flex items-center">
        <AvatarDropdown image={profilepic} name={user?.name || ""}/>
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
