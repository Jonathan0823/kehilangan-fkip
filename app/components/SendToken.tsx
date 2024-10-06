"use client";

import { FaEnvelope } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import axios from "axios";

const SendToken = () => {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [timer, setTimer] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSending) return;
    setIsSending(true);
    setTimer(35);

    try {
      setSuccessMessage("");
      setErrorMessage("");
      const result = await axios.post("/api/send-token", { email });
      setSuccessMessage("Email berhasil dikirim!");
      setErrorMessage("");
      console.log(result);
    } catch {
      setErrorMessage("Failed to send email."); 
      setTimer(0);
      setSuccessMessage("");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-dvh flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg max-w-sm w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-sky-600">
          Forgot Password
        </h2>

        {successMessage && (
          <p className="text-green-500 text-center mb-4">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-semibold text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 mt-2 border-sky-400">
              <FaEnvelope className="text-sky-400 mr-3" />
              <input
                type="email"
                id="email"
                className="w-full focus:ring focus:ring-sky-200 focus:outline-none"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSending}
              />
            </div>
          </div>

          <button
            type="submit"
            className={`w-full bg-sky-600 text-white py-2 px-4 rounded-lg hover:bg-sky-700 focus:ring focus:ring-sky-300 focus:outline-none ${
              isSending ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSending}
          >
            {isSending ? `Please wait ${timer}s` : "Send Reset Token"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendToken;
