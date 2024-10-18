"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import HistoryCard from "../components/historyCard";


const HistoryPage = () => {
    const { data: session } = useSession();
    const [posts, setPosts] = useState<{ id: string; title: string; description: string; image: string; date: string }[]>([]);
    const fecthData = async () => {
        try{
            const result = await axios.get(`/api/getUser/${session?.user.id}`)
            setPosts(result.data.posts)
        }catch(e){
            console.log(e)
        }
    }
    useEffect(() => {
        if (session?.user.id) {
            fecthData();
        }
    }, [session?.user.id]);
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl text-center font-bold mb-6">History Postingan</h1>
      {posts.map((post) => (
        <HistoryCard
          key={post.id}
          title={post.title}
          content={post.description}
          image={post.image}
          date={post.date}
        />
      ))}
    </div>
  );
};

export default HistoryPage;
