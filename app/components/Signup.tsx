"use client";
import { FaEnvelope, FaLock, FaRegUser, FaRegUserCircle } from "react-icons/fa";
import React from "react";
import { useState } from "react";
import { CircularProgress } from "@mui/material"; 


const SignUp: React.FC = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = useState<string>(" ");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [sending, setSending] = useState<boolean>(false);

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setSending(true);
      await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          username: name,
          email: email,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setSuccessMessage("Sign Up Success");
      
        window.location.href = "/signin";

      
    } catch (error) {
      setError("Sign Up Failed");
      throw error;
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-dvh flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg max-w-sm w-full">
        <h2 className="text-3xl font-bold text-sky-600 mb-6 text-center">
          Sign Up
        </h2>

        <div className="flex justify-center mb-6">
          <FaRegUserCircle className="text-gray-400 mr-3" size={100} />
        </div>

        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label
              className="block text-sm font-semibold text-gray-700"
              htmlFor="name"
            >
              Nama
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 mt-2">
              <FaRegUser className="text-sky-400 mr-3" />
              <input
                type="text"
                name="name"
                id="name"
                className="w-full focus:ring focus:ring-indigo-200 focus:outline-none"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-semibold text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 mt-2">
              <FaEnvelope className="text-sky-400 mr-3" />
              <input
                type="email"
                name="email"
                id="email"
                className="w-full focus:ring focus:ring-indigo-200 focus:outline-none"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              className="block text-sm font-semibold text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 mt-2">
              <FaLock className="text-sky-400 mr-3" />
              <input
                type="password"
                name="password"
                id="password"
                className="w-full focus:ring focus:ring-indigo-200 focus:outline-none"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button disabled={sending} className="w-full bg-sky-600 text-white py-2 px-4 rounded-lg hover:bg-sky-700 focus:ring focus:ring-sky-300 focus:outline-none">
          {sending ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
          </button>
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          {successMessage && (
            <p className="mt-2 text-sm text-green-500">{successMessage}</p>
          )}
        </form>

        <div className="text-center mt-4">
          <a href="#" className="text-sm text-blue-500 hover:underline">
            Forgot Password?
          </a>
          <p className="mt-2 text-sm">
            Already have an account?
            <a href="/signin" className="text-blue-500 hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
