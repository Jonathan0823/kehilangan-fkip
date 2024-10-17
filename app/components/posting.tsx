"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { deleteButton } from "@/lib/action";
import { useEdgeStore } from "../lib/edgeStore";
import axios from "axios";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
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

const ReactButton = ({
  userId,
  postId,
}: {
  userId: string;
  postId: string;
}) => {
  const checkLikes = async () => {
    const response = await axios.get(`/api/likes`);
    const likes = response.data;
    setLikes(likes);
    setLiked(
      likes.some(
        (like: { userId: string; postId: string }) =>
          like.userId === userId && like.postId === postId
      )
    );
  };

  useEffect(() => {
    checkLikes();
  }, []);

  const [likes, setLikes] = useState<{ userId: string; postId: string }[]>([]);
  const [liked, setLiked] = useState(false);

  const handleReact = async () => {
    if (!liked) {
      await axios.post("/api/likes/like", { userId, postId });
    } else {
      await axios.post("/api/likes/unlike", { userId, postId });
    }
    checkLikes();
  };

  const filteredLikes = likes.filter((like) => like.postId === postId).length;

  return (
    <div>
      {liked ? (
        <button
          onClick={handleReact}
          className="px-4 py-2 bg-[#3b82f6] pb-3 items-center justify-center text-white rounded-full hover:text-blue-700 hover:bg-blue-200 transition-all duration-200 flex gap-3"
        >
          <AiFillLike className="w-5 h-5"/> <p className="text-lg">{filteredLikes}</p> 
        </button>
      ) : (
        <button
          onClick={handleReact}
          className="px-4 py-2 bg-blue-200 pb-3 items-center justify-center text-blue-700 rounded-full hover:text-white hover:bg-[#3b82f6] transition-all duration-200 flex gap-3"
        >
          <AiOutlineLike className=" w-5 h-5" /> <p className="text-lg">{filteredLikes}</p>
        </button>
      )}
    </div>
  );
};

const Dropdown = ({
  onDelete,
  onShere,
  userId,
  postId,
  userName,
}: {
  onDelete: () => void;
  onShere: () => void;
  userId: string;
  postId: string;
  userName: string;
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full hover:bg-[#bfdbfe] hover:text-blue-700 transition-all duration-200"
      >
        ⋮
      </button>
      <div
        className={`absolute right-0 mt-2 bg-white border rounded-lg shadow-lg transition-transform transform duration-300 ease-in-out ${
          open ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        style={{ transformOrigin: "top right" }}
      >
        {(postId === userId || userName === "Admin") && (
          <button
            onClick={onDelete}
            className="block px-8 py-2 text-left text-red-600 hover:bg-red-100 rounded-lg w-full"
          >
            Delete
          </button>
        )}

        <button
          onClick={onShere}
          className="block px-8 py-2 text-left text-blue-600 hover:bg-blue-100 rounded-lg w-full"
        >
          Share
        </button>
      </div>
    </div>
  );
};

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
      <div className="w-full max-w-3xl p-4 mx-auto">
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
                  onShere={() =>
                    handleShare(post.id, user.name, post.image || "/s")
                  }
                  userId={user.id}
                  postId={post.userId}
                  userName={user.name}
                />
              </div>
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-700">
                {truncateDescription(post.description)}
              </p>
              <div className="flex justify-center mt-4">
                {post.image && (
                  <Image
                    width={800}
                    height={500}
                    src={post.image}
                    alt="Post Image"
                    className="mt-2 rounded-lg object-cover w-full max-h-full"
                  />
                )}
              </div>

              <div className="flex justify-between mt-4">
                <ReactButton userId={user.id} postId={post.id} />

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
      <Footer/>
    </div>
  );
}
