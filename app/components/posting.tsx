"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DeleteButton from "./deleteButton";
import axios from "axios";

interface Post {
  createdAt: string | number | Date;
  id: string;
  userId: string;
  userName: string;
  userImage: string | null;
  timeAgo: string;
  title: string;
  description: string;
  image?: string;
  type?: string;
}

interface User {
  id: string;
  name: string;
}

const ReactButton = () => {
  const [react, setReact] = useState<number>(0);

  const handleReact = () => {
    setReact(react + 1);
  };

  return (
    <button
      onClick={handleReact}
      className="px-4 py-2 bg-blue-200 text-blue-700 rounded-full hover:text-white hover:bg-[#3b82f6] transition-all duration-200"
    >
      Beri Reaksi {react}
    </button>
  );
};




export default function PostComponent({ posts, user }: { posts: Post[], user: User }) {
  const [filter, setFilter] = useState<string>("All");

  const hedleDelete = async () => {
    try {
      await axios.post(`/api/post/delete`, { userId: user.id });
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  }

  const sortedPosts = posts.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const filteredPosts = sortedPosts.filter(
    (post) => filter === "All" || post.type === filter
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-4 mx-auto">
        <div className="flex mx-auto justify-around md:gap-10 md:max-w-2xl mt-20 ">
          <button
            className={`sm:px-4 sm:py-2 px-2 py-1 rounded-full transition-none ${
              filter === "All"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-[#bfdbfe] hover:text-blue-700 transition-all duration-100"
            }`}
            onClick={() => setFilter("All")}
          >
            All
          </button>

          <button
            className={`sm:px-4 sm:py-2 px-2 py-1 rounded-full transition-none ${
              filter === "Kehilangan Barang"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-[#bfdbfe] hover:text-blue-700 transition-all duration-100"
            }`}
            onClick={() => setFilter("Kehilangan Barang")}
          >
            Kehilangan Barang
          </button>

          <button
            className={`sm:px-4 sm:py-2 px-2 py-1 rounded-full transition-none ${
              filter === "Penemuan Barang"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-[#bfdbfe] hover:text-blue-700 transition-all duration-100"
            }`}
            onClick={() => setFilter("Penemuan Barang")}
          >
            Penemuan Barang
          </button>
        </div>

        <div className="mt-6 space-y-4 flex flex-col items-center">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-4 items-center justify-center rounded-lg shadow md:max-w-2xl max-w-full w-full"
            >
              <div className="flex items-center mb-2">
                <Image
                  width={32}
                  height={32}
                  src={post.userImage || "/default-image.png"}
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
                    width={300}
                    height={200}
                    src={post.image}
                    alt="Post Image"
                    className="mt-2 rounded-lg object-cover w-full max-h-full"
                  />
                )}
              </div>

              <div className="flex justify-between mt-4">
                <ReactButton />
                {user.name === post.userName &&}
                <DeleteButton onDelete={hedleDelete} />
                <Link href={`/post/${post.id}`}>
                  <button className="px-4 py-2 bg-blue-200 text-blue-700 rounded-full hover:text-white hover:bg-[#3b82f6] transition-all duration-200">
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
