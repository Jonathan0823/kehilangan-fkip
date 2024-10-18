import { useState } from "react";
import Image from "next/image";
import Dropdown from "./Dropdown";
import { useEdgeStore } from "../lib/edgeStore"; 
import { deleteButton } from "@/lib/action"; 
import Loading from "./Loading";

interface HistoryCardProps {
  title: string;
  content: string;
  date: string;
  image?: string;
  postId: string;
  userId: string;
  fetchPosts: () => void;
  username: string;
}

const HistoryCard: React.FC<HistoryCardProps> = ({
  title,
  content,
  date,
  image,
  userId,
  postId,
  username,
  fetchPosts,
}) => {
  const [loading, setLoading] = useState(false);
  const { edgestore } = useEdgeStore();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const result = await deleteButton(postId, userId || "");
      if (result === "post deleted") {
        fetchPosts();
      }
      await edgestore.publicFiles.delete({ url: image || "" });
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setLoading(false);
    }
  };

  if(loading) return <Loading/>

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: content,
          url: `https://kehilangan-fkip.vercel.app/post/${postId}`,
        });
      } catch (error) {
        console.error("Error sharing post:", error);
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Dropdown onShere={handleShare} onDelete={handleDelete} userId={userId} postId={postId} userName={username} />
      </div>
      <p className="text-gray-600 mb-2">{content}</p>
      <span className="text-gray-400 text-sm">{date}</span>
      {image && (
        <Image
          height={300}
          width={300}
          src={image}
          alt={title}
          className="w-full h-40 object-cover rounded-md mb-2"
        />
      )}
    </div>
  );
};

export default HistoryCard;
