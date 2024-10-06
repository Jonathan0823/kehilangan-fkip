"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Loading from "./Loading";
import axios from "axios";

interface Post {
  userId: string;
  userName: string;
  userImage: string;
  timeAgo: string;
  title: string;
  description: string;
  image?: string;
  type?: string;
}

export default function Post() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState<string>("All");
  const [loading, setLoading] = useState<boolean>(true);
  const [react, setReact] = useState<number>(0);
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const types = filter === "All" ? ["Lost & Found", "Facilities"] : [filter];
        const response = await axios.get(`http://localhost:5555/post/${types}`);

        setPosts(response.data);
        console.log("Fetched Posts:"); 
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load posts. Please try again."); 
      } finally {
        setLoading(false);
      }
    };
    

    fetchPosts();
  }, [filter]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>; 
  }

  const handleReact = () => {
    setReact(react + 1);
  };

  const filteredPosts = posts.filter(
    (post) => filter === "All" || post.type === filter
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-full md:max-w-full max-w-md p-4">
        <div className="flex justify-around mt-20 z-10">
          <button
            className={`px-4 py-2 rounded-full ${
              filter === "All" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setFilter("All")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded-full ${
              filter === "Lost & Found" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setFilter("Lost & Found")}
          >
            Lost & Found
          </button>
          <button
            className={`px-4 py-2 rounded-full ${
              filter === "Facilities" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setFilter("Facilities")}
          >
            Facilities
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {filteredPosts.map((post, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center mb-2">
                <Image
                  width={32}
                  height={32}
                  src={post.userImage}
                  alt="User Profile"
                  className="h-8 w-8 rounded-full"
                />
                <div className="ml-2">
                  <h2 className="text-sm font-bold">{post.userName}</h2>
                  <p className="text-xs text-gray-500">{post.timeAgo}</p>
                </div>
              </div>

              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-700">{post.description}</p>
              <div className="flex justify-center mt-4">
                {post.image && (
                  <Image
                    width={200}
                    height={200}
                    src={post.image}
                    alt="Post Image"
                    className="mt-2 justify-center flex rounded-lg"
                  />
                )}
              </div>

              <div className="flex justify-between mt-4">
                <button onClick={handleReact} className="px-4 py-2 bg-blue-200 text-blue-700 rounded-full">
                  Beri Reaksi {react}
                </button>
                <Link href={`/post/${index}`}>
                  <button className="px-4 py-2 bg-blue-200 text-blue-700 rounded-full">
                    Komentar
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
