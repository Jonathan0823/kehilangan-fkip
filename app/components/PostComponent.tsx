"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { deleteButton } from "@/lib/action";
import { useEdgeStore } from "../lib/edgeStore";
import ReactButton from "./ReactButton";
import Dropdown from "./Dropdown";
import Footer from "./Footer";

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
  author: {
    image: string | null;
    name: string;
  };
}

interface User {
  id: string;
  name: string;
}

export default function PostComponent({
  posts,
  user,
  fetchPosts,
}: {
  posts: Post[];
  user: User;
  fetchPosts: () => void;
}) {
  const [filter, setFilter] = useState<string>("All");
  const { edgestore } = useEdgeStore();

  const handleDelete = async (postId: string, postImage: string) => {
    try {
      const result = await deleteButton(postId, user.id);
      if (result === "post deleted") {
        fetchPosts();
      }
      await edgestore.publicFiles.delete({ url: postImage });
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleShare = async (postId: string, title: string, imageUrl: string) => {
    const url = `https://kehilangan-fkip.vercel.app/post/${postId}`;
    if (navigator.share) {
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], "image.jpg", { type: blob.type });
        await navigator.share({
          title: title,
          url: url,
          files: [file],
        });
        console.log("Post shared successfully");
      } catch (error) {
        console.log("Error sharing post:", error);
      }
    } else {
      window.open(url, "_blank");
    }
  };

  const sortedPosts = posts.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const filteredPosts = sortedPosts.filter(
    (post) => filter === "All" || post.type === filter
  );

  const truncateDescription = (description: string) => {
    return description.length > 100
      ? description.slice(0, 100) + "..."
      : description;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-4 mb-10 mx-auto">
        {/* Filter buttons */}
        <div className="flex mx-auto justify-around md:gap-10 md:max-w-2xl">
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

          <button
            className={`sm:px-4 sm:py-2 px-2 py-1 rounded-full transition-none ${
              filter === "Kerusakan Fasilitas"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-[#bfdbfe] hover:text-blue-700 transition-all duration-100"
            }`}
            onClick={() => setFilter("Kerusakan Fasilitas")}
          >
            Kerusakan Fasilitas
          </button>

        </div>

        <div className="mt-6 space-y-4 flex flex-col items-center">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-4 items-center justify-center rounded-lg shadow-lg md:max-w-2xl max-w-full w-full transition-transform transform duration-200 ease-in-out"
            >
              <div className="flex items-center mb-2 justify-between">
                <div className="flex items-center">
                  <Image
                    width={32}
                    height={32}
                    src={post.author.image || "/default-image.png"}
                    alt="User Profile"
                    className="h-8 w-8 rounded-full"
                  />
                  <div className="ml-2">
                    <h2 className="text-sm font-bold">{post.author.name}</h2>
                    <p className="text-xs text-gray-500">{post.timeAgo}</p>
                  </div>
                </div>

                <Dropdown
                  onDelete={() => handleDelete(post.id, post.image || "/s")}
                  onShere={() => handleShare(post.id, post.title, post.image || "/s")}
                  userId={user.id}
                  postId={post.userId}
                  userName={user.name}
                />
              </div>
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-700">
                {truncateDescription(post.description)}
              </p>
              {post.image && (
                <Image
                  width={800}
                  height={500}
                  src={post.image}
                  alt="Post Image"
                  className="mt-2 rounded-lg object-cover w-full max-h-full"
                />
              )}

              <div className="flex justify-between mt-4">
                <ReactButton userId={user.id} postId={post.id} userName={user.name} />
                <Link href={`/post/${post.id}`}>
                  <button className="px-4 py-3 bg-blue-200 text-blue-700 rounded-full hover:text-white hover:bg-[#3b82f6] transition-all duration-200">
                    Komentar
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer className="fixed mt-4" />
    </div>
  );
}
