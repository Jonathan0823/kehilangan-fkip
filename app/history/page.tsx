"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import HistoryCard from "../components/historyCard";
import Footer from "../components/Footer";
import Link from "next/link";

const HistoryPage = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<
    {
      id: string;
      title: string;
      description: string;
      image: string;
      date: string;
    }[]
  >([]);
  const fecthData = async () => {
    try {
      const result = await axios.get(`/api/getUser/${session?.user.id}`);
      setPosts(result.data.posts);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (session?.user.id) {
      fecthData();
    }
  }, [session?.user.id]);

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg p-6 text-center">
          <h2 className="text-xl font-bold mb-4">Tidak Ada Postingan</h2>
          <p className="text-gray-600 mb-4">
            Saat ini, kamu belum memiliki postingan. Silakan laporkan jika menemukan barang hilang, Kerusakan fasilitas, atau hal lainnya.
          </p>{" "}
          <Link href="/Laporan">
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Buat Postingan Baru
            </button>{" "}
          </Link>
        </div>
        <Footer className="fixed" />
      </div>
    );
  }

  return (
    <div>
      <div className="min-h-dvh bg-gray-100 p-6">
        <h1 className="text-2xl text-center font-bold mb-6">
          History Postingan
        </h1>
        {posts.map((post) => (
          <HistoryCard
            key={post.id}
            title={post.title}
            content={post.description}
            image={post.image}
            userId={session?.user.id || ""}
            postId={post.id}
            username={session?.user.name || ""}
            date={post.date}
            fetchPosts={fecthData}
          />
        ))}
      </div>
      <Footer className="fixed" />
    </div>
  );
};

export default HistoryPage;
