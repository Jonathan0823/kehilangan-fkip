"use client";
import Navbar from '@/app/components/navbar';
import PostComponent from '@/app/components/posting'; 
import Loading from '../components/Loading';
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import axios from "axios";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();

  const fetchUserData = async () => {
    if (!session?.user?.id) return;
    setLoading(true);
    try {
      const userResult = await axios.get(`/api/getUser/${session.user.id}`);
      setUser(userResult.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchPostsData = async () => {
    try {
      const postResult = await axios.get("/api/postList");
      setPosts(postResult.data);
    } catch (error) {
      console.error("Error fetching posts data:", error);
    } finally {
      setTimeout(() => {
        setLoading(false); 
      }, 500);
   
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchPostsData();
  }, [session]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Navbar user={user} />
      <PostComponent posts={posts} /> 
    </div>
  );
}
