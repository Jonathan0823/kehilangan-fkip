"use client";
import Navbar from '@/app/components/navbar';
import PostComponent from '@/app/components/posting'; 
import Loading from '../components/Loading';
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import axios from "axios";

export default function Post() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();

  const fetchData = async () => {
    if (!session?.user?.id) return;
    setLoading(true);
    try {
      const [userResult, postResult] = await Promise.all([
        axios.get(`/api/getUser/${session.user.id}`),
        axios.get("/api/postList")
      ]);
      setUser(userResult.data);
      setPosts(postResult.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };
  useEffect(() => {
    fetchData();
  }, [session]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Navbar user={user} />
      {user && <PostComponent fetchPosts={fetchData} posts={posts} user={user}  />} 
    </div>
  );
}
