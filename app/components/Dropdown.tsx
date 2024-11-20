"use client";
import { useState, useEffect, useRef } from "react";

const Dropdown = ({
  onDelete,
  onShere,
  userId,
  postId,
  userName,
}: {
  onDelete: () => void;
  onShere: () => void;
  userId: string;
  postId: string;
  userName: string;
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full hover:bg-[#bfdbfe] hover:text-blue-700 transition-all duration-200"
      >
        ⋮
      </button>
      <div
        className={`absolute right-0 mt-2 bg-white border rounded-lg shadow-lg transition-transform transform duration-300 ease-in-out ${
          open ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        style={{ transformOrigin: "top right" }}
      >
        {(postId === userId || userName === "Admin") && (
          <button
            onClick={onDelete}
            className="block px-8 py-2 text-left text-red-600 hover:bg-red-100 rounded-lg w-full"
          >
            Delete
          </button>
        )}

        <button
          onClick={onShere}
          className="block px-8 py-2 text-left text-blue-600 hover:bg-blue-100 rounded-lg w-full"
        >
          Share
        </button>
      </div>
    </div>
  );
};

export default Dropdown;
