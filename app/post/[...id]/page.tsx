"use client";
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Loading from '@/app/components/Loading';
import Navbar from '@/app/components/navbar';
import BackButton from '@/app/components/profilebuttons/back';
import CommentBox from '@/app/components/CommentBox';
import { useSession } from 'next-auth/react';


interface Post {
  id: string;
  userImage?: string;
  userName?: string;
  timeAgo?: string;
  title?: string;
  description?: string;
  image?: string;
}

const Page = ({ params }: { params: { id: string } }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState(null);
  const [post, setPost] = useState<Post | null>(null);
  const isMounted = useRef(true);
  const { data: session } = useSession();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    isMounted.current = true;
    console.log("Component mounted");

    const fetchData = async () => {
      if (!session?.user?.id || !params?.id) return;
      try {
        const [userResult, postResult, commentsResult] = await Promise.all([
          axios.get(`/api/getUser/${session.user.id}`),
          axios.get(`/api/postDetail/${params.id}`),
          axios.get(`/api/comments/${params.id}`)
        ]);
        if (isMounted.current) {
          setUser(userResult.data);
          setPost(postResult.data);
          setComments(commentsResult.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setTimeout(() => {
          if (isMounted.current) setLoading(false);
        }, 500);
      }
    };

    fetchData();

    return () => {
      isMounted.current = false;
      console.log("Component unmounted");
    };
  }, [params.id, session]);

  if (loading) return <Loading />;

  return (
    <div>
      <Navbar user={user} />
      <div className="flex flex-col w-full justify-center items-center">
        <div
          key={post?.id}
          className="bg-white p-4 items-center justify-center rounded-lg shadow md:max-w-2xl max-w-full w-full"
        >
          <div className="flex mt-20 items-center mb-2 justify-between">
            <div className="flex">
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
            <BackButton type="post" />
          </div>
          <h3 className="text-lg font-semibold">{post?.title}</h3>
          <p className="text-sm text-gray-700">{post?.description}</p>
          <div className="flex justify-center mt-4">
            {post?.image && (
              <Image
                width={350}
                height={350}
                src={post.image}
                alt="Post Image"
                className="mt-2 justify-center flex rounded-lg"
              />
            )}
          </div>
        </div>
        <CommentBox comments={comments} postId={String(params.id)} />
      </div>
    </div>
  );
};

export default Page;
