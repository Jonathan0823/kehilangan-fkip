"use client";
import { FaBell, FaSearch } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { AvatarDropdown } from "./AvatarDropdown";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const { data: session } = useSession();
  const fetchData = async () => {
    if (session?.user?.id) {
      const result = await axios.post(`/api/userData/`, { id: session.user.id });
      setUser(result.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, [session]);

  return (
    <div className="w-full fixed bg-white shadow-sm py-6 px-4 flex items-center justify-between">
      <div className="flex items-center">
        {session && <p className="text-xs text-black">Halo, {session.user?.name}</p>}
        <AvatarDropdown image={user?.image} />
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
