"use client";

import { FaEnvelope, FaRegUserCircle, FaLock } from "react-icons/fa";
import React from "react";
import { useState } from "react";
import { CircularProgress } from "@mui/material"; 
import { signIn } from "next-auth/react";

const SignIn: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = useState<string>(" ");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [sending, setSending] = useState<boolean>(false);
  

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setSending(true);
      console.log(email, password);
      const res = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });
      if (res?.error) {
        setError("Login Failed");
        return;
      }
      setSuccessMessage("Login Success");
      setEmail("");
      setPassword("");
      window.location.href = "/";
    
      
    } catch (error) {
      setError("Login Failed");
      throw error;
    }finally{
      if (error) {
        setSending(false);
      }
  }};

  return (
    <div className="min-h-dvh flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg  max-w-sm w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-sky-600">
          Sign In
        </h2>

        <div className="flex justify-center mb-6">
          <FaRegUserCircle className="text-gray-400 mr-3" size={100} />
        </div>

        <form onSubmit={handleLogin}>
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
                className="w-full focus:outline-none "
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <div className="flex items-center border rounded-lg px-3 py-2 mt-2 border-sky-400">
              <FaLock className="text-sky-400 mr-3" />
              <input
                type="password"
                id="password"
                className="w-full focus:outline-none"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button disabled={sending} className="w-full bg-sky-600 text-white py-2 px-4 rounded-lg hover:bg-sky-700 focus:ring focus:ring-sky-300 focus:outline-none">
            {sending ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
          </button>
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          {successMessage && (
            <p className="mt-2 text-sm text-green-500">{successMessage}</p>
          )}
        </form>
        <div className="text-center mt-4">
          <a href="/reset" className="text-sm text-sky-500 underline hover:text-sky-700">
            Forgot Password?
          </a>
          <p className="mt-2 text-sm">
            Don&apos;t have an account?
            <a href="/signup" className="text-sky-500 ml-1 hover:underline hover:text-sky-700">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
