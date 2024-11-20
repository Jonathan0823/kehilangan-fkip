"use client";
import Navbar from '@/app/components/navbar';
import PostComponent from '@/app/components/PostComponent'; 
import Loading from '../components/Loading';
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import axios from "axios";

export default function Post() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{id:string, name: string; email: string; image: string } | null>(null);
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();
  
  const fetchData = async () => {
    setLoading(true);
    const guestUser = {id: "0", name: "Guest", email: "guest@localhost", image: "https://files.edgestore.dev/kuv2nfpuzfcwru31/publicFiles/_public/794938e8-65bb-429a-a32d-57576af84a40.png" };
    
    try {
      const [userResult, postResult] = await Promise.all([
        axios.get(`/api/getUser/${session?.user.id}`),
        axios.get("/api/postList")
      ]);
      setUser(userResult.data);
      setPosts(postResult.data);
      console.log("Post data:", postResult.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      if (!session?.user?.id) {
        setUser(guestUser);
        setLoading(false);
        return;
      }
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    fetchData();
  }, [session?.user?.id]); 

  if (loading) {  
    return <Loading />;
  }

  return (
    <div>
      <Navbar user={user} />
      {user && <PostComponent fetchPosts={fetchData} posts={posts} user={user} />} 
    </div>
  );
}
