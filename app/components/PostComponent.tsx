"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { deleteButton } from "@/lib/action";
import { useEdgeStore } from "../lib/edgeStore";
import ReactButton from "./ReactButton";
import Dropdown from "./Dropdown";
import Footer from "./Footer";
import { timeAgo } from "@/lib/utils";

interface Post {
  like: [];
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

  const handleShare = async (
    postId: string,
    title: string,
    imageUrl: string
  ) => {
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

  const filterbyLike = (a: Post, b: Post) => {
    return b.like.length - a.like.length;
  };

  const sortedPosts = posts.sort((a, b) => {
    if (filter === "Most Liked") {
      return filterbyLike(a, b);
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const filteredPosts = sortedPosts.filter((post) => {
    if (filter === "All") return true;
    if (filter === "Lost & Found")
      return (
        post.type === "Kehilangan Barang" || post.type === "Penemuan Barang"
      );
    if (filter === "Most Liked") return filterbyLike;
    return post.type === filter;
  });

  const truncateDescription = (description: string) => {
    return description.length > 100
      ? description.slice(0, 100) + "..."
      : description;
  };

  return (
    <div className="min-h-screen bg-[#d0f0fb] pb-10">
      <div className="w-full max-w-3xl p-4 mb-10 mx-auto">
        {/* Filter buttons */}
        <div className="flex mx-auto whitespace-nowrap lg:justify-center overflow-x-auto justify-between gap-2  md:gap-10 md:max-w-2xl hide-scrollbar">
          <button
            className={`lg:py-2 lg:px-8 px-5 py-1 rounded-3xl font-semibold transition-none ${
              filter === "All"
                ? "bg-[#897f7f] text-white"
                : "bg-[#69c3f0] text-white hover:bg-[#5aa7ce] transition-all duration-100"
            }`}
            onClick={() => setFilter("All")}
          >
            All
          </button>
          <button
            className={`lg:py-2 lg:px-8 px-3 py-1 rounded-3xl font-semibold transition-none ${
              filter === "Most Liked"
                ? "bg-[#897f7f] text-white"
                : "bg-[#69c3f0] text-white hover:bg-[#5aa7ce] transition-all duration-100"
            }`}
            onClick={() => setFilter("Most Liked")}
          >
            Most Liked
          </button>
          <button
            className={`lg:py-2 lg:px-8 px-2 py-1 rounded-3xl font-semibold transition-none ${
              filter === "Lost & Found"
                ? "bg-[#897f7f] text-white"
                : "bg-[#69c3f0] text-white hover:bg-[#5aa7ce] transition-all duration-100"
            }`}
            onClick={() => setFilter("Lost & Found")}
          >
            Lost & Found
          </button>

          <button
            className={`lg:py-2 lg:px-8 rounded-3xl px-3 py-1 font-semibold transition-none ${
              filter === "Kerusakan Fasilitas"
                ? "bg-[#897f7f] text-white"
                : "bg-[#69c3f0] text-white hover:bg-[#5aa7ce] transition-all duration-100"
            }`}
            onClick={() => setFilter("Kerusakan Fasilitas")}
          >
            Facilites
          </button>
        </div>

        <div className="mt-4 space-y-8 flex flex-col items-center">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white relative p-4 pb-11 items-center justify-center rounded-3xl shadow-lg md:max-w-2xl max-w-full w-full transition-transform transform duration-200 ease-in-out"
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
                    <p className="text-xs text-gray-500">
                      {timeAgo(new Date(post.createdAt).toISOString())}
                    </p>
                  </div>
                </div>

                <Dropdown
                  onDelete={() => handleDelete(post.id, post.image || "/s")}
                  onShere={() =>
                    handleShare(post.id, post.title, post.image || "/s")
                  }
                  userId={user.id}
                  postId={post.userId}
                  userName={user.name}
                />
              </div>
              <Link href={`/post/${post.id}`}>
                <h3 className="text-lg font-semibold">{post.title}</h3>
              </Link>
              <p className="text-sm text-gray-700">
                {truncateDescription(post.description)}
              </p>
              {post.image && (
                <Link href={`/post/${post.id}`}>
                  <Image
                    width={800}
                    height={500}
                    src={post.image}
                    alt="Post Image"
                    className="mt-2 rounded-lg object-cover w-full lg:max-h-[650px] max-h-[400px]"
                  />
                </Link>
              )}

              {/* button */}

              <div className="absolute w-full bottom-[-20px] flex justify-center">
                <div className="flex lg:mr-5 mr-6 lg:max-w-sm max-w-6 gap-5 lg:gap-5 w-full justify-center mt-4">
                  <ReactButton
                    userId={user.id}
                    postId={post.id}
                    userName={user.name}
        
                  />
                  <Link href={`/post/${post.id}`}>
                    <button className="min-w-[130px] flex-1 lg:min-h-11 min-h-9 bg-[#69c3f0] text-white rounded-2xl hover:text-white hover:bg-[#3b82f6] transition-all font-semibold duration-200">
                      Komentar
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer className="fixed mt-4" />
    </div>
  );
}
