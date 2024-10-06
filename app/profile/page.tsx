"use client";

import Profile from "../components/profile";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Loading from "../components/Loading";

interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  prodi: string;
  angkatan: string;
  posts: [];
}

export default function ProfilePage() {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | undefined>();

  const fetchData = async () => {
    try {
      if (session?.user?.id) {
        const result = await axios.post(`/api/userData`, {
          id: session.user.id,
        });
        console.log(result.data);
        setUser(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const laporan = user?.posts.length

  useEffect(() => {
    fetchData();
  }, [session]);

  return (
    <div className="min-h-dvh">
      {user ? (
        <Profile
          nama={user.name}
          prodi={user.prodi}
          image={user.image}
          angkatan={user.angkatan}
          email={user.email}
            laporan={laporan}
        />
      ) : (
        <Loading />
      )}
    </div>
  );
}
