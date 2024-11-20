import React from "react";
import { useRouter } from "next/navigation";

interface BackButtonProps {

  type: string;

}

const BackButton = ({type}: BackButtonProps) => {
    const router = useRouter();
    const handleBack = () => {
        if(type === "post") {
            router.push("/post");
        } else {
            router.back();
        }
    }
  return (
    <button className="text-black absolute" onClick={handleBack}>
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
