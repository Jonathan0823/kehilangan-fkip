"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const ReactButton = ({
  userId,
  postId,
  userName,
}: {
  userId: string;
  postId: string;
  userName: string;
}) => {
  const [likes, setLikes] = useState<{ [key: string]: number }>({});
  const [liked, setLiked] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const checkLikes = async () => {
    try {
      const response = await axios.get(`/api/likes`);
      const likes = response.data;
      const likesCount = likes.reduce(
        (acc: { [key: string]: number }, like: { postId: string }) => {
          acc[like.postId] = (acc[like.postId] || 0) + 1;
          return acc;
        },
        {}
      );
      setLikes(likesCount);
      setLiked(
        likes.some(
          (like: { userId: string; postId: string }) =>
            like.userId === userId && like.postId === postId
        )
      );
    } catch (error) {
      console.error("Failed to fetch likes:", error);
    }
  };

  useEffect(() => {
    checkLikes();
  }, [userId, postId]);

  useEffect(() => {
    setDisabled(userName === "Guest");
  }, [userName]);

  const handleReact = async () => {
    if (disabled) return;
    setDisabled(true);
    const newLikes = { ...likes };

    if (liked) {
      setLiked(false);
      newLikes[postId] = (newLikes[postId] || 0) - 1;
      setLikes(newLikes);
      try {
        await axios.post("/api/likes/unlike", { userId, postId });
      } catch (error) {
        console.error("Failed to unlike:", error);
        setLiked(true);
        newLikes[postId] = (newLikes[postId] || 0) + 1;
        setLikes(newLikes);
      }
    } else {
      setLiked(true);
      newLikes[postId] = (newLikes[postId] || 0) + 1;
      setLikes(newLikes);
      try {
        await axios.post("/api/likes/like", { userId, postId });
      } catch (error) {
        console.error("Failed to like:", error);
        setLiked(false);
        newLikes[postId] = (newLikes[postId] || 0) - 1;
        setLikes(newLikes);
      }
    }
    setDisabled(false);
  };

  return (
    <div className="flex-1 items-center">
      <button
        disabled={disabled}
        onClick={handleReact}
        className={`min-w-[130px] flex-1 justify-center lg:min-h-11 min-h-9 items-center ${liked ? "bg-[#3b82f6] text-white" : "bg-[#69c3f0] text-white"} rounded-2xl flex gap-3 transition-all duration-200`}
      >
        <div className="flex font-semibold gap-3">
        {liked ? <p>Reaksi</p> : <p>Reaksi</p>}
        {likes[postId] || 0}
        </div>
      </button>
    </div>
  );
};

export default ReactButton;
