"use client"
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

interface SearchResult {
  id: string;
  userId: string;
  userName: string;
  userImage: string | null;
  timeAgo: string;
  title: string;
  description: string;
  image: string | null;
  type: string | null;
  date: string | null;
}

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [noResults, setNoResults] = useState(false);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResults([]);

    try {
      const response = await axios.get(`/api/search/${searchTerm}`);
      const data = response.data;
      if (!data || data.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
        setResults(data);
      }
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  useEffect(() => {
    if (searchTerm === "") {
      setResults([]);
      setNoResults(false);
    }
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-md">
        <h1 className="text-xl font-semibold mb-4 text-center">Search Page</h1>
        <form
          onSubmit={handleSearch}
          className="flex flex-col items-center space-y-3 w-full"
        >
          <input
            type="text"
            placeholder="Search here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Search
          </button>
        </form>
        {noResults && (
          <div className="text-red-500 text-sm mt-2 text-center">
            No results found
          </div>
        )}
        <div className="mt-4">
          <ul className="space-y-3">
            {results.map((result) => (
              <li
                key={result.id}
                className="flex items-start p-3 border border-gray-200 rounded-lg bg-white"
              >
                <Link href={`/post/${result.id}`}>
                  <div className="flex space-x-4 items-center w-full">
                    {result.userImage && (
                      <Image
                        src={result.userImage}
                        alt={result.userName}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <h2 className="text-base font-semibold">
                        {result.title}
                      </h2>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {result.description}
                      </p>
                      <div className="text-xs text-gray-400 flex space-x-1">
                        <span>{result.userName}</span>
                        <span>•</span>
                        <span>{result.timeAgo}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
