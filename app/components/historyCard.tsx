import React from "react";
import Image from "next/image";

interface HistoryCardProps {
  title: string;
  content: string;
  date: string;
  image?: string;
}

const HistoryCard : React.FC  <HistoryCardProps>=  ({ title, content, date, image }) => {
    return (
      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
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
  