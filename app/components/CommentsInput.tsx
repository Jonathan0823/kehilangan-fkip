"use client"
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface Post {
  id: string;
  userImage?: string;
  userName: string;
  timeAgo: string;
  title: string;
  description: string;
  image?: string;
}


const CommentsInput = ({post}: {post:Post}) => {
    const [comment, setComment] = useState("");
    const [user, setUser] = useState<{ id: string; name: string; image: string } | null>(null);
    const userdata = useSession().data?.user;
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [sending, setSending] = useState<boolean>(false);
    
    useEffect(() => {
      const fetchUserData = async () => {
        if (userdata) {
          const result = await axios.get(`/api/getUser/${userdata?.id}`);
          setUser(result.data);
        }
      }
      fetchUserData();
    }, [userdata]);

    const handleSubmit = async () => {
      setSending(true);
      try {
        if (!comment) return;
        console.log("User:",user);
        console.log("Comment:", post.id, comment);

        const formData = {
            userId: user?.id,
            userName: user?.name,
            userImage: user?.image,
            postId: post.id,
            comment,
            date: new Date().toISOString(),
        };
        const response = await axios.post(`/api/comments/create`, formData);
        if (response.status === 201) {
          setComment("");
          setSuccessMessage("Comment posted successfully");
        }
      } catch {
        setError("Failed to post comment");
      } finally
      {
        setSending(false);
      }
    };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-md max-w-2xl mx-auto">
        {error && <p className="text-red-500 text-sm ml-2">{error}</p>}
        {successMessage && <p className="text-green-500 text-sm ml-2">{successMessage}</p>}
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Write a comment..."
          className="flex-grow p-2 border rounded-lg mr-2"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button className="bg-blue-500 text-white p-2 rounded-lg" onClick={handleSubmit} disabled={sending}>Post</button>
      </div>
    </div>
  );
};

export default CommentsInput;