"use client"
import axios from "axios";
import Image from "next/image";
import React, { useEffect } from "react";

interface CommentBoxProps {

    postId: string;
  
  }

const CommentBox = (postid: CommentBoxProps) => {
  interface Comment {
    id: string;
    userimage: string;
    userName: string;
    timeAgo: string;
    content: string;
  }

  const [comments, setComments] = React.useState<Comment[]>([]);
    useEffect(() => {
        const id = postid.postId;
        const fetchComments = async () => {
          try {
            const response = await axios.get(`/api/comments/${id}`);
            setComments(response.data);
            console.log("Fetched Comments:", response.data);
          } catch (err) {
            console.error("Fetch error:", err);
          }
        };
        fetchComments();
        }, [postid]);
          
  return (
    <div className="bg-white pb-28 p-4 mt-5 items-center text-center justify-center rounded-lg shadow md:max-w-2xl max-w-full w-full">
      Komentar
      {comments.map((comment) => (
        <div key={comment.id} className="flex flex-col my-6 w-full ">
          <div className="flex items-center">
            <Image
              src={comment.userimage}
              width={32}
              height={32}
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
            <div className="ml-2">
              <div className="text-sm font-semibold text-left">{comment.userName}</div>
              <div className="text-xs text-gray-500 text-left">{comment.timeAgo}</div>
            </div>
          </div>
          <div className="mt-4 text-left">{comment.content}</div>
        </div>
      ))}
    </div>
  );
};

export default CommentBox;
