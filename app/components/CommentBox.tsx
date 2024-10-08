"use client";
import Image from "next/image";
import React, { useReducer } from "react";
import CommentsInput from "./CommentsInput";

interface Comment {
  id: string;
  userimage: string;
  userName: string;
  timeAgo: string;
  content: string;
  createdAt: string;
}

interface CommentBoxProps {
  comments: Comment[],
  postId: string;
}

const CommentBox = ({comments, postId}: CommentBoxProps) => {
  interface Comment {
    id: string;
    userimage: string;
    userName: string;
    timeAgo: string;
    content: string;
    createdAt: string;
  }

 



  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const refreshComments = () => {
    forceUpdate();
  }

  const sortedComments = comments.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="bg-white pb-28 p-4 mt-5 items-center text-center justify-center rounded-lg shadow md:max-w-2xl max-w-full w-full">
      Komentar
      {sortedComments.map((comment:Comment) => (
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
      <CommentsInput postId={String(postId)} refreshComments={refreshComments}/>
    </div>
  );
};

export default CommentBox;
