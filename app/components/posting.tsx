"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { deleteButton } from "@/lib/action";

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

const Dropdown = ({ onDelete, onDownload }: { onDelete: () => void; onDownload: () => void }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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
          open ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        style={{ transformOrigin: 'top right' }}
      >
        <button
          onClick={onDelete}
          className="block px-4 py-2 text-left text-red-600 hover:bg-red-100 w-full"
        >
          Hapus
        </button>
        <button
          onClick={onDownload}
          className="block px-4 py-2 text-left text-blue-600 hover:bg-blue-100 w-full"
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default function PostComponent({
  posts,
  user,
  fetch,
}: {
  posts: Post[];
  user: User;
  fetch: () => void;
}) {
  const [filter, setFilter] = useState<string>("All");

  const handleDelete = async (postId: string) => {
    try {
      console.log("Deleting post...", postId);
    const result = await deleteButton(postId, user.id);
    if (result === "post deleted") {
        fetch(); 
      }

    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleDownload = (postId: string) => {
    console.log("Downloading post content:", postId);

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
      <div className="w-full max-w-md p-4 mx-auto">
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
              className="bg-white p-4 items-center justify-center rounded-lg shadow md:max-w-2xl max-w-full w-full"
            >
              <div className="flex items-center mb-2 justify-between">
                <div className="flex items-center">
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
                {(user.name === post.userName || user.name === "Admin") && (
                  <Dropdown
                    onDelete={() => handleDelete(post.id)}
                    onDownload={() => handleDownload(post.id)}
                  />
                )}
              </div>
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-700">
                {truncateDescription(post.description)}
              </p>
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
