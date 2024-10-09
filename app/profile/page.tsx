"use client";

import Profile from "../components/profile";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Loading from "../components/Loading";
import { getProfile } from "@/lib/action"; 

interface User {
  id: string;
  name: string | null; 
  email: string;
  image: string | null;
  prodi: string | null;
  angkatan: string | null;
  posts: {
    id: string;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    userName: string;
    userImage: string | null;
    timeAgo: string;
    title: string;
    description: string;
    type: string | null;
    date: string | null;
  }[];
}

export default function ProfilePage() {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session?.user?.id) {
          const result = await getProfile(session.user.id);
          console.log(result);
          if (result) {
            setUser(result);
          } else {
            setUser(null);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [session?.user.id]);

  const laporan = user?.posts?.length ?? 0;

  return (
    <div className="min-h-dvh">
      {user ? (
        <Profile
          id={user.id}
          nama={user.name ?? "Tidak ada nama"} 
          prodi={user.prodi ?? "Tidak ada prodi"}
          image={user.image ?? "/user.png"}
          angkatan={user.angkatan ?? "Tidak ada angkatan"}
          email={user.email}
          laporan={laporan.toString()}
        />
      ) : (
        <Loading />
      )}
    </div>
  );
}
