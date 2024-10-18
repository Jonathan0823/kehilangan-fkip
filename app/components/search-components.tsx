"use client"
import { useState } from 'react';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = ['Android', 'Next.js', 'Tailwind', 'Responsif UI'];
    setResults(data.filter(item => item.toLowerCase().includes(searchTerm.toLowerCase())));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">Search Page</h1>
        <form onSubmit={handleSearch} className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Search
          </button>
        </form>
        <div className="mt-4">
          {results.length > 0 ? (
            <ul>
              {results.map((result, index) => (
                <li key={index} className="p-2 border-b border-gray-300">
                  {result}
                </li>
              ))}
            </ul>
          ) : (
            searchTerm && <p className="text-center text-gray-500">No results found</p>
          )}
        </div>
      </div>
    </div>
  );
}
