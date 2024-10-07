"use client"
import axios from "axios";
import React, { useEffect } from "react";

interface CommentBoxProps {

    postId: string;
  
  }

const CommentBox = (postid: CommentBoxProps) => {
    useEffect(() => {
        const id = postid.postId;
        const fetchComments = async () => {
          try {
            const response = await axios.get(`/api/comments/${id}`);
            console.log("Fetched Comments:", response.data);
          } catch (err) {
            console.error("Fetch error:", err);
          }
        };
        fetchComments();
        }, [postid]);
          
  return (
    <div className="bg-white pb-28 p-4 mt-5 items-center justify-center rounded-lg shadow md:max-w-2xl max-w-full w-full">
      Comments
    </div>
  );
};

export default CommentBox;
