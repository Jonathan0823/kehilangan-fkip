import { useState } from "react";
import { deleteButton } from "@/lib/action";
import { useEdgeStore } from "../lib/edgeStore";

const DeleteButton = ({
  postId,
  postImage,
  userId,
  fetchPosts,
}: {
  postId: string;
  postImage: string;
  userId: string;
  fetchPosts: () => void;
}) => {
    console.log(postId, userId);
  const [loading, setLoading] = useState(false);
  const { edgestore } = useEdgeStore();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const result = await deleteButton(postId, userId);
      if (result === "post deleted") {
        fetchPosts();
      }
      await edgestore.publicFiles.delete({ url: postImage });
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="block px-8 py-2 text-left text-red-600 hover:bg-red-100 rounded-lg w-full"
      disabled={loading}
    >
      {loading ? "Menghapus..." : "Delete"}
    </button>
  );
};

export default DeleteButton;
