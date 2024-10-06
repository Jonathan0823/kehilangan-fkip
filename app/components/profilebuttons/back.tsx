import React from "react";
import { useRouter } from "next/navigation";

const BackButton = () => {
    const router = useRouter();
    const handleBack = () => {
        router.back();
    }
  return (
    <button className="text-blue-500 hover:text-blue-700" onClick={handleBack}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  );
};

export default BackButton;
