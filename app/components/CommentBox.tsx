"use client";
import Image from "next/image";
import React, { useEffect, useReducer, useState } from "react";
import { MdDelete } from "react-icons/md";
import CommentsInput from "./CommentsInput";
import { useSession } from "next-auth/react";
import axios from "axios";
import { deleteComment } from "@/lib/action";
import { FaSpinner } from 'react-icons/fa'; 

interface CommentBoxProps {
  postId: string;
}

const CommentBox = ({ postId }: CommentBoxProps) => {
  const [deleting, setDelete] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const userdata = useSession().data?.user;
  const [comments, setComments] = useState<Comment[]>([]);
  const [user, setUser] = useState<{ id: string; name: string; image: string } | null>(null);
  interface Comment {
    id: string;
    author: {
      image: string;
      name: string;
    };
    timeAgo: string;
    content: string;
    createdAt: string;
    userId: string; 
  }

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const refreshComments = async () => {
    await fetchComments();
    forceUpdate();
  };
  
  const fetchComments = async () => {
    const response = await axios.get(`/api/comments/${postId}`);
    setComments(response.data) ;
  }
  
  useEffect(() => {
    const fetchUserData = async () => {
      if (userdata) {
        const result = await axios.get(`/api/getUser/${userdata?.id}`);
        setUser(result.data);
      }
    }
    fetchUserData();
    fetchComments();
  }, [userdata]);

  const handleDeleteComment = async (commentId: string) => {
    setDeletingId(commentId);
    setDelete(true);
    try {
      await deleteComment(commentId);
      refreshComments();
      
    } catch (error) {
      console.error("Error deleting comment:", error);
    } finally {
      setTimeout(() => {
        setDeletingId(null);
        setDelete(false);
      }, 2000);
    }
  }

  const sortedComments = comments.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="bg-white pb-28 p-4 mt-5 items-center text-center justify-center  rounded-lg shadow md:max-w-2xl max-w-full w-full">
      <p className="font-semibold">Komentar</p>
      <hr className="border-slate-300 mt-4" />
      {sortedComments.map((comment: Comment) => (
        <div key={comment.id} className="flex flex-col my-6 w-full ">
          <div className="justify-between">
            <div className="flex items-center">
              <Image
                src={comment.author.image}
                width={32}
                height={32}
                alt="avatar"
                className="w-10 h-10 rounded-full mb-3"
              />
              <div className="ml-4 flex-grow">
                <div className="text-sm md:font-semibold font-bold text-left">
                  {comment.author.name}
                </div>
                <div className="text-xs text-gray-500 text-left">
                  {comment.timeAgo}
                </div>
                <div className="mt-1 text-left">{comment.content}</div>
              </div>
              {user?.id === comment.userId && (
              <button className="ml-auto" onClick={() => handleDeleteComment(comment.id)} disabled={deleting}>
                {deletingId === comment.id? <FaSpinner className="animate-spin text-red-600 w-5 h-5 mb-5" /> : <MdDelete className="text-red-600 w-5 h-5 mb-5" />}
              </button>
                )}
            </div>
          </div>
        </div>
      ))}
      <CommentsInput
        postId={String(postId)}
        refreshComments={refreshComments}
        userData={user!}
      />
    </div>
  );
};

export default CommentBox;
