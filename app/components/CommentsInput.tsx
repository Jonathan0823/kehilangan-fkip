"use client"
import axios from "axios";
import React, { useState } from "react";

interface CommentsInputProps {
  postId: string;
  userData: {
    id: string;
    name: string;
    image: string;
  };
  refreshComments: () => void;
}

const CommentsInput: React.FC<CommentsInputProps> = ({ postId, refreshComments, userData }) => {
  const [comment, setComment] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    if (!comment) return;

    setSending(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const formData = {
        userId: userData?.id,
        userName: userData?.name,
        userImage: userData?.image,
        postId: postId,
        comment,
        date: new Date().toISOString(),
      };
      await axios.post(`/api/comments/create`, formData);
      setSuccessMessage('Comment posted successfully!');
      refreshComments();
    } catch (error) {
      console.error('Error posting comment:', error);
      setError('Failed to post comment.');
      // Remove the optimistic comment if the request fails
    } finally {
      setSending(false);
      setComment('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-md max-w-2xl mx-auto">
      {error && <p className="text-red-500 text-sm ml-2">{error}</p>}
      {successMessage && <p className="text-green-500 text-sm ml-2">{successMessage}</p>}
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Write a comment..."
          className="flex-grow p-2 border w-10 rounded-lg mr-2"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={sending}
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg" disabled={sending}>
          {sending ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  </form>
  );
};

export default CommentsInput;
