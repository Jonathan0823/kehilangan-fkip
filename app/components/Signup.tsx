"use client";
import { FaEnvelope, FaLock, FaRegUser } from "react-icons/fa";
import React from "react";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import Image from "next/image";

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
      <div className="bg-white p-8 rounded-lg max-w-sm lg:min-h-0 min-h-dvh w-full">
        <h2 className="text-5xl font-bold mb-2 justify-start text-black">
          Sign Up
        </h2>
        <p className="text-sm mb-6">
          Sudah daftar?
          <a href="/signin" className="text-black ml-1 underline hover:font-semibold">
            Login
          </a>
        </p>

        <div className="flex justify-center mt-10 mb-7">
         <Image src="/Signup.png" alt="Signup" width={647} height={385}></Image>
        </div>

        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <div className="flex items-center border rounded-lg px-3 py-2 mt-2 border-sky-300">
              <FaRegUser className="text-sky-300 mr-3" />
              <input
                type="text"
                name="name"
                id="name"
                className="w-full focus:outline-none py-1 placeholder-black"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <div className="flex items-center border rounded-lg px-3 py-2 mt-2 border-sky-300">
              <FaEnvelope className="text-sky-300 mr-3" />
              <input
                type="email"
                name="email"
                id="email"
                className="w-full focus:outline-none py-1 placeholder-black"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center border rounded-lg px-3 py-2 mt-2 border-sky-300">
              <FaLock className="text-sky-300 mr-3" />
              <input
                type="password"
                name="password"
                id="password"
                className="w-full focus:outline-none py-1 placeholder-black"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="w-full flex justify-center">
            <button
              disabled={sending}
              className="w-32 bg-[#69c3f0] mt-3 font-bold text-white py-2 px-5 rounded-lg hover:bg-sky-700 focus:ring focus:ring-sky-300 focus:outline-none"
            >
              {sending ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          {successMessage && (
            <p className="mt-2 text-sm text-green-500">{successMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
