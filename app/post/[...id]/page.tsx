"use client";
import Loading from "@/app/components/Loading";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Postingan = ({ params }: { params: { id: string } }) => {
  const [loading, setLoading] = useState<boolean>(true);
  interface Post {
    id: string;
    userImage?: string;
    userName: string;
    timeAgo: string;
    title: string;
    description: string;
    image?: string;
  }

  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/postDetail/${params.id}`);
        console.log("Fetched Post:", response.data);
        setPost(response.data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [params.id]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex w-full justify-center items-center">
          <div
            key={post?.id}
            className="bg-white p-4 items-center justify-center rounded-lg shadow md:max-w-2xl max-w-full w-full"
          >
            <div className="flex items-center mb-2">
              <Image
                width={32}
                height={32}
                src={post?.userImage || "/default-image.png"}
                alt="User Profile"
                className="h-8 w-8 rounded-full"
              />
              <div className="ml-2">
                <h2 className="text-sm font-bold">{post?.userName}</h2>
                <p className="text-xs text-gray-500">{post?.timeAgo}</p>
              </div>
            </div>

            <h3 className="text-lg font-semibold">{post?.title}</h3>
            <p className="text-sm text-gray-700">{post?.description}</p>
            <div className="flex justify-center mt-4">
              {post?.image && (
                <Image
                  width={200}
                  height={200}
                  src={post.image}
                  alt="Post Image"
                  className="mt-2 justify-center flex rounded-lg"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Postingan;
