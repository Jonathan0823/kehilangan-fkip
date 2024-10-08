"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect } from "react";
import CommentsInput from "./CommentsInput";

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
    createdAt: string;
  }

  const [comments, setComments] = React.useState<Comment[]>([]);
  const id = postid.postId;
  
  const fetchComments = async () => {
    try {
      const response = await axios.get(`/api/comments/${id}`);
      setComments(response.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const refreshComments = async () => {
    await fetchComments();
  }

  const sortedComments = comments.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="bg-white pb-28 p-4 mt-5 items-center text-center justify-center rounded-lg shadow md:max-w-2xl max-w-full w-full">
      Komentar
      {sortedComments.map((comment) => (
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
              <div className="text-sm font-semibold text-left">
                {comment.userName}
              </div>
              <div className="text-xs text-gray-500 text-left">
                {comment.timeAgo}
              </div>
            </div>
          </div>
          <div className="mt-4 text-left">{comment.content}</div>
        </div>
      ))}
      <CommentsInput postId={String(id)} refreshComments={refreshComments}/>
    </div>
  );
};

export default CommentBox;
