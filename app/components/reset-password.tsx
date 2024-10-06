"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaLock } from "react-icons/fa";

export default function Reset({ params }: { params: string }) {
  const [newPassword, setNewPassword] = useState("");
  const [reenterPassword, setReenterPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  function togglePassword() {
    setShowPassword(!showPassword);
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== reenterPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const result = await axios.post(`/api/reset-password`, {
        newPassword,
        token: params,
      });

      if (result.status === 200) {
        setSuccessMessage("Password reset successfully!");
        setTimeout(() => {
          router.push("/signin");
        }, 2000);
      } else if (result.status === 400) {
        setErrorMessage("Invalid token.");
      } else {
        setErrorMessage("Failed to update password.");
      }
    } catch (error) {
        throw error;
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto bg-white p-8 shadow-lg border-2 border-purple-600 rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-sky-600 mb-8">
          Reset Password
        </h2>
        <form onSubmit={handleFormSubmit}>
          <div className="relative mb-6">
            <label
              htmlFor="new-password"
              className="block text-sm font-semibold text-gray-700"
            >
              New Password
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 mt-2 border-sky-400">
              <FaLock className="text-sky-400 mr-3" />
              <input
                type={showPassword ? "text" : "password"}
                id="new-password"
                className="w-full focus:ring focus:ring-sky-200 focus:outline-none"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <span
              className="absolute top-2 right-2 cursor-pointer text-blue-600 text-xs"
              onClick={togglePassword}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <div className="relative mb-6">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-semibold text-gray-700"
            >
              Confirm Password
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 mt-2 border-sky-400">
              <FaLock className="text-sky-400 mr-3" />
              <input
                type={showPassword ? "text" : "password"}
                id="confirm-password"
                className="w-full focus:ring focus:ring-sky-200 focus:outline-none"
                placeholder="Re-enter password"
                value={reenterPassword}
                onChange={(e) => setReenterPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-sky-600 text-white py-2 px-4 rounded-lg hover:bg-sky-700 focus:ring focus:ring-sky-300 focus:outline-none"
          >
            Submit
          </button>

          {successMessage && (
            <p className="text-center text-green-600 mt-4">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="text-center text-red-600 mt-4">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
}
