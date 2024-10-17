"use client";
import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import BackButton from '@/app/components/profilebuttons/back';
import CommentBox from '@/app/components/CommentBox';

const Navbar = dynamic(() => import('@/app/components/navbar'), { ssr: false });
const Loading = dynamic(() => import('@/app/components/Loading'), { ssr: false });

interface Post {
  id: string;
  userName?: string;
  userImage?: string;
  timeAgo?: string;
  title?: string;
  description?: string;
  image?: string;
  author?: {
    name: string;
    image: string;
  };
}

const Page = ({ params }: { params: { id: string } }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState(null);
  const [post, setPost] = useState<Post | null>(null);
  const isMounted = useRef(true);
  const { data: session } = useSession();

  const fetchData = useCallback(async () => {
    if (!session?.user?.id || !params?.id) return window.location.replace("/signin");
    try {
      const [userResult, postResult] = await Promise.all([
        axios.get(`/api/getUser/${session.user.id}`),
        axios.get(`/api/postDetail/${params.id}`),
      ]);
      if (isMounted.current) {
        setUser(userResult.data);
        setPost(postResult.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setTimeout(() => {
        if (isMounted.current) setLoading(false);
      }, 500);
    }
  }, [session?.user?.id, params?.id]);

  useEffect(() => {
    isMounted.current = true;
    console.log("Component mounted");

    fetchData();

    return () => {
      isMounted.current = false;
      console.log("Component unmounted");
    };
  }, [fetchData]);

  const memoizedPost = useMemo(() => post, [post]);

  if (loading) return <Loading />;


  return (
    <div>
      <Navbar user={user} />
      <div className="space-y-4 flex flex-col items-center bg-gray-100">
        <div
          key={memoizedPost?.id}
          className="bg-white p-4 items-center justify-center mt-2 rounded-lg shadow md:max-w-2xl max-w-full w-full"
        >
          <div className="flex items-center mb-2 justify-between">
            <div className="flex ml-8">
              <Image
                width={32}
                height={32}
                src={memoizedPost?.author?.image || "/default-image.png"}
                alt="User Profile"
                className="h-8 w-8 rounded-full"
              />
              <div className="ml-2">
                <h2 className="text-sm font-bold">{memoizedPost?.author?.name}</h2>
                <p className="text-xs text-gray-500">{memoizedPost?.timeAgo}</p>
              </div>
            </div>
            <BackButton type="post" />
          </div>
          <h3 className="text-lg font-semibold">{memoizedPost?.title}</h3>
          <p className="text-sm text-gray-700">{memoizedPost?.description}</p>
          <div className="flex justify-center mt-4">
            {memoizedPost?.image && (
              <Image
                width={800}
                height={500}
                src={memoizedPost.image}
                alt="Post Image"
                className="mt-2 justify-center flex rounded-lg object-cover w-full max-h-full" 
              />
            )}
          </div>
        </div>
        <CommentBox  postId={String(params.id)} />
      </div>
    </div>
  );
};

export default Page;
